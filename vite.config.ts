import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

// 宝塔 Nginx 站点配置（zsl.codebn.cn 用）
const BT_NGINX_LINES = [
  "# ===== 宝塔 Nginx 配置:粘贴到 网站 -> 配置文件 -> server { ... } 内 =====",
  "location / {",
  "    try_files $uri $uri/ /index.html;",
  "}",
  "",
  "location ~* \\.(?:js|css|woff2|svg|png|jpg|jpeg|webp|mp4)$ {",
  "    expires 30d;",
  'add_header Cache-Control "public, max-age=2592000, immutable";',
  'add_header X-Content-Type-Options "nosniff";',
  "    access_log off;",
  "}",
  "",
  "location = /index.html {",
  'add_header Cache-Control "no-cache, must-revalidate";',
  'add_header X-Frame-Options "SAMEORIGIN";',
  'add_header X-Content-Type-Options "nosniff";',
  'add_header Referrer-Policy "strict-origin-when-cross-origin";',
  'add_header Permissions-Policy "camera=(), microphone=(), geolocation=()";',
  "}",
  "",
  "location /media/ {",
  "    expires 7d;",
  'add_header Cache-Control "public, max-age=604800, must-revalidate";',
  'add_header X-Content-Type-Options "nosniff";',
  "}",
  "",
  "location ~* \\.(?:woff2|ttf|otf)$ {",
  'add_header Access-Control-Allow-Origin "*";',
  "}",
  "",
];

const DEPLOY_LINES = [
  "# 部署说明（zsl.codebn.cn）",
  "",
  "## 方式 A：Cloudflare Pages",
  "npx wrangler pages deploy dist --project-name senlin",
  "",
  "## 方式 B：宝塔面板",
  "1. 上传 dist/ 内全部内容到网站根目录（带 hash 的 assets/ 文件名不要改）",
  "2. 网站 -> 配置文件 -> server { ... } 里粘贴 bt-nginx.conf 全部内容，保存即生效",
  "",
  "## 验证清单",
  "- [ ] 打开 https://zsl.codebn.cn，Hero 视频自动播放，微信里打开首屏不是黑屏（有静态底图兜底）",
  "- [ ] 顶部导航 8 个锚点都能跳转，窄屏可横向滑动",
  "- [ ] 「我的产品」6 张卡片点开跳到正确地址",
  "- [ ] 刷新任意子路径不报 404（SPA fallback）",
  "- [ ] 浏览器标签页标题是「森林 · Senlin Studio | 教学现场」",
  "",
];

const writeBtArtifacts = () => ({
  name: "bt-deploy-artifacts",
  closeBundle() {
    const dist = resolve(process.cwd(), "dist");
    mkdirSync(dist, { recursive: true });
    writeFileSync(resolve(dist, "bt-nginx.conf"), BT_NGINX_LINES.join("\n"));
    writeFileSync(resolve(dist, "DEPLOY.md"), DEPLOY_LINES.join("\n"));
  },
});

export default defineConfig({
  server: { headers: { "X-Content-Type-Options": "nosniff" } },
  preview: { headers: { "X-Content-Type-Options": "nosniff" } },
  plugins: [react(), writeBtArtifacts()],
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
