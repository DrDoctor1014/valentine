"use client"

import { useEffect, useState, useMemo } from "react"
import { Heart, Sparkles, Gift } from "lucide-react"
import { cn } from "../../lib/utils"

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
      className="absolute animate-twinkle text-amber-400/80 pointer-events-none"
      style={{ left, top, animationDelay: `${delay}ms` }}
    >
      <Sparkles size={14} />
    </div>
  )
}

interface GiftBoxProps {
  index: number
  isOpened: boolean
  onPress: () => void
  delay: number
  label: string
}

function GiftBox({ index, isOpened, onPress, delay, label }: GiftBoxProps) {
  const [visible, setVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!visible) return null

  const colors = [
    { bg: "from-rose-400 to-rose-500", ribbon: "bg-rose-200/50", glow: "bg-rose-400/40" },
    { bg: "from-pink-400 to-pink-500", ribbon: "bg-pink-200/50", glow: "bg-pink-400/40" },
    { bg: "from-red-400 to-rose-500", ribbon: "bg-red-200/50", glow: "bg-red-400/40" },
  ]

  const color = colors[index % 3]

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={isOpened ? undefined : onPress}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={isOpened}
        className={cn(
          "relative group transition-all duration-500",
          isOpened ? "opacity-50 cursor-default scale-90" : "cursor-pointer hover:scale-110 active:scale-95"
        )}
      >
        {/* Glow effect */}
        {!isOpened && (
          <div className={cn(
            "absolute inset-0 rounded-2xl blur-xl scale-125 transition-opacity duration-300",
            color.glow,
            isHovered ? "opacity-100 animate-pulse-glow" : "opacity-60"
          )} />
        )}

        {/* Gift box */}
        <div
          className={cn(
            "relative w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500",
            isOpened
              ? "bg-rose-100 shadow-none"
              : `bg-gradient-to-br ${color.bg} shadow-rose-400/30`
          )}
          style={{ 
            animation: isOpened ? 'none' : `float-gift 3s ease-in-out infinite`,
            animationDelay: `${index * 200}ms` 
          }}
        >
          {/* Sparkle on hover */}
          {!isOpened && isHovered && (
            <>
              <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-amber-400 animate-sparkle" />
              <Sparkles className="absolute -bottom-1 -left-1 w-4 h-4 text-amber-400 animate-sparkle" style={{ animationDelay: '0.3s' }} />
            </>
          )}

          <Gift
            className={cn(
              "w-10 h-10 md:w-12 md:h-12 transition-all duration-300",
              isOpened ? "text-rose-300" : "text-white drop-shadow-md"
            )}
            strokeWidth={1.5}
          />

          {/* Ribbon horizontal */}
          <div
            className={cn(
              "absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 transition-colors duration-300",
              isOpened ? "bg-rose-200/50" : color.ribbon
            )}
          />
          {/* Ribbon vertical */}
          <div
            className={cn(
              "absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 transition-colors duration-300",
              isOpened ? "bg-rose-200/50" : color.ribbon
            )}
          />

          {/* Bow */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center">
            <div className={cn(
              "w-4 h-4 rounded-full transition-colors duration-300 -mr-1",
              isOpened ? "bg-rose-200" : "bg-white/60"
            )} />
            <div className={cn(
              "w-3 h-3 rounded-full transition-colors duration-300",
              isOpened ? "bg-rose-200" : "bg-white/40"
            )} />
            <div className={cn(
              "w-4 h-4 rounded-full transition-colors duration-300 -ml-1",
              isOpened ? "bg-rose-200" : "bg-white/60"
            )} />
          </div>

          {/* Opened checkmark */}
          {isOpened && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="w-8 h-8 text-rose-400 animate-zoom-in" fill="currentColor" />
            </div>
          )}
        </div>
      </button>
      
      {/* Label */}
      <span className={cn(
        "text-xs font-medium tracking-wide transition-colors duration-300",
        isOpened ? "text-rose-300" : "text-rose-500/70"
      )}>
        {label}
      </span>
    </div>
  )
}

interface GiftSelectionScreenProps {
  openedGifts: number[]
  onOpenGift: (index: number) => void
}

export function GiftSelectionScreen({ openedGifts, onOpenGift }: GiftSelectionScreenProps) {
  const [mounted, setMounted] = useState(false)

  const shuffledPositions = useMemo(() => {
    const positions = [0, 1, 2]
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[positions[i], positions[j]] = [positions[j], positions[i]]
    }
    return positions
  }, [])

  const giftLabels = ["Gift One", "Gift Two", "Gift Three"]

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center px-6 py-12 bg-gradient-to-b from-rose-100 via-pink-50 to-rose-50 overflow-hidden">
      {/* Background gift boxes image */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img 
          src="/images/gift-boxes.jpg" 
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-200/60 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Sparkles */}
      <FloatingSparkle delay={0} left="12%" top="20%" />
      <FloatingSparkle delay={600} left="85%" top="18%" />
      <FloatingSparkle delay={1200} left="8%" top="60%" />
      <FloatingSparkle delay={1800} left="90%" top="55%" />
      <FloatingSparkle delay={400} left="50%" top="12%" />
      <FloatingSparkle delay={1000} left="25%" top="75%" />
      <FloatingSparkle delay={1400} left="75%" top="70%" />

      {/* Header */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center mb-6 transition-all duration-700",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-px bg-gradient-to-r from-transparent to-rose-300" />
          <Heart className="w-4 h-4 text-rose-400" fill="currentColor" />
          <div className="w-10 h-px bg-gradient-to-l from-transparent to-rose-300" />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl text-rose-900 mb-2">
          Happy Valentine&apos;s Day
        </h1>
        <p className="text-rose-500/60 text-sm tracking-[0.25em] font-medium">
          February 14, 2026
        </p>
      </div>

      {/* Gift Boxes */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <p
          className={cn(
            "text-rose-600/70 italic mb-12 text-lg font-serif tracking-wide transition-all duration-500 delay-300",
            mounted ? "opacity-100" : "opacity-0"
          )}
        >
          Tap a gift to unwrap your surprise...
        </p>

        <div className="flex items-start justify-center gap-6 md:gap-10">
          {shuffledPositions.map((originalIndex, displayIndex) => (
            <GiftBox
              key={originalIndex}
              index={originalIndex}
              isOpened={openedGifts.includes(originalIndex)}
              onPress={() => onOpenGift(originalIndex)}
              delay={500 + displayIndex * 200}
              label={giftLabels[displayIndex]}
            />
          ))}
        </div>
      </div>

      {/* Progress */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center transition-all duration-500 delay-700",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <div className="flex items-center gap-5 mb-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative">
              <div
                className={cn(
                  "w-3 h-3 rounded-full border-2 transition-all duration-500",
                  openedGifts.length > i 
                    ? "bg-rose-400 border-rose-400 scale-110" 
                    : "bg-transparent border-rose-300"
                )}
              />
              {openedGifts.length > i && (
                <div className="absolute inset-0 bg-rose-400/50 rounded-full blur-md scale-200 animate-pulse" />
              )}
            </div>
          ))}
        </div>
        <p className="text-rose-500/70 text-sm font-medium tracking-wide">
          {openedGifts.length === 0
            ? "Three surprises await you"
            : openedGifts.length === 3
            ? "All gifts unwrapped!"
            : `${3 - openedGifts.length} more ${3 - openedGifts.length === 1 ? 'gift' : 'gifts'} to open`}
        </p>
      </div>
    </div>
  )
}
