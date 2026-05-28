import { useEffect, useState } from 'react'
import { X, Download, Share } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

function isInStandaloneMode() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in window.navigator && (window.navigator as { standalone?: boolean }).standalone === true)
  )
}

const DISMISSED_KEY = 'nectar-install-dismissed'

export function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showIOSHint, setShowIOSHint] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Already installed or user dismissed before — stay hidden
    if (isInStandaloneMode()) return
    if (sessionStorage.getItem(DISMISSED_KEY)) return

    if (isIOS()) {
      // iOS doesn't fire beforeinstallprompt — show manual instructions
      setShowIOSHint(true)
      setVisible(true)
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const dismiss = () => {
    setVisible(false)
    sessionStorage.setItem(DISMISSED_KEY, '1')
  }

  const install = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setVisible(false)
    setDeferredPrompt(null)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-[76px] left-0 right-0 z-50 flex justify-center px-3 lg:hidden">
      <div className="w-full max-w-md bg-[#181725] text-white rounded-2xl shadow-card-lg px-4 py-3 flex items-center gap-3">
        {/* Nectar carrot icon */}
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
          <img
            src="/icons/pwa-192x192.png"
            alt="Nectar"
            className="w-8 h-8 object-contain rounded-lg"
          />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          {showIOSHint ? (
            <>
              <p className="text-sm font-semibold leading-tight">Add Nectar to Home Screen</p>
              <p className="text-xs text-white/60 mt-0.5 leading-tight">
                Tap&nbsp;
                <Share size={11} className="inline mb-0.5" />
                &nbsp;then "Add to Home Screen"
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold leading-tight">Install Nectar</p>
              <p className="text-xs text-white/60 mt-0.5">Add to your home screen</p>
            </>
          )}
        </div>

        {/* CTA / dismiss */}
        {showIOSHint ? (
          <button
            onClick={dismiss}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 flex-shrink-0"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        ) : (
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={install}
              className="flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors"
              aria-label="Install app"
            >
              <Download size={13} />
              Install
            </button>
            <button
              onClick={dismiss}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
