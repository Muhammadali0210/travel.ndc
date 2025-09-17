"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/hooks/use-locale"
import { getTranslation } from "@/lib/i18n"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-fade"
import { useBannerGet } from "@/services/banner.service"

const heroVideos = [
  {
    src: "/uzbekistan-samarkand-registan-square-timelapse.jpg",
    title: "Discover Uzbekistan",
    subtitle: "Ancient Silk Road Cities",
  },
  {
    src: "/cappadocia-hot-air-balloons-sunrise-landscape.jpg",
    title: "International Adventures",
    subtitle: "Explore the World",
  },
  {
    src: "/desert-caravan-sunset-uzbekistan-adventure.jpg",
    title: "Desert Expeditions",
    subtitle: "Unforgettable Journeys",
  },
]

export function HeroVideoSlider() {
  const { locale } = useLocale()
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    // Ensure videos are muted and autoplay
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = true
        video.play().catch(() => {
          // Fallback if autoplay fails
        })
      }
    })
  }, [])

  const {data, isLoading, error} = useBannerGet()

  console.log("Banners: ", data)

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full w-full"
      >
        {heroVideos.map((video, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Video Background */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${video.src})` }}
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
              <div className="absolute inset-0 bg-black/30" />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="space-y-6"
                  >
                    <h1
                      className="text-5xl md:text-7xl font-bold text-balance text-white drop-shadow-2xl"
                      style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                    >
                      {getTranslation(locale, "hero.title")}
                    </h1>
                    <p
                      className="text-xl md:text-2xl text-white drop-shadow-xl text-pretty max-w-2xl mx-auto"
                      style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                    >
                      {getTranslation(locale, "hero.subtitle")}
                    </p>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 1 }}
                    >
                      <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
                      >
                        {getTranslation(locale, "hero.cta")}
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center drop-shadow-lg"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-3 bg-white rounded-full mt-2 drop-shadow-sm"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
