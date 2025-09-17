'use client'
import { mockTours } from '@/lib/mock-data'
import { motion } from "framer-motion"
import { useLocale } from "@/hooks/use-locale"
import { TourCardCreative } from '@/components/tour-card-creative'
import { useToursGet } from '@/services/tours.service'
import { ITour } from '@/types'


const PopularTur = () => {
    const { locale, t } = useLocale()
    const { data: popularTours } = useToursGet()
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
              {t.get("home.top")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our most loved destinations and experiences, carefully curated for unforgettable adventures.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularTours?.data.map((tour, index) => (
              <TourCardCreative key={tour.id} tour={tour as ITour} index={index} />
            ))}
          </div>
        </div>
      </section>
  )
}

export default PopularTur