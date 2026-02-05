"use client"

import { useEffect, useState } from "react"
import { Heart, X } from "lucide-react"
import { cn } from "@/lib/utils"

const LOVE_NOTE_MESSAGE = `My Dearest Sara,

From the moment I met you, my world became brighter. Your smile lights up every room, and your laugh is the most beautiful sound I've ever heard.

Every day with you feels like a gift. You make me want to be a better person, and I'm so grateful that you chose me.

This Valentine's Day is our first together, and I wanted to create something special just for you. Something that shows you how much you mean to me.

You are my sunshine, my heart, and my everything. I can't wait to share many more Valentine's Days with you, and to build a beautiful future together.

Thank you for being you, for loving me, and for making every moment magical.`

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
      className="absolute animate-float text-primary/40"
      style={{ left, top }}
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

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col px-4 md:px-6 py-6 bg-gradient-to-b from-rose-50 via-pink-50 to-background">
      {/* Floating Hearts */}
      <FloatingHeart delay={0} left="8%" top="15%" size={14} />
      <FloatingHeart delay={600} left="88%" top="20%" size={12} />
      <FloatingHeart delay={1200} left="12%" top="75%" size={16} />
      <FloatingHeart delay={900} left="85%" top="70%" size={10} />

      {/* Close Button */}
      <div
        className={cn(
          "flex justify-end mb-4 transition-all duration-300",
          mounted ? "opacity-100" : "opacity-0"
        )}
      >
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/90 shadow-sm flex items-center justify-center hover:bg-white hover:scale-105 active:scale-95 transition-all"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Card */}
      <div
        className={cn(
          "flex-1 transition-all duration-700 delay-100",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="h-full bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg shadow-pink-200/30 overflow-hidden flex flex-col">
          {/* Decorative Header */}
          <div className="pt-6 px-6 flex justify-center">
            <div className="flex items-center gap-3">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/40" />
              <Heart className="w-4 h-4 text-primary" fill="currentColor" />
              <Heart className="w-5 h-5 text-primary" fill="currentColor" />
              <Heart className="w-4 h-4 text-primary" fill="currentColor" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/40" />
            </div>
          </div>

          {/* Message */}
          <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
            <div
              className={cn(
                "transition-all duration-700 delay-400",
                mounted ? "opacity-100" : "opacity-0"
              )}
            >
              <p className="text-foreground leading-8 whitespace-pre-line font-serif">
                {LOVE_NOTE_MESSAGE}
              </p>
            </div>

            {/* Signature */}
            <div
              className={cn(
                "flex flex-col items-center mt-10 transition-all duration-700 delay-600",
                mounted ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="w-12 h-px bg-primary/30 mb-4" />
              <p className="font-serif text-3xl text-foreground mb-2">Love, Brady</p>
              <div className="flex items-center gap-1.5">
                <Heart className="w-2.5 h-2.5 text-primary" fill="currentColor" />
                <Heart className="w-3.5 h-3.5 text-primary" fill="currentColor" />
                <Heart className="w-2.5 h-2.5 text-primary" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Bottom gradient */}
          <div className="h-10 bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
