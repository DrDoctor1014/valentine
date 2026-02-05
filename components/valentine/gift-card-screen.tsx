"use client"

import { useEffect, useState } from "react"
import { Heart, Sparkles, X, Eye, Copy, Check, ShoppingBag } from "lucide-react"
import { cn } from "../../lib/utils"

const GIFT_CARD_CODE = "XXXX-XXXXXX-XXXX"

interface ConfettiPieceProps {
  delay: number
  startX: number
  color: string
}

function ConfettiPiece({ delay, startX, color }: ConfettiPieceProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!visible) return null

  const isHeart = Math.random() > 0.5

  return (
    <div
      className={cn("absolute animate-confetti-burst", color)}
      style={{ 
        left: `${startX}%`, 
        top: "50%",
        animationDelay: `${delay}ms`
      }}
    >
      {isHeart ? (
        <Heart size={Math.random() * 10 + 8} fill="currentColor" />
      ) : (
        <Sparkles size={Math.random() * 8 + 6} />
      )}
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
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleReveal = () => {
    setIsRevealed(true)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
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

  const confettiColors = [
    "text-rose-400",
    "text-pink-400", 
    "text-amber-400",
    "text-rose-300",
    "text-pink-300"
  ]

  return (
    <div className="relative min-h-screen flex flex-col px-6 py-6 bg-gradient-to-b from-rose-100 via-pink-50 to-rose-50 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Confetti burst */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
          {Array.from({ length: 30 }).map((_, i) => (
            <ConfettiPiece
              key={i}
              delay={i * 50}
              startX={35 + Math.random() * 30}
              color={confettiColors[i % confettiColors.length]}
            />
          ))}
        </div>
      )}

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
          "relative z-10 flex flex-col items-center mb-8 transition-all duration-500 delay-100",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
      >
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h1 className="font-serif text-2xl md:text-3xl text-rose-900">A Little Treat</h1>
          <Sparkles className="w-5 h-5 text-amber-500" />
        </div>
        <p className="text-rose-500/60 text-sm italic">Because you deserve to be spoiled</p>
      </div>

      {/* Gift Card */}
      <div
        className={cn(
          "relative z-10 flex-1 flex flex-col items-center justify-center transition-all duration-700 delay-200",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="w-full max-w-sm">
          {/* Card with 3D effect */}
          <div className="relative perspective-1000">
            {/* Card Shadow */}
            <div className="absolute top-3 left-3 right-[-6px] bottom-[-6px] bg-rose-300/30 rounded-3xl blur-sm" />

            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-white via-white to-rose-50 rounded-3xl p-8 shadow-xl shadow-rose-200/40 overflow-hidden border border-rose-100">
              {/* Shine effect */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-amber-400/10 to-transparent rotate-45 animate-shimmer" />
              
              {/* Store logo area */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-rose-800 font-bold text-lg">Amazon</p>
                  <p className="text-rose-400/60 text-xs tracking-wide">Gift Card</p>
                </div>
              </div>

              {/* Amount */}
              <div className="flex items-baseline mb-2">
                <span className="text-amber-500 text-2xl font-bold mr-1">$</span>
                <span className="text-rose-800 text-6xl font-bold tracking-tight">50</span>
              </div>

              <p className="text-rose-400/70 text-sm mb-8 italic">
                For anything your heart desires
              </p>

              {/* Code Section */}
              <div className="flex flex-col items-center">
                {!isRevealed ? (
                  <button
                    onClick={handleReveal}
                    className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold rounded-full shadow-lg shadow-rose-400/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Eye className="relative w-5 h-5" />
                    <span className="relative text-lg">Reveal Gift Code</span>
                  </button>
                ) : (
                  <div className="animate-zoom-in w-full">
                    <div className="bg-gradient-to-r from-rose-50 to-pink-50 px-6 py-4 rounded-xl mb-4 border border-rose-200">
                      <p className="text-rose-800 font-bold tracking-[0.2em] text-xl text-center font-mono">
                        {GIFT_CARD_CODE}
                      </p>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className={cn(
                        "flex items-center justify-center gap-2 py-3 w-full rounded-full font-medium transition-all",
                        isCopied 
                          ? "bg-green-100 text-green-600" 
                          : "bg-rose-100 text-rose-600 hover:bg-rose-200"
                      )}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Code</span>
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
          <p className="text-rose-500/60 italic text-sm mb-2">
            Treat yourself, my love
          </p>
          <p className="font-serif text-2xl text-rose-700 mb-2">Love, Brady</p>
          <div className="flex items-center gap-1.5">
            <Heart className="w-3 h-3 text-rose-400" fill="currentColor" />
            <Heart className="w-4 h-4 text-rose-500" fill="currentColor" />
            <Heart className="w-3 h-3 text-rose-400" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Continue button */}
      <div
        className={cn(
          "relative z-10 flex justify-center mt-6 transition-all duration-500",
          isRevealed ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-rose-300 text-rose-600 font-medium rounded-full hover:bg-rose-50 hover:scale-105 active:scale-95 transition-all"
        >
          <span>Continue</span>
          <Heart className="w-4 h-4" fill="currentColor" />
        </button>
      </div>
    </div>
  )
}
