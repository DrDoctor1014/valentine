"use client"

import { useEffect, useState, useMemo } from "react"
import { Heart, Star, Gift } from "lucide-react"
import { cn } from "@/lib/utils"

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
      <Star size={12} fill="currentColor" />
    </div>
  )
}

interface GiftBoxProps {
  index: number
  isOpened: boolean
  onPress: () => void
  delay: number
}

function GiftBox({ index, isOpened, onPress, delay }: GiftBoxProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!visible) return null

  return (
    <button
      onClick={isOpened ? undefined : onPress}
      disabled={isOpened}
      className={cn(
        "relative group transition-all duration-300",
        isOpened ? "opacity-40 cursor-default" : "cursor-pointer hover:scale-105 active:scale-95"
      )}
    >
      {/* Glow effect */}
      {!isOpened && (
        <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-xl animate-pulse-glow scale-110" />
      )}

      {/* Gift box */}
      <div
        className={cn(
          "relative w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300",
          isOpened
            ? "bg-pink-100 shadow-none"
            : "bg-gradient-to-br from-pink-400 to-rose-500 shadow-pink-400/40 animate-float-gift"
        )}
        style={{ animationDelay: `${index * 200}ms` }}
      >
        <Gift
          className={cn(
            "w-12 h-12 md:w-14 md:h-14 transition-colors duration-300",
            isOpened ? "text-pink-300" : "text-white"
          )}
          strokeWidth={1.5}
        />

        {/* Ribbon */}
        <div
          className={cn(
            "absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 transition-colors duration-300",
            isOpened ? "bg-pink-200" : "bg-white/30"
          )}
        />
        <div
          className={cn(
            "absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 transition-colors duration-300",
            isOpened ? "bg-pink-200" : "bg-white/30"
          )}
        />

        {/* Bow */}
        <div
          className={cn(
            "absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full transition-colors duration-300",
            isOpened ? "bg-pink-200" : "bg-white/40"
          )}
        />
      </div>
    </button>
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

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center px-6 py-12 bg-gradient-to-b from-rose-50 via-pink-50/80 to-background">
      {/* Floating Sparkles */}
      <FloatingSparkle delay={0} left="15%" top="20%" />
      <FloatingSparkle delay={500} left="82%" top="18%" />
      <FloatingSparkle delay={1000} left="10%" top="55%" />
      <FloatingSparkle delay={1500} left="88%" top="50%" />
      <FloatingSparkle delay={750} left="50%" top="15%" />

      {/* Header */}
      <div
        className={cn(
          "flex flex-col items-center mb-8 transition-all duration-700",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-px bg-primary/40" />
          <Heart className="w-3.5 h-3.5 text-primary" fill="currentColor" />
          <div className="w-8 h-px bg-primary/40" />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-1">
          Valentine&apos;s Day
        </h1>
        <p className="text-muted-foreground text-sm tracking-[0.3em]">2026</p>
      </div>

      {/* Gift Boxes */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <p
          className={cn(
            "text-muted-foreground italic mb-10 tracking-wide transition-all duration-500 delay-300",
            mounted ? "opacity-100" : "opacity-0"
          )}
        >
          choose a gift to unwrap
        </p>

        <div className="flex items-center justify-center gap-6 md:gap-8">
          {shuffledPositions.map((originalIndex, displayIndex) => (
            <GiftBox
              key={originalIndex}
              index={originalIndex}
              isOpened={openedGifts.includes(originalIndex)}
              onPress={() => onOpenGift(originalIndex)}
              delay={500 + displayIndex * 200}
            />
          ))}
        </div>
      </div>

      {/* Progress */}
      <div
        className={cn(
          "flex flex-col items-center transition-all duration-500 delay-700",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <div className="flex items-center gap-4 mb-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative">
              <div
                className={cn(
                  "w-2.5 h-2.5 rounded-full border-2 border-primary transition-all duration-300",
                  openedGifts.length > i ? "bg-primary" : "bg-transparent"
                )}
              />
              {openedGifts.length > i && (
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-sm scale-150" />
              )}
            </div>
          ))}
        </div>
        <p className="text-muted-foreground text-sm tracking-wide">
          {openedGifts.length === 0
            ? "three surprises await"
            : openedGifts.length === 3
            ? "all gifts opened"
            : `${3 - openedGifts.length} more to go`}
        </p>
      </div>
    </div>
  )
}
