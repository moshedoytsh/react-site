import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import CurrentDisplayProvider from './routes/CurrentDisplayContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CurrentDisplayProvider>
      <App />
    </CurrentDisplayProvider>
  </React.StrictMode>,
)
