import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import {AppUserProvider} from "./context/AppUserProvider.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider> 
       <AppUserProvider>
        <App />
       </AppUserProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
