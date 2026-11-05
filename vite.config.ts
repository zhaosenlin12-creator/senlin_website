import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

// 宝塔 Nginx 站点配置（zsl.codebn.cn 用）
const BT_NGINX_LINES = [
  "# ===== 宝塔 Nginx 配置:粘贴到 网站 -> 配置文件 -> server { ... } 内 =====",
  "# 只用 expires 设缓存,不加 add_header —— 这样不会覆盖掉 server 块里原有的安全响应头",
  "# ^~ 让 /media/ 优先于后面的正则,否则图片视频会被通用规则截走变成 30 天缓存",
  "",
  "# 1) 带 hash 的构建产物:一年不变",
  "location ~* ^/assets/.*\\.(?:js|css)$ {",
  "    expires 365d;",
  "    access_log off;",
  "}",
  "",
  "# 2) 图标 / 字体 / manifest:30 天",
  "location ~* \\.(?:svg|png|ico|webmanifest|woff2|ttf|otf)$ {",
  "    expires 30d;",
  "    access_log off;",
  "}",
  "",
  "# 3) 视频 / 图片素材:7 天,换素材后 7 天内全网生效",
  "location ^~ /media/ {",
  "    expires 7d;",
  "    access_log off;",
  "}",
  "",
  "# 4) 单页路由:刷新 /story /apps 不 404",
  "location / {",
  "    try_files $uri $uri/ /index.html;",
  "}",
  "",
  "# 5) 首页不缓存,保证更新后立刻生效",
  "location = /index.html {",
  "    expires -1;",
  "    access_log off;",
  "}",
  "",
];

const DEPLOY_LINES = [
  "# 部署说明（zsl.codebn.cn）",
  "",
  "## 方式 A：宝塔面板（本次使用）",
  "",
  "1. 上传 senlin-deploy-*.zip 到网站根目录并解压，压缩包内容直接就是站点根（index.html / assets / media / fonts）",
  "2. 网站 -> 配置文件 -> server { ... } 块里粘贴 bt-nginx.conf 全部内容，保存",
  "3. 宝塔面板本身默认已开 gzip；若已关闭，在 server 块里补上：",
  "       gzip on;",
  "       gzip_min_length 1k;",
  "       gzip_comp_level 4;",
  "       gzip_types text/plain text/css application/javascript application/json image/jpeg;",
  "",
  "## 方式 B：Cloudflare Pages",
  "npx wrangler pages deploy dist --project-name senlin",
  "",
  "## 验证清单",
  "- [ ] 打开 https://zsl.codebn.cn，Hero 视频自动播放，微信里打开首屏不是黑屏（有静态底图兜底）",
  "- [ ] 顶部导航 8 个锚点都能跳转，窄屏可横向滑动",
  "- [ ] 「我的产品」6 张卡片点开跳到正确地址",
  "- [ ] 刷新任意子路径不报 404（SPA fallback）",
  "- [ ] 页面右键查看源代码，hero-poster.jpg 已预加载",
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
