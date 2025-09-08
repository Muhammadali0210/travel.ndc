'use client'
import { getTranslation } from '@/lib/i18n'
import { mockTours } from '@/lib/mock-data'
import { motion } from "framer-motion"
import { useLocale } from "@/hooks/use-locale"
import { TourCardCreative } from '@/components/tour-card-creative'

const PopularTur = () => {
    const { locale } = useLocale()
    const popularTours = mockTours.filter((tour) => tour.isPopular).slice(0, 6)
  return (
    <section className="py-20 px-4 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {getTranslation(locale, "tours.popular")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {locale === "en" &&
                "Discover our most loved destinations and experiences, carefully curated for unforgettable adventures."}
              {locale === "uz" &&
                "Unutilmas sarguzashtlar uchun ehtiyotkorlik bilan tanlangan eng sevimli yo'nalishlar va tajribalarni kashf eting."}
              {locale === "ru" &&
                "Откройте наши самые любимые направления и впечатления, тщательно отобранные для незабываемых приключений."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularTours.map((tour, index) => (
              <TourCardCreative key={tour.id} tour={tour} index={index} />
            ))}
          </div>
        </div>
      </section>
  )
}

export default PopularTur