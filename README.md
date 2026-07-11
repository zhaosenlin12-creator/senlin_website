# 森林 · Senlin Studio

森林的个人作品站 —— 乐启享合伙人 / 副校长,湖北宜昌。

## 技术栈

- **构建**: Vite 8 + React 19 + TypeScript
- **样式**: Tailwind CSS v3
- **动效**: framer-motion + @use-gesture/react
- **图标**: lucide-react
- **字体**: Inter / Plus Jakarta Sans / Instrument Serif / Noto Sans SC (Google Fonts)
- **部署**: Cloudflare Pages (https://senlin-c1n.pages.dev)

## 本地开发

```bash
npm install
npm run dev          # 启动开发服务器
npm run build        # 生产构建 (输出到 dist/)
npm run preview      # 预览生产构建
```

## 部署

```bash
npx wrangler pages deploy dist --project-name senlin --commit-dirty=true
```

## 目录结构

```
prisma-web/
  src/
    components/      # 7 个主要 section 组件
    content.ts       # 站点内容数据
    index.css        # 字体变量 + 全局样式
    main.tsx         # React 入口
  public/
    media/           # 图片/视频资源
      scenes/        # 教学场景图
      gallery/       # 穹顶画廊图
      apps/          # 应用截图
      posters/       # 视频缩略图
      videos/        # 视频文件
      qr/            # 二维码
  vite.config.ts     # 构建配置 + _headers / _redirects
  index.html         # 入口
```

## 站点结构 (7 个 section)

1. **Hero** —— 双视频交叉淡入,巨型打字机标题
2. **About** —— 个人介绍 + KPI
3. **教学方向 (Features)** —— 5 张课程卡片
4. **穹顶画廊 (Dome Gallery)** —— React Bits 球体画廊 (自动旋转)
5. **作品视频 (Video Row)** —— 抖音入口 + 3 视频缩略图 + 弹窗播放
6. **项目应用 (Apps)** —— 7 张应用卡片
7. **联系 (Contact)** —— 微信 + 抖音 二维码

## Hero 视频

视频使用 CloudFront CDN 直链 (`d8j0ntlcm91z4.cloudfront.net`),每 12 秒自动交叉淡入。

## 性能

- JS 包: 403 KB (gzip 127 KB)
- CSS: 33 KB (gzip 7 KB)
- 首屏: 2 个视频 + 首屏图片 (loading="eager")
- 其余图片: `loading="lazy"` + IntersectionObserver 触发
- 字体异步加载,带 preload 预连接
- 静态资源 1 年 immutable 缓存 + media 7 天缓存
