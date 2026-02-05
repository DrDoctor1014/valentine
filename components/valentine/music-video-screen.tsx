"use client"

import { useEffect, useState, useRef } from "react"
import { Heart, Music, Headphones, X, Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

const VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

interface FloatingNoteProps {
  delay: number
  left: string
  top: string
  icon: "music" | "headphones"
}

function FloatingNote({ delay, left, top, icon }: FloatingNoteProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!visible) return null

  const Icon = icon === "music" ? Music : Headphones

  return (
    <div
      className="absolute animate-float-note text-primary/40"
      style={{ left, top }}
    >
      <Icon size={16} />
    </div>
  )
}

interface MusicVideoScreenProps {
  onClose: () => void
}

export function MusicVideoScreen({ onClose }: MusicVideoScreenProps) {
  const [mounted, setMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handlePlay = () => {
    if (!videoRef.current) return

    if (!hasStarted) {
      videoRef.current.muted = false
      setHasStarted(true)
    }

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    onClose()
  }

  return (
    <div className="relative min-h-screen flex flex-col px-6 py-6 bg-gradient-to-b from-[#2D2327] via-[#3D2830] to-[#4A3133]">
      {/* Floating music notes */}
      <FloatingNote delay={0} left="8%" top="18%" icon="music" />
      <FloatingNote delay={600} left="88%" top="22%" icon="headphones" />
      <FloatingNote delay={1200} left="10%" top="70%" icon="music" />
      <FloatingNote delay={900} left="85%" top="65%" icon="music" />

      {/* Close Button */}
      <div
        className={cn(
          "flex justify-end mb-4 transition-all duration-300",
          mounted ? "opacity-100" : "opacity-0"
        )}
      >
        <button
          onClick={handleClose}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 hover:scale-105 active:scale-95 transition-all"
        >
          <X className="w-5 h-5 text-white/80" />
        </button>
      </div>

      {/* Title */}
      <div
        className={cn(
          "flex items-center justify-center gap-3 mb-8 transition-all duration-500 delay-100",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
      >
        <Music className="w-4 h-4 text-primary" />
        <h1 className="font-serif text-3xl text-white">A Song for You</h1>
        <Music className="w-4 h-4 text-primary" />
      </div>

      {/* Video Player */}
      <div
        className={cn(
          "flex-1 flex flex-col items-center justify-center transition-all duration-700 delay-200",
          mounted ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="w-full max-w-lg">
          {/* Video Frame */}
          <div className="p-1 rounded-2xl bg-white/10">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
              <video
                ref={videoRef}
                src={VIDEO_URL}
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
              />

              {/* Play Overlay */}
              {!isPlaying && (
                <button
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 rounded-full blur-lg animate-pulse-glow scale-150" />
                    <div className="relative w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
                      <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Controls */}
          {hasStarted && (
            <div className="flex justify-center mt-6 animate-fade-in">
              <button
                onClick={handlePlay}
                className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white/90" />
                ) : (
                  <Play className="w-5 h-5 text-white/90 ml-0.5" fill="currentColor" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Signature */}
        <div
          className={cn(
            "flex flex-col items-center mt-10 transition-all duration-500 delay-400",
            mounted ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <Heart className="w-2.5 h-2.5 text-primary" fill="currentColor" />
            <Heart className="w-3.5 h-3.5 text-primary" fill="currentColor" />
            <Heart className="w-2.5 h-2.5 text-primary" fill="currentColor" />
          </div>
          <p className="font-serif text-2xl text-primary">Love, Brady</p>
        </div>
      </div>
    </div>
  )
}
