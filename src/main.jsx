import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/Authprovider'
import GlobalContext from './context/GlobalContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <GlobalContext>
        <App />
      </GlobalContext>
    </AuthProvider>
  </StrictMode>
)
