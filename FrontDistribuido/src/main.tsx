import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import MenuComponent from './MenuComponent.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MenuComponent />
  </StrictMode>,
)
