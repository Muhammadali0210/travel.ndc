"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/hooks/use-locale"
import { useBannerGet } from "@/services/banner.service"
import { IBanner } from "@/types"
import { getImageFromApi, getImageUrl } from "@/lib/utils"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-fade"

// Fallback data in case API fails
const fallbackBanners: IBanner[] = [
  {
    id: 1,
    title: "Discover Uzbekistan",
    desc: "Ancient Silk Road Cities",
    url: "",
    video: null,
    images: {
      lg: "/uzbekistan-samarkand-registan-square-timelapse.jpg",
      md: "/uzbekistan-samarkand-registan-square-timelapse.jpg",
      sm: "/uzbekistan-samarkand-registan-square-timelapse.jpg"
    }
  },
  {
    id: 2,
    title: "International Adventures",
    desc: "Explore the World",
    url: "",
    video: null,
    images: {
      lg: "/cappadocia-hot-air-balloons-sunrise-landscape.jpg",
      md: "/cappadocia-hot-air-balloons-sunrise-landscape.jpg",
      sm: "/cappadocia-hot-air-balloons-sunrise-landscape.jpg"
    }
  },
  {
    id: 3,
    title: "Desert Expeditions",
    desc: "Unforgettable Journeys",
    url: "",
    video: null,
    images: {
      lg: "/desert-caravan-sunset-uzbekistan-adventure.jpg",
      md: "/desert-caravan-sunset-uzbekistan-adventure.jpg",
      sm: "/desert-caravan-sunset-uzbekistan-adventure.jpg"
    }
  }
]

export function HeroVideoSlider() {
  const { locale, t } = useLocale()
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const { data, isLoading, error } = useBannerGet()

  // Use banner data or fallback to default banners
  const banners = data?.data && data.data.length > 0 ? data.data : fallbackBanners

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
  }, [banners])

  // Helper function to get image source based on screen size
  const getImageSrc = (banner: IBanner) => {
    // First try to get from images object
    const imageFromApi = getImageFromApi(banner.images, null)
    if (imageFromApi) return imageFromApi
    
    // If no images, check if video field contains an image filename
    if (banner.video && !banner.video.endsWith('.mp4')) {
      return getImageUrl(banner.video, "/placeholder.jpg")
    }
    
    return "/placeholder.jpg"
  }

  // Helper function to parse URL if it's a JSON string
  const parseUrl = (url: string) => {
    try {
      const parsed = JSON.parse(url)
      return parsed[locale] || parsed.en || parsed.ru || ""
    } catch {
      return url
    }
  }

  if (isLoading) {
    return (
      <div className="relative h-screen w-full overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading banners...</div>
      </div>
    )
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={banners.length > 1}
        className="h-full w-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id}>
            <div className="relative h-full w-full">
              {/* Video or Image Background */}
              {banner.video && banner.video.endsWith('.mp4') ? (
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                >
                  <source src={getImageUrl(banner.video)} type="video/mp4" />
                </video>
              ) : (
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${getImageSrc(banner)})` }}
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/40" />
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
                      {banner.title || t.get("home.top")}
                    </h1>
                    <p
                      className="text-xl md:text-2xl text-white drop-shadow-xl text-pretty max-w-2xl mx-auto"
                      style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                      dangerouslySetInnerHTML={{ 
                        __html: banner.desc || t.get("home.top-text") 
                      }}
                    />
                    {banner.url && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                      >
                        <Button
                          size="lg"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
                          onClick={() => {
                            const url = parseUrl(banner.url)
                            if (url) {
                              window.location.href = url
                            }
                          }}
                        >
                          {t.get("tours.buy")}
                        </Button>
                      </motion.div>
                    )}
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
