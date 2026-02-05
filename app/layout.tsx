import type { Metadata, Viewport } from "next"
import { Lora, Lato } from "next/font/google"
import "./globals.css"

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Valentine's Day | For Sara",
  description: "A special Valentine's surprise awaits you",
}

export const viewport: Viewport = {
  themeColor: "#FFF0F3",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${lato.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
