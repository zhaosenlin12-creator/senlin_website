from __future__ import annotations

import json
import sys
from pathlib import Path
from urllib.parse import urlparse

sys.path.insert(0, r"D:\kaifa\Scrapling")

from scrapling.fetchers import DynamicFetcher


ROOT = Path(__file__).resolve().parent
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

REFERENCES = [
    {
        "id": "14islands",
        "url": "https://www.14islands.com/",
        "wait_selector": "body",
    },
    {
        "id": "active-theory",
        "url": "https://activetheory.net/",
        "wait_selector": "body",
    },
    {
        "id": "bruno-simon",
        "url": "https://bruno-simon.com/",
        "wait_selector": "body",
    },
]


def capture_reference(ref: dict[str, str]) -> dict[str, object]:
    screenshot_path = ROOT / f"{ref['id']}-home.png"
    metadata_path = ROOT / f"{ref['id']}-capture.json"

    def inspect_page(page):
        page.set_viewport_size({"width": 1440, "height": 1100})
        page.wait_for_timeout(3500)
        page.screenshot(path=str(screenshot_path), full_page=False)

        metadata = page.evaluate(
            """() => {
              const visibleText = (node) => {
                const style = window.getComputedStyle(node);
                const rect = node.getBoundingClientRect();
                return style.visibility !== "hidden"
                  && style.display !== "none"
                  && rect.width > 0
                  && rect.height > 0;
              };

              const pick = (selector, limit = 16) => Array
                .from(document.querySelectorAll(selector))
                .filter(visibleText)
                .slice(0, limit)
                .map((el) => ({
                  tag: el.tagName.toLowerCase(),
                  text: (el.innerText || el.textContent || "").replace(/\\s+/g, " ").trim().slice(0, 220),
                  className: String(el.className || "").slice(0, 220),
                }))
                .filter((item) => item.text);

              const resources = performance.getEntriesByType("resource")
                .map((entry) => {
                  const url = new URL(entry.name, location.href);
                  return {
                    host: url.hostname,
                    path: url.pathname.split("/").pop(),
                    type: entry.initiatorType,
                    transferSize: entry.transferSize || 0,
                  };
                });

              const resourceTypes = resources.reduce((acc, item) => {
                acc[item.type || "unknown"] = (acc[item.type || "unknown"] || 0) + 1;
                return acc;
              }, {});

              const scripts = Array.from(document.scripts)
                .map((script) => script.src)
                .filter(Boolean)
                .map((src) => {
                  const url = new URL(src, location.href);
                  return `${url.hostname}${url.pathname}`;
                })
                .slice(0, 30);

              const stylesheets = Array.from(document.styleSheets)
                .map((sheet) => sheet.href)
                .filter(Boolean)
                .map((href) => {
                  const url = new URL(href, location.href);
                  return `${url.hostname}${url.pathname}`;
                })
                .slice(0, 30);

              return {
                title: document.title,
                url: location.href,
                bodyTextLength: document.body.innerText.length,
                headings: pick("h1,h2,h3", 24),
                navLinks: pick("nav a, header a, a", 20),
                buttons: pick("button", 12),
                hasCanvas: Boolean(document.querySelector("canvas")),
                canvasCount: document.querySelectorAll("canvas").length,
                videoCount: document.querySelectorAll("video").length,
                svgCount: document.querySelectorAll("svg").length,
                resourceTypes,
                scripts,
                stylesheets,
              };
            }"""
        )
        metadata_path.write_text(
            json.dumps(metadata, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )

    response = DynamicFetcher.fetch(
        ref["url"],
        real_chrome=True,
        executable_path=CHROME,
        network_idle=False,
        wait=2500,
        wait_selector=ref["wait_selector"],
        wait_selector_state="attached",
        timeout=60000,
        page_action=inspect_page,
        additional_args={
            "ignore_https_errors": True,
            "viewport": {"width": 1440, "height": 1100},
        },
    )

    metadata = json.loads(metadata_path.read_text(encoding="utf-8")) if metadata_path.exists() else {}
    metadata.update(
        {
            "id": ref["id"],
            "requestedUrl": ref["url"],
            "hostname": urlparse(ref["url"]).hostname,
            "screenshot": screenshot_path.name if screenshot_path.exists() else None,
        }
    )
    return metadata


def main() -> None:
    results = []
    for ref in REFERENCES:
        try:
            results.append(capture_reference(ref))
        except Exception as exc:
            results.append(
                {
                    "id": ref["id"],
                    "requestedUrl": ref["url"],
                    "error": f"{type(exc).__name__}: {exc}",
                }
            )

    (ROOT / "reference-captures.json").write_text(
        json.dumps(results, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
