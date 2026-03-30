'use client'

import { useEffect, useState } from 'react'
import { ThemeImage } from './ThemeImage'

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    // Only show splash screen once per session
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash')

    if (hasSeenSplash) {
      setIsVisible(false)
      return
    }

    sessionStorage.setItem('hasSeenSplash', 'true')

    // Mulai memudar setelah 0.8 detik (sebelumnya 1.2 detik)
    const timer1 = setTimeout(() => {
      setIsFading(true)
    }, 800)

    // Hapus dari DOM sepenuhnya setelah 1.1 detik (sebelumnya 1.7 detik)
    const timer2 = setTimeout(() => {
      setIsVisible(false)
    }, 1100)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[999] bg-background flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center animate-in zoom-in-95 fade-in-0 duration-500 ease-out">
        <ThemeImage
          lightSrc="/Logo.png"
          darkSrc="/Logo-darkmode.png"
          alt="Logo"
          width={92}
          height={92}
          className="object-contain drop-shadow-sm mb-4"
          priority
        />
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          MariMenugas
        </h1>
        <div className="w-10 h-1 bg-foreground/10 rounded-full mt-3 overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-full bg-foreground rounded-full animate-[progress_0.8s_ease-in-out_forwards]" />
        </div>
      </div>
    </div>
  )
}