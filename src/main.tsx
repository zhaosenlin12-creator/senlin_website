// Senlin Studio - 本地字体接入 + React 入口
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// 字体:仅引入 latin + latin-ext 子集(国内用户不需要 cyrillic/greek/vietnamese)
import './fonts/inter.css'
import './fonts/plus-jakarta.css'
import './fonts/instrument-serif.css'

// 中文走系统 Noto Sans SC(避免额外 CDN)
import './fonts/zh.css'

import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
