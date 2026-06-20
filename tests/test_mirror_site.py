from pathlib import Path
import unittest

from mirror_site import local_path_for_url, rewrite_css_urls, rewrite_html_urls


class MirrorSiteTests(unittest.TestCase):
    def test_same_domain_assets_keep_site_relative_path(self) -> None:
        path = local_path_for_url(
            "https://example.com",
            "https://example.com/assets/app.css",
            is_page=False,
        )

        self.assertEqual("assets/app.css", path.as_posix())

    def test_root_page_maps_to_top_level_index_html(self) -> None:
        path = local_path_for_url(
            "https://example.com",
            "https://example.com/",
            is_page=True,
        )

        self.assertEqual("index.html", path.as_posix())

    def test_external_stylesheet_without_suffix_gets_css_extension(self) -> None:
        path = local_path_for_url(
            "https://example.com",
            "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap",
            is_page=False,
            suggested_extension=".css",
        )

        self.assertRegex(
            path.as_posix(),
            r"^external/fonts\.googleapis\.com/css2__[0-9a-f]{10}\.css$",
        )

    def test_rewrite_html_urls_converts_pages_and_assets(self) -> None:
        html = """
        <html>
          <head>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="stylesheet" href="https://example.com/assets/app.css">
            <script src="https://cdn.example.net/widget.js"></script>
          </head>
          <body>
            <a href="/about">About</a>
            <a href="#top">Back to top</a>
            <img src="/img/hero.jpg">
          </body>
        </html>
        """

        rewritten_html, page_urls, asset_urls = rewrite_html_urls(
            html=html,
            page_url="https://example.com/",
            page_output_path=Path("index.html"),
            site_origin="https://example.com",
        )

        self.assertIn('href="assets/app.css"', rewritten_html)
        self.assertIn('src="external/cdn.example.net/widget.js"', rewritten_html)
        self.assertIn('href="about/index.html"', rewritten_html)
        self.assertIn('href="#top"', rewritten_html)
        self.assertIn('src="img/hero.jpg"', rewritten_html)
        self.assertIn('href="https://fonts.googleapis.com"', rewritten_html)
        self.assertEqual({"https://example.com/about"}, page_urls)
        self.assertIn(("https://example.com/assets/app.css", ".css"), asset_urls)
        self.assertIn(("https://cdn.example.net/widget.js", ".js"), asset_urls)
        self.assertIn(("https://example.com/img/hero.jpg", ".jpg"), asset_urls)
        self.assertNotIn(("https://fonts.googleapis.com", None), asset_urls)

    def test_rewrite_css_urls_converts_imports_and_nested_assets(self) -> None:
        css = """
        @import "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500&display=swap";
        .hero { background-image: url("/images/hero.jpg"); }
        @font-face { src: url("https://fonts.gstatic.com/s/inter/v19/abc.woff2") format("woff2"); }
        """

        rewritten_css, asset_urls = rewrite_css_urls(
            css_text=css,
            css_url="https://example.com/assets/app.css",
            css_output_path=Path("assets/app.css"),
            site_origin="https://example.com",
        )

        self.assertIn('../external/fonts.googleapis.com/', rewritten_css)
        self.assertIn('../images/hero.jpg', rewritten_css)
        self.assertIn('../external/fonts.gstatic.com/s/inter/v19/abc.woff2', rewritten_css)
        self.assertIn(
            (
                "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500&display=swap",
                ".css",
            ),
            asset_urls,
        )
        self.assertIn(("https://example.com/images/hero.jpg", None), asset_urls)
        self.assertIn(
            ("https://fonts.gstatic.com/s/inter/v19/abc.woff2", None),
            asset_urls,
        )

    def test_rewrite_css_urls_handles_compact_import_syntax(self) -> None:
        css = '@import"https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap";'

        rewritten_css, asset_urls = rewrite_css_urls(
            css_text=css,
            css_url="https://example.com/assets/app.css",
            css_output_path=Path("assets/app.css"),
            site_origin="https://example.com",
        )

        self.assertRegex(
            rewritten_css,
            r'@import"\.\./external/fonts\.googleapis\.com/css2__[0-9a-f]{10}\.css";',
        )
        self.assertIn(
            (
                "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap",
                ".css",
            ),
            asset_urls,
        )


if __name__ == "__main__":
    unittest.main()
