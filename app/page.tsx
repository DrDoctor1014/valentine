"use client"

import { useState } from "react"
import { WelcomeScreen } from "@/components/valentine/welcome-screen"
import { GiftSelectionScreen } from "@/components/valentine/gift-selection-screen"
import { LoveNoteScreen } from "@/components/valentine/love-note-screen"
import { GiftCardScreen } from "@/components/valentine/gift-card-screen"
import { MusicVideoScreen } from "@/components/valentine/music-video-screen"
import { FinalBouquetScreen } from "@/components/valentine/final-bouquet-screen"

type Screen = "welcome" | "giftSelection" | "loveNote" | "giftCard" | "musicVideo" | "finalBouquet"

export default function ValentinePage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome")
  const [openedGifts, setOpenedGifts] = useState<number[]>([])
  const [revealIndex, setRevealIndex] = useState(0)

  const REVEAL_ORDER: Screen[] = ["loveNote", "giftCard", "musicVideo"]

  const handleStartGifts = () => {
    setCurrentScreen("giftSelection")
  }

  const handleOpenGift = (boxIndex: number) => {
    if (openedGifts.includes(boxIndex)) return

    setOpenedGifts((prev) => [...prev, boxIndex])
    const screen = REVEAL_ORDER[revealIndex]
    setRevealIndex((prev) => prev + 1)
    setCurrentScreen(screen)
  }

  const handleCloseGift = () => {
    if (openedGifts.length === 3) {
      setCurrentScreen("finalBouquet")
    } else {
      setCurrentScreen("giftSelection")
    }
  }

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {currentScreen === "welcome" && <WelcomeScreen onContinue={handleStartGifts} />}
      {currentScreen === "giftSelection" && (
        <GiftSelectionScreen openedGifts={openedGifts} onOpenGift={handleOpenGift} />
      )}
      {currentScreen === "loveNote" && <LoveNoteScreen onClose={handleCloseGift} />}
      {currentScreen === "giftCard" && <GiftCardScreen onClose={handleCloseGift} />}
      {currentScreen === "musicVideo" && <MusicVideoScreen onClose={handleCloseGift} />}
      {currentScreen === "finalBouquet" && <FinalBouquetScreen />}
    </main>
  )
}
