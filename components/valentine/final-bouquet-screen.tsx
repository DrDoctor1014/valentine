"use client"

import { useEffect, useState } from "react"
import { Heart, Star, Download, Share2, Flower2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface RisingHeartProps {
  delay: number
  left: string
  size: number
}

function RisingHeart({ delay, left, size }: RisingHeartProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!visible) return null

  return (
    <div
      className="absolute bottom-[15%] animate-rise text-primary/60"
      style={{ left }}
    >
      <Heart size={size} fill="currentColor" />
    </div>
  )
}

interface SparkleProps {
  delay: number
  left: string
  top: string
}

function Sparkle({ delay, left, top }: SparkleProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!visible) return null

  return (
    <div
      className="absolute animate-sparkle-rotate text-amber-400/80"
      style={{ left, top }}
    >
      <Star size={12} fill="currentColor" />
    </div>
  )
}

export function FinalBouquetScreen() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSave = () => {
    // In a real app, this would trigger a download
    alert("Save functionality would download the bouquet image")
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Valentine's Day",
          text: "A special Valentine's gift for you!",
          url: window.location.href,
        })
      } catch {
        // Share cancelled or failed
      }
    } else {
      alert("Share functionality is not available in this browser")
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-rose-50 via-pink-50/80 to-background overflow-hidden">
      {/* Rising Hearts Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <RisingHeart delay={0} left="15%" size={14} />
        <RisingHeart delay={800} left="35%" size={12} />
        <RisingHeart delay={1600} left="55%" size={16} />
        <RisingHeart delay={2400} left="75%" size={10} />
        <RisingHeart delay={400} left="25%" size={18} />
        <RisingHeart delay={1200} left="65%" size={14} />
        <RisingHeart delay={2000} left="85%" size={12} />
      </div>

      {/* Sparkles */}
      <Sparkle delay={0} left="10%" top="18%" />
      <Sparkle delay={500} left="85%" top="22%" />
      <Sparkle delay={1000} left="20%" top="55%" />
      <Sparkle delay={1500} left="80%" top="50%" />

      <div className="flex-1 flex flex-col items-center justify-between px-6 py-12">
        {/* Bouquet with Glow */}
        <div
          className={cn(
            "flex-1 flex items-center justify-center max-h-[48vh] transition-all duration-1000 delay-200",
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )}
        >
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse-glow scale-125" />

            {/* Bouquet Icon */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              <div className="relative">
                {/* Flower arrangement */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Flower2 className="w-16 h-16 text-pink-400 -rotate-12" />
                  <Flower2 className="w-20 h-20 text-rose-400" />
                  <Flower2 className="w-16 h-16 text-pink-300 rotate-12" />
                </div>
                <div className="flex justify-center -mt-4">
                  <Flower2 className="w-14 h-14 text-pink-500 -rotate-6" />
                  <Flower2 className="w-18 h-18 text-rose-300 rotate-6" />
                </div>
                {/* Stem */}
                <div className="flex justify-center mt-2">
                  <div className="w-8 h-24 bg-gradient-to-b from-green-400 to-green-600 rounded-full" />
                </div>
                {/* Ribbon */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-6 bg-primary rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div
          className={cn(
            "flex flex-col items-center mb-8 transition-all duration-700 delay-600",
            mounted ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-px bg-primary/40" />
            <Heart className="w-3 h-3 text-primary" fill="currentColor" />
            <div className="w-9 h-px bg-primary/40" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-2 text-center">
            For you, Sara
          </h1>
          <p className="text-muted-foreground text-sm tracking-[0.15em]">
            February 14, 2026
          </p>
        </div>

        {/* Buttons */}
        <div
          className={cn(
            "flex items-center gap-4 mb-8 transition-all duration-700 delay-800",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-pink-400 text-white font-semibold rounded-full shadow-lg shadow-pink-400/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Save</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary text-primary font-semibold rounded-full hover:bg-pink-50 hover:scale-105 active:scale-95 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        {/* Signature */}
        <div
          className={cn(
            "flex flex-col items-center transition-all duration-700 delay-1000",
            mounted ? "opacity-100" : "opacity-0"
          )}
        >
          <p className="font-serif text-lg text-foreground mb-1">with love, Brady</p>
          <div className="flex items-center gap-1">
            <Heart className="w-2 h-2 text-primary" fill="currentColor" />
            <Heart className="w-3 h-3 text-primary" fill="currentColor" />
            <Heart className="w-2 h-2 text-primary" fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  )
}
