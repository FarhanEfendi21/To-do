'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

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

    // Mulai memudar setelah 1.2 detik
    const timer1 = setTimeout(() => {
      setIsFading(true)
    }, 1200)

    // Hapus dari DOM sepenuhnya setelah animasi selesai
    const timer2 = setTimeout(() => {
      setIsVisible(false)
    }, 1700)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[999] bg-[#FAFAFA] flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
    >
      <div className="flex flex-col items-center animate-in zoom-in-95 fade-in-0 duration-700 ease-out">
        <Image
          src="/Logo.png"
          alt="Logo"
          width={104}
          height={104}
          className="object-contain drop-shadow-md mb-5"
          priority
        />
        <h1 className="text-2xl font-bold tracking-tight text-[#111111]">
          MariMenugas
        </h1>
        <div className="w-12 h-1 bg-[#111111] rounded-full mt-4 bg-opacity-10 overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-full bg-[#111111] rounded-full animate-[progress_1.2s_ease-in-out_forwards]" />
        </div>
      </div>
    </div>
  )
}
