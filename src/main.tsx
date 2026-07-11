// Senlin Studio - 本地字体接入 + React 入口
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// 西文字体:Inter Variable + Plus Jakarta Sans Variable(取代 Google Fonts)
import '@fontsource-variable/inter/index.css'
import '@fontsource-variable/plus-jakarta-sans/index.css'
import '@fontsource-variable/inter/wght-italic.css'
import '@fontsource-variable/plus-jakarta-sans/wght-italic.css'

// Instrument Serif 仅静态字重,400 常规 + 400 italic
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'

// 中文走系统 Noto Sans SC(避免 CDN)
import './fonts/zh.css'

import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
