import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Suspense } from "react"
import "./globals.css"
import Providers from "@/components/providers/provider"

export const metadata: Metadata = {
  title: "TravelUz - Discover Amazing Adventures",
  description: "Explore Uzbekistan and the world with our expertly crafted tours and unforgettable experiences",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <ScrollToTop />
          </Suspense>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
