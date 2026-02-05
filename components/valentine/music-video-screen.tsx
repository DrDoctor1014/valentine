"use client"

import { useEffect, useState, useRef } from "react"
import { Heart, Music, X, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { cn } from "../../lib/utils"

// Replace with your actual romantic music video URL
const VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

interface FloatingNoteProps {
  delay: number
  left: string
}

function FloatingNote({ delay, left }: FloatingNoteProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!visible) return null

  return (
    <div
      className="absolute bottom-0 animate-float-up text-rose-300/40 pointer-events-none"
      style={{ left, animationDuration: '8s', animationDelay: `${delay}ms` }}
    >
      <Music size={20} />
    </div>
  )
}

interface MusicVideoScreenProps {
  onClose: () => void
}

export function MusicVideoScreen({ onClose }: MusicVideoScreenProps) {
  const [mounted, setMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handlePlayPause = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleMuteToggle = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    onClose()
  }

  return (
    <div className="relative min-h-screen flex flex-col px-6 py-6 bg-gradient-to-b from-[#1a1520] via-[#2a1f2d] to-[#1a1520] overflow-hidden">
      {/* Ambient romantic glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Floating music notes */}
      {[...Array(6)].map((_, i) => (
        <FloatingNote key={i} delay={i * 1500} left={`${15 + i * 14}%`} />
      ))}

      {/* Close Button */}
      <div
        className={cn(
          "relative z-20 flex justify-end mb-4 transition-all duration-300",
          mounted ? "opacity-100" : "opacity-0"
        )}
      >
        <button
          onClick={handleClose}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 hover:scale-105 active:scale-95 transition-all"
        >
          <X className="w-5 h-5 text-rose-200" />
        </button>
      </div>

      {/* Title */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center mb-6 transition-all duration-500 delay-100",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
      >
        <div className="flex items-center gap-3 mb-2">
          <Music className="w-5 h-5 text-rose-400" />
          <h1 className="font-serif text-2xl md:text-3xl text-rose-100">A Song For You</h1>
          <Music className="w-5 h-5 text-rose-400" />
        </div>
        <p className="text-rose-300/60 text-sm italic">Press play and feel the love</p>
      </div>

      {/* Video Player */}
      <div
        className={cn(
          "relative z-10 flex-1 flex flex-col items-center justify-center transition-all duration-700 delay-200",
          mounted ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="w-full max-w-2xl">
          {/* Video Frame with glow */}
          <div className="relative">
            <div className="absolute -inset-2 bg-rose-500/20 rounded-3xl blur-xl" />
            <div className="relative p-1 rounded-2xl bg-gradient-to-br from-rose-400/30 to-pink-500/30">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black/50">
                <video
                  ref={videoRef}
                  src={VIDEO_URL}
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-contain"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Play Overlay */}
                {!isPlaying && (
                  <button
                    onClick={handlePlayPause}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors group"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-rose-500/40 rounded-full blur-xl scale-150 animate-pulse-glow" />
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-2xl shadow-rose-500/50 group-hover:scale-110 transition-transform">
                        <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePlayPause}
              className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center hover:bg-rose-500/30 transition-all"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-rose-200" />
              ) : (
                <Play className="w-5 h-5 text-rose-200 ml-0.5" fill="currentColor" />
              )}
            </button>

            <button
              onClick={handleMuteToggle}
              className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center hover:bg-rose-500/30 transition-all"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-rose-200" />
              ) : (
                <Volume2 className="w-5 h-5 text-rose-200" />
              )}
            </button>
          </div>
        </div>

        {/* Signature */}
        <div
          className={cn(
            "flex flex-col items-center mt-10 transition-all duration-500 delay-400",
            mounted ? "opacity-100" : "opacity-0"
          )}
        >
          <p className="text-rose-300/50 italic text-sm mb-2">
            This song reminds me of you
          </p>
          <p className="font-serif text-2xl text-rose-300 mb-2">Love, Brady</p>
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
          "relative z-10 flex justify-center mt-6 transition-all duration-500 delay-600",
          mounted ? "opacity-100" : "opacity-0"
        )}
      >
        <button
          onClick={handleClose}
          className="flex items-center gap-2 px-6 py-3 bg-rose-500/20 border border-rose-400/30 text-rose-200 font-medium rounded-full hover:bg-rose-500/30 hover:scale-105 active:scale-95 transition-all"
        >
          <span>Continue</span>
          <Heart className="w-4 h-4" fill="currentColor" />
        </button>
      </div>
    </div>
  )
}
