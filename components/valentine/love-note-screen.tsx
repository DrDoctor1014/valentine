"use client"

import { useEffect, useState } from "react"
import { Heart, X, Feather } from "lucide-react"
import { cn } from "@/lib/utils"

const LOVE_NOTE_MESSAGE = `My Dearest Sara,

From the very first moment I saw you, something in my heart just knew. Your smile has this incredible way of lighting up every room you walk into, and your laugh—it's honestly the most beautiful sound I've ever heard.

Every single day with you feels like an adventure I never want to end. You inspire me to be better, to dream bigger, and to love deeper. I'm so incredibly grateful that out of everyone in the world, you chose me.

This Valentine's Day is our first together, and I wanted to create something special just for you. Something that shows you, even just a little bit, how much you mean to me. Though honestly, I don't think words will ever be enough.

You are my sunshine on cloudy days, the calm in my storms, and the reason I look forward to every tomorrow. I can't wait to share a lifetime of Valentine's Days with you, building memories and a beautiful future together.

Thank you for being unapologetically you, for loving me through it all, and for making every ordinary moment feel magical.

I love you more than you'll ever know.`

interface FloatingHeartProps {
  delay: number
  left: string
  size: number
}

function FloatingHeart({ delay, left, size }: FloatingHeartProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!visible) return null

  return (
    <div
      className="absolute animate-float-up text-rose-300/50 pointer-events-none"
      style={{ left, bottom: 0, animationDelay: `${delay}ms` }}
    >
      <Heart size={size} fill="currentColor" />
    </div>
  )
}

interface LoveNoteScreenProps {
  onClose: () => void
}

export function LoveNoteScreen({ onClose }: LoveNoteScreenProps) {
  const [mounted, setMounted] = useState(false)
  const [textRevealed, setTextRevealed] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setTextRevealed(true), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col px-4 md:px-6 py-6 bg-gradient-to-b from-rose-100 via-pink-50 to-rose-50 overflow-hidden">
      {/* Floating Hearts */}
      <FloatingHeart delay={0} left="8%" size={16} />
      <FloatingHeart delay={1500} left="92%" size={14} />
      <FloatingHeart delay={3000} left="15%" size={12} />
      <FloatingHeart delay={4500} left="85%" size={18} />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Close Button */}
      <div
        className={cn(
          "relative z-20 flex justify-end mb-4 transition-all duration-300",
          mounted ? "opacity-100" : "opacity-0"
        )}
      >
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white hover:scale-105 active:scale-95 transition-all"
        >
          <X className="w-5 h-5 text-rose-400" />
        </button>
      </div>

      {/* Title */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center mb-4 transition-all duration-700",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
      >
        <div className="flex items-center gap-3 mb-2">
          <Feather className="w-5 h-5 text-rose-400" />
          <h1 className="font-serif text-2xl md:text-3xl text-rose-900">A Love Letter</h1>
          <Feather className="w-5 h-5 text-rose-400 scale-x-[-1]" />
        </div>
      </div>

      {/* Card */}
      <div
        className={cn(
          "relative z-10 flex-1 transition-all duration-700 delay-200",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="h-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-rose-200/40 overflow-hidden flex flex-col border border-rose-100">
          {/* Decorative Header */}
          <div className="pt-6 px-6 flex justify-center">
            <div className="flex items-center gap-4">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-300" fill="currentColor" />
                <Heart className="w-4 h-4 text-rose-400" fill="currentColor" />
                <Heart className="w-3 h-3 text-rose-300" fill="currentColor" />
              </div>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
            </div>
          </div>

          {/* Message */}
          <div className="flex-1 overflow-y-auto px-6 md:px-10 py-6">
            <div
              className={cn(
                "transition-all duration-1000",
                textRevealed ? "opacity-100" : "opacity-0"
              )}
            >
              <p className="text-rose-800 leading-8 md:leading-9 whitespace-pre-line font-serif text-base md:text-lg">
                {LOVE_NOTE_MESSAGE}
              </p>
            </div>

            {/* Signature */}
            <div
              className={cn(
                "flex flex-col items-center mt-12 pb-4 transition-all duration-700 delay-700",
                textRevealed ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mb-6" />
              <p className="text-rose-400/60 text-sm tracking-wide mb-2">Forever Yours,</p>
              <p className="font-serif text-4xl text-rose-700 mb-3">Brady</p>
              <div className="flex items-center gap-2">
                <Heart className="w-3 h-3 text-rose-400 animate-pulse" fill="currentColor" />
                <Heart className="w-4 h-4 text-rose-500 animate-pulse" fill="currentColor" style={{ animationDelay: '0.2s' }} />
                <Heart className="w-3 h-3 text-rose-400 animate-pulse" fill="currentColor" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>

          {/* Bottom gradient */}
          <div className="h-12 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Continue hint */}
      <div
        className={cn(
          "relative z-10 flex justify-center mt-6 transition-all duration-500 delay-1000",
          textRevealed ? "opacity-100" : "opacity-0"
        )}
      >
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-6 py-3 bg-rose-400 text-white font-medium rounded-full shadow-lg shadow-rose-400/30 hover:bg-rose-500 hover:scale-105 active:scale-95 transition-all"
        >
          <span>Continue</span>
          <Heart className="w-4 h-4" fill="currentColor" />
        </button>
      </div>
    </div>
  )
}
