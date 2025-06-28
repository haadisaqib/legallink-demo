import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { Amplify } from 'aws-amplify'
// import { signOut } from 'aws-amplify/auth' // No longer needed

// Configure Amplify using environment variables
Amplify.configure({
  Auth: {
    Cognito: {
      // VITE_ is a requirement for Vite projects to expose env vars to the client
      userPoolId: import.meta.env.VITE_APP_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_APP_USER_POOL_CLIENT_ID,
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)