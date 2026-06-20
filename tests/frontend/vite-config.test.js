import { describe, expect, test } from "vitest";

import viteConfig from "../../vite.config.js";

describe("vite config", () => {
  test("limits dependency scanning to the app entrypoint", () => {
    expect(viteConfig.optimizeDeps?.entries).toEqual(["index.html"]);
  });

  test("ignores mirrored crawl artifacts during file watching", () => {
    expect(viteConfig.server?.watch?.ignored).toContain("**/site_mirror/**");
  });
});
