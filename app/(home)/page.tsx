"use client"

import { HeroVideoSlider } from "@/components/hero-video-slider"
import { useLocale } from "@/hooks/use-locale"
import { mockTours } from "@/lib/mock-data"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import LastNews from "./_components/last-news"
import WhyChooseUs from "./_components/why-choose-us"
import TurCategory from "./_components/tur-category"
import PopularTur from "./_components/popular-tur"

export default function HomePage() {
  const { locale } = useLocale()

  const popularTours = mockTours.filter((tour) => tour.isPopular).slice(0, 6)
  const uzbekistanTours = mockTours.filter((tour) => tour.category === "uzbekistan").slice(0, 4)
  const internationalTours = mockTours.filter((tour) => tour.category === "international").slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroVideoSlider />

      {/* Popular Tours Section */}
      <PopularTur />

      {/* Uzbekistan vs International Tours */}
      <TurCategory />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Latest News Section */}
      <LastNews />
    </div>
  )
}
