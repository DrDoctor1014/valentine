"use client"

import { useEffect, useState } from "react"
import { Heart, Gift } from "lucide-react"
import { cn } from "@/lib/utils"

interface FloatingHeartProps {
  delay: number
  left: string
  top: string
  size: number
}

function FloatingHeart({ delay, left, top, size }: FloatingHeartProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!visible) return null

  return (
    <div
      className="absolute animate-float text-primary/60"
      style={{ left, top }}
    >
      <Heart size={size} fill="currentColor" />
    </div>
  )
}

interface WelcomeScreenProps {
  onContinue: () => void
}

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between px-6 py-12 bg-gradient-to-b from-rose-50 via-pink-50 to-background">
      {/* Floating Hearts Background */}
      <FloatingHeart delay={0} left="10%" top="15%" size={16} />
      <FloatingHeart delay={400} left="85%" top="12%" size={14} />
      <FloatingHeart delay={800} left="20%" top="70%" size={12} />
      <FloatingHeart delay={1200} left="80%" top="65%" size={18} />
      <FloatingHeart delay={600} left="50%" top="8%" size={10} />
      <FloatingHeart delay={1000} left="15%" top="45%" size={14} />
      <FloatingHeart delay={1400} left="88%" top="40%" size={12} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Gift Icon with Glow */}
        <div
          className={cn(
            "relative mb-12 transition-all duration-1000",
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
          )}
        >
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="relative w-40 h-40 flex items-center justify-center">
            <Gift className="w-24 h-24 text-primary" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title with decorative elements */}
        <div
          className={cn(
            "flex items-center gap-4 mb-6 transition-all duration-700 delay-300",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <div className="w-10 h-px bg-primary/40" />
          <h1 className="font-serif text-4xl md:text-5xl text-foreground">For Sara</h1>
          <div className="w-10 h-px bg-primary/40" />
        </div>

        {/* Subtitle with hearts */}
        <div
          className={cn(
            "flex flex-col items-center transition-all duration-700 delay-500",
            mounted ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex items-center gap-1 mb-4">
            <Heart className="w-2.5 h-2.5 text-primary" fill="currentColor" />
            <Heart className="w-3.5 h-3.5 text-primary mx-1" fill="currentColor" />
            <Heart className="w-4.5 h-4.5 text-primary mx-1" fill="currentColor" />
            <Heart className="w-3.5 h-3.5 text-primary mx-1" fill="currentColor" />
            <Heart className="w-2.5 h-2.5 text-primary" fill="currentColor" />
          </div>
          <p className="text-muted-foreground text-sm tracking-wide">
            A Valentine&apos;s surprise awaits
          </p>
        </div>
      </div>

      {/* Continue Button */}
      <div
        className={cn(
          "transition-all duration-700 delay-700",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary/30 rounded-full blur-lg animate-pulse-glow" />
          <button
            onClick={onContinue}
            className="relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-300 via-pink-400 to-pink-500 text-white font-semibold rounded-full shadow-lg shadow-pink-400/40 hover:shadow-xl hover:shadow-pink-400/50 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span className="text-lg">Open Your Gifts</span>
            <Heart className="w-5 h-5" fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  )
}
