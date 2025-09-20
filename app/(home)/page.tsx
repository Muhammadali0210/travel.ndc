import { HeroVideoSlider } from "@/components/hero-video-slider"
import "swiper/css"
import "swiper/css/navigation"
import LastNews from "./_components/last-news"
import WhyChooseUs from "./_components/why-choose-us"
import TurCategory from "./_components/tur-category"
import PopularTur from "./_components/popular-tur"

export default function HomePage() {
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
