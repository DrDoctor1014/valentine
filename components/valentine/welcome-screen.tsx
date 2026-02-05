"use client"

import { useEffect, useState, useCallback } from "react"
import { Heart, Sparkles } from "lucide-react"
import { cn } from "../../lib/utils"

interface FloatingHeartProps {
  delay: number
  left: string
  size: number
  duration?: number
}

function FloatingHeart({ delay, left, size, duration = 6 }: FloatingHeartProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!visible) return null

  return (
    <div
      className="absolute bottom-0 animate-float-up pointer-events-none"
      style={{ 
        left, 
        animationDuration: `${duration}s`,
        animationDelay: `${delay}ms`
      }}
    >
      <Heart 
        size={size} 
        className="text-rose-300/70" 
        fill="currentColor" 
      />
    </div>
  )
}

function Particle({ delay, left }: { delay: number; left: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!visible) return null

  return (
    <div
      className="absolute w-1 h-1 rounded-full bg-rose-300/60 animate-twinkle"
      style={{ left, top: `${Math.random() * 60 + 10}%`, animationDelay: `${delay}ms` }}
    />
  )
}

interface WelcomeScreenProps {
  onContinue: () => void
}

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  const [mounted, setMounted] = useState(false)
  const [hearts, setHearts] = useState<Array<{ id: number; left: string; size: number; duration: number }>>([])

  useEffect(() => {
    setMounted(true)
    
    // Generate continuous floating hearts
    const generateHeart = () => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: `${Math.random() * 90 + 5}%`,
        size: Math.random() * 12 + 10,
        duration: Math.random() * 4 + 5,
      }
      setHearts(prev => [...prev.slice(-15), newHeart])
    }

    const interval = setInterval(generateHeart, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-rose-100 via-pink-50 to-rose-50 overflow-hidden">
      {/* Ambient particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Particle key={i} delay={i * 200} left={`${Math.random() * 100}%`} />
      ))}

      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <FloatingHeart
          key={heart.id}
          delay={0}
          left={heart.left}
          size={heart.size}
          duration={heart.duration}
        />
      ))}

      {/* Soft radial glow behind content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-rose-200/30 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Heart with Glow */}
        <div
          className={cn(
            "relative mb-10 transition-all duration-1000",
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )}
        >
          <div className="absolute inset-0 bg-rose-400/30 rounded-full blur-3xl scale-150 animate-pulse-glow" />
          <div className="relative animate-heartbeat w-64 h-64 md:w-80 md:h-80">
            <img 
              src="/images/romantic-heart.jpg"
              alt="Romantic heart"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
            <Sparkles className="absolute top-4 right-4 w-8 h-8 text-amber-300 animate-sparkle" />
            <Sparkles className="absolute bottom-8 left-4 w-6 h-6 text-amber-300 animate-sparkle" style={{ animationDelay: '0.5s' }} />
            <Sparkles className="absolute top-12 left-8 w-5 h-5 text-rose-300 animate-sparkle" style={{ animationDelay: '0.8s' }} />
          </div>
        </div>

        {/* Title with elegant styling */}
        <div
          className={cn(
            "flex flex-col items-center mb-8 transition-all duration-700 delay-300",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <p className="text-rose-400/80 text-sm tracking-[0.3em] uppercase mb-3 font-medium">
            A Special Gift
          </p>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-rose-300" />
            <Heart className="w-3 h-3 text-rose-400" fill="currentColor" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-rose-300" />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-rose-900 tracking-tight">
            For Sara
          </h1>
        </div>

        {/* Romantic subtitle */}
        <div
          className={cn(
            "flex flex-col items-center transition-all duration-700 delay-500",
            mounted ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex items-center gap-1.5 mb-4">
            <Heart className="w-2 h-2 text-rose-300" fill="currentColor" />
            <Heart className="w-3 h-3 text-rose-400" fill="currentColor" />
            <Heart className="w-4 h-4 text-rose-400" fill="currentColor" />
            <Heart className="w-3 h-3 text-rose-400" fill="currentColor" />
            <Heart className="w-2 h-2 text-rose-300" fill="currentColor" />
          </div>
          <p className="text-rose-600/70 text-base md:text-lg italic font-serif">
            Something made with love, just for you
          </p>
        </div>
      </div>

      {/* Continue Button */}
      <div
        className={cn(
          "absolute bottom-12 transition-all duration-700 delay-700",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <button
          onClick={onContinue}
          className="group relative flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-rose-400 via-rose-500 to-pink-500 text-white font-semibold rounded-full shadow-xl shadow-rose-400/40 hover:shadow-2xl hover:shadow-rose-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative text-lg tracking-wide">Open Your Gifts</span>
          <Heart className="relative w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" />
        </button>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-rose-100/50 to-transparent pointer-events-none" />
    </div>
  )
}
