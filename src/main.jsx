import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
 
// Importa o AuthProvider
import { AuthProvider } from './context/AuthContext'
import { RequestProvider } from './components/ToastContext'
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RequestProvider>
        <App />
      </RequestProvider>
    </AuthProvider>
  </StrictMode>
)