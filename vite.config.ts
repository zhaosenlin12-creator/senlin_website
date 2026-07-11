import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const writeCloudflareHelpers = () => ({
  name: "cloudflare-helpers",
  closeBundle() {
    const dist = resolve(process.cwd(), "dist");
    mkdirSync(dist, { recursive: true });
    writeFileSync(
      resolve(dist, "_headers"),
      [
        "# Cache + performance / security headers",
        "/assets/*",
        "  Cache-Control: public, max-age=31536000, immutable",
        "  X-Content-Type-Options: nosniff",
        "",
        "/media/*",
        "  Cache-Control: public, max-age=604800, must-revalidate",
        "  X-Content-Type-Options: nosniff",
        "",
        "/",
        "  Cache-Control: public, max-age=0, must-revalidate",
        "  X-Frame-Options: SAMEORIGIN",
        "  Referrer-Policy: strict-origin-when-cross-origin",
        "  X-Content-Type-Options: nosniff",
        "  Permissions-Policy: camera=(), microphone=(), geolocation=()",
        "",
      ].join("\n")
    );
    writeFileSync(
      resolve(dist, "_redirects"),
      "/*    /index.html   200\n"
    );
  },
});

export default defineConfig({
  plugins: [react(), writeCloudflareHelpers()],
  build: {
    target: "es2020",
    cssCodeSplit: true,
    cssMinify: "lightningcss",
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("framer-motion")) return "vendor-motion";
          if (id.includes("@use-gesture")) return "vendor-gesture";
          if (id.includes("lucide-react")) return "vendor-icons";
          return "vendor";
        },
      },
    },
  },
});
