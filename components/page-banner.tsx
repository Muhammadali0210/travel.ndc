"use client"

import { motion } from "framer-motion"

interface PageBannerProps {
  title: string
  description?: string
  backgroundImage?: string
  height?: "40vh" | "100vh"
}

export function PageBanner({
  title,
  description,
  backgroundImage = "/serene-mountain-lake.png",
  height = "40vh",
}: PageBannerProps) {
  return (
    <div className="relative flex items-center justify-center overflow-hidden" style={{ height }}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-4 text-balance"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 text-pretty"
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  )
}
