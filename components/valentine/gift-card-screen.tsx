"use client"

import { useEffect, useState } from "react"
import { Heart, Star, X, Eye, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const GIFT_CARD_CODE = "XXXX-XXXXXX-XXXX"

interface FloatingSparkleProps {
  delay: number
  left: string
  top: string
}

function FloatingSparkle({ delay, left, top }: FloatingSparkleProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!visible) return null

  return (
    <div
      className="absolute animate-sparkle text-amber-400/80"
      style={{ left, top }}
    >
      <Star size={14} fill="currentColor" />
    </div>
  )
}

interface ConfettiHeartProps {
  delay: number
  startX: number
}

function ConfettiHeart({ delay, startX }: ConfettiHeartProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!visible) return null

  const randomColor = Math.random() > 0.5 ? "text-primary" : "text-amber-400"
  const randomSize = Math.random() * 10 + 12

  return (
    <div
      className={cn("absolute animate-confetti-rise", randomColor)}
      style={{ left: startX, bottom: "40%" }}
    >
      <Heart size={randomSize} fill="currentColor" />
    </div>
  )
}

interface GiftCardScreenProps {
  onClose: () => void
}

export function GiftCardScreen({ onClose }: GiftCardScreenProps) {
  const [mounted, setMounted] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleReveal = () => {
    setIsRevealed(true)
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(GIFT_CARD_CODE)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch {
      // Clipboard API not available
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col px-6 py-6 bg-gradient-to-b from-rose-50 via-pink-50 to-background overflow-hidden">
      {/* Floating Sparkles */}
      <FloatingSparkle delay={0} left="10%" top="20%" />
      <FloatingSparkle delay={500} left="85%" top="25%" />
      <FloatingSparkle delay={1000} left="15%" top="60%" />
      <FloatingSparkle delay={1500} left="80%" top="55%" />

      {/* Confetti when revealed */}
      {isRevealed && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <ConfettiHeart
              key={i}
              delay={i * 80}
              startX={20 + Math.random() * 280}
            />
          ))}
        </div>
      )}

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

      {/* Title */}
      <div
        className={cn(
          "flex items-center justify-center gap-3 mb-8 transition-all duration-500 delay-100",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
      >
        <Star className="w-3.5 h-3.5 text-amber-400/80" fill="currentColor" />
        <h1 className="font-serif text-3xl text-foreground">A Little Something</h1>
        <Star className="w-3.5 h-3.5 text-amber-400/80" fill="currentColor" />
      </div>

      {/* Gift Card */}
      <div
        className={cn(
          "flex-1 flex flex-col items-center transition-all duration-700 delay-200",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="w-full max-w-sm">
          {/* Card Shadow */}
          <div className="relative">
            <div className="absolute top-2 left-2 right-[-4px] bottom-[-4px] bg-primary/15 rounded-3xl" />

            {/* Card */}
            <div className="relative bg-white rounded-3xl p-6 shadow-lg shadow-pink-200/30 overflow-hidden">
              {/* Shine effect */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-400/10 rotate-45 animate-pulse" />

              {/* Amount */}
              <div className="flex items-start mb-2">
                <span className="text-amber-500 text-xl font-bold mt-1">$</span>
                <span className="text-foreground text-5xl font-bold">50</span>
              </div>

              {/* Label */}
              <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase mb-8">
                Amazon
              </p>

              {/* Code Section */}
              <div className="flex flex-col items-center">
                {!isRevealed ? (
                  <button
                    onClick={handleReveal}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-pink-400 text-white font-semibold rounded-full shadow-lg shadow-pink-400/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Reveal Your Gift</span>
                  </button>
                ) : (
                  <div className="animate-zoom-in">
                    <div className="bg-pink-50 px-6 py-3 rounded-lg mb-3">
                      <p className="text-foreground font-bold tracking-widest text-lg">
                        {GIFT_CARD_CODE}
                      </p>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center justify-center gap-1.5 py-2 w-full text-primary font-semibold hover:opacity-80 transition-opacity"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span className="text-sm">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-sm">Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div
          className={cn(
            "flex flex-col items-center mt-10 transition-all duration-500 delay-500",
            mounted ? "opacity-100" : "opacity-0"
          )}
        >
          <p className="text-muted-foreground italic text-sm mb-2">
            for treats and smiles
          </p>
          <p className="font-serif text-2xl text-foreground">Love, Brady</p>
        </div>
      </div>
    </div>
  )
}
