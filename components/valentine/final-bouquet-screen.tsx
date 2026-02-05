"use client"

import { useEffect, useState } from "react"
import { Heart, Sparkles, Share2 } from "lucide-react"
import { cn } from "../../lib/utils"

interface RisingHeartProps {
  delay: number
  left: string
  size: number
}

function RisingHeart({ delay, left, size }: RisingHeartProps) {
  return (
    <div
      className="absolute bottom-0 animate-float-up text-rose-300/60 pointer-events-none"
      style={{ 
        left, 
        animationDelay: `${delay}ms`,
        animationDuration: `${6 + Math.random() * 3}s`
      }}
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
      className="absolute animate-twinkle text-amber-400/80 pointer-events-none"
      style={{ left, top, animationDelay: `${delay}ms` }}
    >
      <Sparkles size={14} />
    </div>
  )
}

// Beautiful rose bouquet SVG component
function RoseBouquet() {
  return (
    <svg viewBox="0 0 200 240" className="w-full h-full">
      {/* Stems */}
      <g fill="none" stroke="#4ade80" strokeWidth="3">
        <path d="M100 240 Q95 180 85 140" />
        <path d="M100 240 Q105 180 115 140" />
        <path d="M100 240 Q90 190 70 150" />
        <path d="M100 240 Q110 190 130 150" />
        <path d="M100 240 Q100 200 100 140" />
      </g>
      
      {/* Leaves */}
      <g fill="#22c55e">
        <ellipse cx="75" cy="180" rx="15" ry="8" transform="rotate(-30 75 180)" />
        <ellipse cx="125" cy="175" rx="15" ry="8" transform="rotate(30 125 175)" />
        <ellipse cx="85" cy="200" rx="12" ry="6" transform="rotate(-20 85 200)" />
        <ellipse cx="115" cy="195" rx="12" ry="6" transform="rotate(20 115 195)" />
      </g>
      
      {/* Roses - layered petals for 3D effect */}
      {/* Center rose */}
      <g transform="translate(100, 100)">
        <circle cx="0" cy="0" r="28" fill="#f43f5e" />
        <circle cx="0" cy="-8" r="20" fill="#fb7185" />
        <circle cx="5" cy="-12" r="14" fill="#fda4af" />
        <circle cx="-3" cy="-10" r="10" fill="#fecdd3" />
        <ellipse cx="0" cy="0" rx="6" ry="8" fill="#fecdd3" transform="rotate(15)" />
      </g>
      
      {/* Left rose */}
      <g transform="translate(60, 115)">
        <circle cx="0" cy="0" r="24" fill="#ec4899" />
        <circle cx="0" cy="-6" r="17" fill="#f472b6" />
        <circle cx="3" cy="-9" r="12" fill="#f9a8d4" />
        <circle cx="-2" cy="-7" r="8" fill="#fbcfe8" />
      </g>
      
      {/* Right rose */}
      <g transform="translate(140, 115)">
        <circle cx="0" cy="0" r="24" fill="#f43f5e" />
        <circle cx="0" cy="-6" r="17" fill="#fb7185" />
        <circle cx="3" cy="-9" r="12" fill="#fda4af" />
        <circle cx="-2" cy="-7" r="8" fill="#fecdd3" />
      </g>
      
      {/* Top left small rose */}
      <g transform="translate(75, 75)">
        <circle cx="0" cy="0" r="18" fill="#ec4899" />
        <circle cx="0" cy="-4" r="13" fill="#f472b6" />
        <circle cx="2" cy="-6" r="9" fill="#f9a8d4" />
      </g>
      
      {/* Top right small rose */}
      <g transform="translate(125, 75)">
        <circle cx="0" cy="0" r="18" fill="#f43f5e" />
        <circle cx="0" cy="-4" r="13" fill="#fb7185" />
        <circle cx="2" cy="-6" r="9" fill="#fda4af" />
      </g>
      
      {/* Baby's breath accent dots */}
      <g fill="white">
        <circle cx="50" cy="90" r="3" opacity="0.8" />
        <circle cx="55" cy="100" r="2" opacity="0.6" />
        <circle cx="45" cy="95" r="2.5" opacity="0.7" />
        <circle cx="150" cy="90" r="3" opacity="0.8" />
        <circle cx="145" cy="100" r="2" opacity="0.6" />
        <circle cx="155" cy="95" r="2.5" opacity="0.7" />
        <circle cx="100" cy="55" r="2.5" opacity="0.7" />
        <circle cx="95" cy="60" r="2" opacity="0.6" />
        <circle cx="105" cy="58" r="2" opacity="0.6" />
      </g>
      
      {/* Ribbon/Wrap */}
      <path d="M70 220 Q100 235 130 220 Q130 230 100 240 Q70 230 70 220" fill="#f472b6" />
      <path d="M85 225 Q100 232 115 225" fill="none" stroke="#ec4899" strokeWidth="2" />
    </svg>
  )
}

export function FinalBouquetScreen() {
  const [mounted, setMounted] = useState(false)
  const [hearts, setHearts] = useState<Array<{ id: number; left: string; size: number; delay: number }>>([])

  useEffect(() => {
    setMounted(true)
    
    // Generate continuous rising hearts
    const initialHearts = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      size: Math.random() * 12 + 10,
      delay: i * 500,
    }))
    setHearts(initialHearts)

    const interval = setInterval(() => {
      setHearts(prev => {
        const newHeart = {
          id: Date.now(),
          left: `${10 + Math.random() * 80}%`,
          size: Math.random() * 12 + 10,
          delay: 0,
        }
        return [...prev.slice(-12), newHeart]
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Happy Valentine's Day!",
          text: "A special Valentine's gift made with love",
          url: window.location.href,
        })
      } catch {
        // Share cancelled
      }
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-rose-100 via-pink-50 to-rose-100 overflow-hidden">
      {/* Rising Hearts */}
      {hearts.map((heart) => (
        <RisingHeart
          key={heart.id}
          delay={heart.delay}
          left={heart.left}
          size={heart.size}
        />
      ))}

      {/* Sparkles */}
      <Sparkle delay={0} left="8%" top="15%" />
      <Sparkle delay={500} left="88%" top="18%" />
      <Sparkle delay={1000} left="15%" top="45%" />
      <Sparkle delay={1500} left="82%" top="50%" />
      <Sparkle delay={750} left="50%" top="8%" />
      <Sparkle delay={1250} left="25%" top="70%" />
      <Sparkle delay={1750} left="75%" top="75%" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-300/30 rounded-full blur-3xl pointer-events-none" />

      <div className="flex-1 flex flex-col items-center justify-between px-6 py-10">
        {/* Bouquet */}
        <div
          className={cn(
            "flex-1 flex items-center justify-center max-h-[60vh] w-full max-w-md transition-all duration-1000 delay-200",
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Glow behind bouquet */}
            <div className="absolute inset-0 bg-rose-400/30 rounded-full blur-3xl scale-110 animate-pulse-glow" />
            <div className="relative animate-float-gentle w-full h-full max-h-[500px]">
              <img 
                src="/images/rose-bouquet.jpg"
                alt="Beautiful rose bouquet"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
              {/* Sparkles on the bouquet */}
              <Sparkles className="absolute top-[15%] left-[20%] w-6 h-6 text-amber-300 animate-sparkle" />
              <Sparkles className="absolute top-[25%] right-[25%] w-5 h-5 text-amber-300 animate-sparkle" style={{ animationDelay: '0.5s' }} />
              <Sparkles className="absolute bottom-[40%] left-[15%] w-4 h-4 text-rose-300 animate-sparkle" style={{ animationDelay: '0.8s' }} />
            </div>
          </div>
        </div>

        {/* Message */}
        <div
          className={cn(
            "flex flex-col items-center mb-8 transition-all duration-700 delay-600",
            mounted ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-rose-300" />
            <Heart className="w-4 h-4 text-rose-400" fill="currentColor" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-rose-300" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-rose-900 mb-3 text-center">
            Happy Valentine&apos;s Day
          </h1>
          <p className="font-serif text-2xl md:text-3xl text-rose-600 mb-2 text-center">
            Sara
          </p>
          <p className="text-rose-400/70 text-sm tracking-[0.2em]">
            February 14, 2026
          </p>
        </div>

        {/* Share button */}
        <div
          className={cn(
            "flex flex-col items-center gap-4 mb-6 transition-all duration-700 delay-800",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border border-rose-200 text-rose-600 font-medium rounded-full shadow-lg shadow-rose-200/30 hover:bg-white hover:scale-105 active:scale-95 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Share the Love</span>
          </button>
        </div>

        {/* Final signature */}
        <div
          className={cn(
            "flex flex-col items-center transition-all duration-700 delay-1000",
            mounted ? "opacity-100" : "opacity-0"
          )}
        >
          <p className="text-rose-500/60 italic text-sm mb-2">
            Made with all my love
          </p>
          <p className="font-serif text-xl text-rose-700 mb-2">Forever Yours, Brady</p>
          <div className="flex items-center gap-1">
            <Heart className="w-2.5 h-2.5 text-rose-400 animate-pulse" fill="currentColor" />
            <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse" fill="currentColor" style={{ animationDelay: '0.2s' }} />
            <Heart className="w-4.5 h-4.5 text-rose-500 animate-pulse" fill="currentColor" style={{ animationDelay: '0.3s' }} />
            <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse" fill="currentColor" style={{ animationDelay: '0.4s' }} />
            <Heart className="w-2.5 h-2.5 text-rose-400 animate-pulse" fill="currentColor" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
