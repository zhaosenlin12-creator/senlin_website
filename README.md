# 森林 · Senlin Studio

森林的个人作品站 —— 乐启享合伙人 / 副校长，湖北宜昌。
两条主线：**少儿编程造物** 与 **成人 AI 实战与交付**。

线上：https://zsl.codebn.cn/

## 技术栈

- **构建**：Vite 8 + React 19 + TypeScript
- **样式**：Tailwind CSS v3
- **动效**：framer-motion + @use-gesture/react
- **图标**：lucide-react
- **字体**：Inter / Plus Jakarta Sans / Instrument Serif 全部自托管在 public/fonts（latin + latin-ext 子集，中文走系统字体）

## 本地开发

    npm install
    npm run dev          # 开发服务器
    npm run build        # 生产构建（输出到 dist/）
    npm run preview      # 预览生产构建
    npm run lint         # oxlint
    npm run test:site    # Playwright 端到端完整性测试

## 部署

    npx wrangler pages deploy dist --project-name senlin

public/_headers 配了缓存与安全响应头，public/_redirects 配了 SPA fallback。
若走宝塔面板，构建产物里会额外生成 dist/bt-nginx.conf 和 dist/DEPLOY.md。

## 站点结构

| # | 区块 | id | 说明 |
| - | ---- | -- | ---- |
| 1 | Hero | 无 | 双背景视频交叉淡入 + 打字机标题，顶部 8 个锚点导航 |
| 2 | 关于我 | story | 个人介绍 + KPI 条 |
| 3 | 交付成果 | deliver | 4 个真实交付项，Remotion 循环动画 + 实拍截图，可放大预览 |
| 4 | 课程体系 | courses | 少儿 4 门 + 成人 3 门，共 7 门 |
| 5 | 真实现场 | scene | 成人实战与企业内训现场照片墙 |
| 6 | 作品墙 | gallery | React Bits 球体画廊，22 张作品，自动旋转 / 可拖拽 / 点击放大 |
| 7 | 我的产品 | apps | 6 个代表作卡片 |
| 8 | 作品视频 | video | 两个抖音号入口 + 3 段作品视频（弹窗播放） |
| 9 | 收徒 | mentor | 收徒路径与联系方式 |
| 10 | 联系 | contact | 微信 / 抖音二维码，点击放大 |

## 目录结构

    src/
      components/      # 各区块组件
      motion/          # Reveal / Tilt / CountUp / Marquee / ShinyText
      lib/accent.ts    # 配色 token
      content.ts       # 全站文案与数据（唯一内容源）
      fonts/           # 自托管字体 @font-face
      index.css        # 字体变量 + 全局样式
    public/
      media/           # 图片 / 视频 / 二维码
        apps/          # 产品截图
        gallery/       # 穹顶画廊 22 张
        posters/       # 视频封面 + Hero 首屏底图
        loops/         # 交付区 Remotion 循环动画
        videos/        # Hero 背景视频 + 作品视频
        qr/            # 微信 / 抖音二维码
    tests/
      site-integrity.test.mjs   # 端到端完整性测试

## 性能约定

- **首屏**：Hero 静态底图 hero-poster.jpg 预加载先出画面，两段背景视频 1600×896 / CRF29 共约 2MB
- **视频**：除 Hero 外全部走 LazyVideo，进入视口才挂载，preload="none"
- **图片**：全部 loading="lazy" + decoding="async"；轮播只预加载下一张
- **穹顶画廊**：懒加载分包，滚到附近才下载
- **缓存**：/assets/* 一年 immutable，/media/* 7 天
- **无障碍**：prefers-reduced-motion 下关闭动画与平滑滚动
