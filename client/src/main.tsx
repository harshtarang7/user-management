import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import DashboardLayout from './common/layout/DashboardLayout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DashboardLayout>
    <App />
    </DashboardLayout>
  </StrictMode>,
)
