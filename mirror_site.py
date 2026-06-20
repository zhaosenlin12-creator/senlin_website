from __future__ import annotations

import argparse
import hashlib
import mimetypes
import os
import re
import sys
from collections import deque
from pathlib import Path
from typing import Iterable
from urllib.parse import urljoin, urlparse, urlunparse


SCRAPLING_ROOT = Path(r"D:\kaifa\Scrapling")
if str(SCRAPLING_ROOT) not in sys.path:
    sys.path.insert(0, str(SCRAPLING_ROOT))

from bs4 import BeautifulSoup
from scrapling.fetchers import DynamicFetcher, Fetcher


HTML_ATTRS = (
    ("a", "href"),
    ("img", "src"),
    ("script", "src"),
    ("link", "href"),
    ("source", "src"),
    ("source", "srcset"),
    ("video", "src"),
    ("audio", "src"),
    ("iframe", "src"),
)

CSS_URL_RE = re.compile(r"url\((?P<quote>['\"]?)(?P<url>.*?)(?P=quote)\)")
CSS_IMPORT_RE = re.compile(r"@import\s*(?P<quote>['\"])(?P<url>.*?)(?P=quote)")


def normalize_url(url: str) -> str:
    parsed = urlparse(url)
    path = parsed.path or "/"
    if path != "/" and path.endswith("/"):
        path = path.rstrip("/")
    clean = parsed._replace(path=path, fragment="")
    return urlunparse(clean)


def same_origin(url: str, site_origin: str) -> bool:
    return urlparse(url).netloc == urlparse(site_origin).netloc


def is_downloadable_url(value: str) -> bool:
    if not value:
        return False
    return not value.startswith(("#", "mailto:", "tel:", "javascript:", "data:"))


def should_download_html_attr(tag_name: str, attr_name: str, tag: object, value: str) -> bool:
    if not is_downloadable_url(value):
        return False
    if tag_name == "link":
        rel_values = [str(item).lower() for item in (getattr(tag, "get", lambda *_: [])("rel") or [])]
        if "stylesheet" not in rel_values and value.endswith(".css") is False:
            return False
    return True


def split_srcset(value: str) -> list[tuple[str, str]]:
    parts: list[tuple[str, str]] = []
    for chunk in value.split(","):
        item = chunk.strip()
        if not item:
            continue
        pieces = item.split()
        url = pieces[0]
        descriptor = " ".join(pieces[1:])
        parts.append((url, descriptor))
    return parts


def guess_extension(url: str, response_headers: dict[str, str] | None = None) -> str:
    suffix = Path(urlparse(url).path).suffix
    if suffix:
        return suffix
    content_type = (response_headers or {}).get("content-type", "").split(";")[0].strip()
    guessed = mimetypes.guess_extension(content_type) or ""
    return ".jpg" if guessed == ".jpe" else guessed


def local_path_for_url(
    site_origin: str,
    target_url: str,
    *,
    is_page: bool,
    suggested_extension: str | None = None,
) -> Path:
    parsed = urlparse(target_url)

    if same_origin(target_url, site_origin):
        relative = parsed.path.lstrip("/")
        base_path = Path(relative) if relative else Path("")
    else:
        host = parsed.netloc.replace(":", "_")
        relative = parsed.path.lstrip("/")
        base_path = Path("external") / host / (relative or "index")

    query_hash = ""
    if parsed.query:
        query_hash = "__" + hashlib.sha1(parsed.query.encode("utf-8")).hexdigest()[:10]

    if is_page:
        if str(base_path) in {"", "."}:
            return Path("index.html")
        if base_path.suffix.lower() == ".html":
            return base_path
        if base_path.suffix:
            return base_path.with_suffix(".html")
        return base_path / "index.html"

    if base_path.suffix:
        if query_hash:
            return base_path.with_name(f"{base_path.stem}{query_hash}{base_path.suffix}")
        return base_path

    extension = suggested_extension or ""
    filename = f"{base_path.name}{query_hash}{extension}"
    return base_path.with_name(filename)


def relative_ref(from_file: Path, to_file: Path) -> str:
    return Path(os.path.relpath(to_file, start=from_file.parent)).as_posix()


def classify_asset_extension(tag_name: str, absolute_url: str) -> str | None:
    suffix = Path(urlparse(absolute_url).path).suffix.lower()
    if suffix:
        return suffix
    if tag_name == "link":
        return ".css"
    if tag_name == "script":
        return ".js"
    return None


def rewrite_html_urls(
    *,
    html: str,
    page_url: str,
    page_output_path: Path,
    site_origin: str,
) -> tuple[str, set[str], set[tuple[str, str | None]]]:
    soup = BeautifulSoup(html, "html.parser")
    page_urls: set[str] = set()
    asset_urls: set[tuple[str, str | None]] = set()

    for tag_name, attr_name in HTML_ATTRS:
        for tag in soup.find_all(tag_name):
            value = tag.get(attr_name)
            if not value:
                continue

            if attr_name == "srcset":
                rewritten_parts: list[str] = []
                for raw_url, descriptor in split_srcset(value):
                    if not is_downloadable_url(raw_url):
                        rewritten_parts.append(raw_url if not descriptor else f"{raw_url} {descriptor}")
                        continue
                    absolute_url = normalize_url(urljoin(page_url, raw_url))
                    target_path = local_path_for_url(site_origin, absolute_url, is_page=False)
                    asset_urls.add((absolute_url, None))
                    link = relative_ref(page_output_path, target_path)
                    rewritten_parts.append(link if not descriptor else f"{link} {descriptor}")
                tag[attr_name] = ", ".join(rewritten_parts)
                continue

            if not should_download_html_attr(tag_name, attr_name, tag, value):
                continue

            absolute_url = normalize_url(urljoin(page_url, value))
            is_page_link = tag_name == "a" and attr_name == "href"

            if is_page_link and same_origin(absolute_url, site_origin):
                page_urls.add(absolute_url)
                target_path = local_path_for_url(site_origin, absolute_url, is_page=True)
            else:
                extension = classify_asset_extension(tag_name, absolute_url)
                target_path = local_path_for_url(
                    site_origin,
                    absolute_url,
                    is_page=False,
                    suggested_extension=extension,
                )
                asset_urls.add((absolute_url, extension))

            tag[attr_name] = relative_ref(page_output_path, target_path)

    return str(soup), page_urls, asset_urls


def rewrite_css_urls(
    *,
    css_text: str,
    css_url: str,
    css_output_path: Path,
    site_origin: str,
) -> tuple[str, set[tuple[str, str | None]]]:
    asset_urls: set[tuple[str, str | None]] = set()

    def replace_import(match: re.Match[str]) -> str:
        raw_url = match.group("url")
        if not is_downloadable_url(raw_url):
            return match.group(0)
        absolute_url = normalize_url(urljoin(css_url, raw_url))
        target_path = local_path_for_url(
            site_origin,
            absolute_url,
            is_page=False,
            suggested_extension=".css",
        )
        asset_urls.add((absolute_url, ".css"))
        quote = match.group("quote")
        return f'@import{quote}{relative_ref(css_output_path, target_path)}{quote}'

    def replace_url(match: re.Match[str]) -> str:
        raw_url = match.group("url").strip()
        if not is_downloadable_url(raw_url):
            return match.group(0)
        absolute_url = normalize_url(urljoin(css_url, raw_url))
        target_path = local_path_for_url(site_origin, absolute_url, is_page=False)
        asset_urls.add((absolute_url, None))
        quote = match.group("quote") or ""
        return f"url({quote}{relative_ref(css_output_path, target_path)}{quote})"

    css_text = CSS_IMPORT_RE.sub(replace_import, css_text)
    css_text = CSS_URL_RE.sub(replace_url, css_text)
    return css_text, asset_urls


class SiteMirror:
    def __init__(self, site_url: str, output_dir: Path) -> None:
        normalized = normalize_url(site_url)
        parsed = urlparse(normalized)
        self.site_url = normalized
        self.site_origin = f"{parsed.scheme}://{parsed.netloc}"
        self.output_dir = output_dir
        self.page_queue: deque[str] = deque([normalized])
        self.asset_queue: deque[tuple[str, str | None]] = deque()
        self.seen_pages: set[str] = set()
        self.seen_assets: set[str] = set()

    def fetch_page_html(self, url: str) -> str:
        if url == self.site_url:
            response = DynamicFetcher.fetch(url, headless=True, network_idle=True, timeout=45000)
            return response.body.decode("utf-8", errors="ignore")
        response = Fetcher.get(url, timeout=30)
        return response.body.decode("utf-8", errors="ignore")

    def fetch_binary(self, url: str) -> tuple[bytes, dict[str, str]]:
        response = Fetcher.get(url, timeout=30)
        return response.body, dict(response.headers)

    def enqueue_assets(self, assets: Iterable[tuple[str, str | None]]) -> None:
        for asset_url, extension in assets:
            if asset_url not in self.seen_assets:
                self.asset_queue.append((asset_url, extension))

    def mirror_pages(self) -> None:
        while self.page_queue:
            page_url = self.page_queue.popleft()
            if page_url in self.seen_pages:
                continue
            self.seen_pages.add(page_url)

            html = self.fetch_page_html(page_url)
            relative_output = local_path_for_url(self.site_origin, page_url, is_page=True)
            output_path = self.output_dir / relative_output
            output_path.parent.mkdir(parents=True, exist_ok=True)

            rewritten_html, page_urls, asset_urls = rewrite_html_urls(
                html=html,
                page_url=page_url,
                page_output_path=relative_output,
                site_origin=self.site_origin,
            )
            output_path.write_text(rewritten_html, encoding="utf-8")

            for next_page in sorted(page_urls):
                if next_page not in self.seen_pages:
                    self.page_queue.append(next_page)
            self.enqueue_assets(asset_urls)

    def mirror_assets(self) -> None:
        while self.asset_queue:
            asset_url, suggested_extension = self.asset_queue.popleft()
            if asset_url in self.seen_assets:
                continue
            self.seen_assets.add(asset_url)

            body, headers = self.fetch_binary(asset_url)
            extension = suggested_extension or guess_extension(asset_url, headers)
            relative_output = local_path_for_url(
                self.site_origin,
                asset_url,
                is_page=False,
                suggested_extension=extension,
            )
            output_path = self.output_dir / relative_output
            output_path.parent.mkdir(parents=True, exist_ok=True)

            content_type = headers.get("content-type", "")
            if "text/css" in content_type or relative_output.suffix == ".css":
                css_text = body.decode("utf-8", errors="ignore")
                rewritten_css, nested_assets = rewrite_css_urls(
                    css_text=css_text,
                    css_url=asset_url,
                    css_output_path=relative_output,
                    site_origin=self.site_origin,
                )
                output_path.write_text(rewritten_css, encoding="utf-8")
                self.enqueue_assets(nested_assets)
            else:
                output_path.write_bytes(body)

    def run(self) -> None:
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.mirror_pages()
        self.mirror_assets()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Mirror a deployed site into a local folder.")
    parser.add_argument(
        "--url",
        default="https://personal-master-site--zhaosenlin12.replit.app/",
        help="Site entry URL to mirror.",
    )
    parser.add_argument(
        "--output",
        default="site_mirror",
        help="Output directory relative to the current project root.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    output_dir = Path(args.output)
    SiteMirror(args.url, output_dir).run()
    print(f"Mirrored {args.url} to {output_dir}")


if __name__ == "__main__":
    main()
