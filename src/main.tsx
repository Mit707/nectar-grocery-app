import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.tsx'

// Register service worker. autoUpdate means the SW silently updates in the
// background; `onOfflineReady` fires once the app is fully cached for offline.
registerSW({
  onOfflineReady() {
    console.info('[PWA] App ready to work offline.')
  },
  onRegisteredSW(swUrl, registration) {
    // Check for updates every hour while the page is open
    if (registration) {
      setInterval(() => {
        registration.update().catch(() => {})
      }, 60 * 60 * 1000)
    }
    console.info('[PWA] SW registered:', swUrl)
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
