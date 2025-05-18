import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import MenuComponent from './MenuComponent.tsx'
import MenuForm from './MenuForm.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   
     
     <App/>
  </StrictMode>,
)
