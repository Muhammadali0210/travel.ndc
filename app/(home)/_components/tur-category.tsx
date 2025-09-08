'use client'

import { SmallTourCard } from "@/components/small-tour-card"
import { Button } from "@/components/ui/button"
import { getTranslation } from "@/lib/i18n"
import { mockTours } from "@/lib/mock-data"
import { motion } from "framer-motion"
import { useLocale } from "@/hooks/use-locale"

const TurCategory = () => {
    const { locale } = useLocale()
    const uzbekistanTours = mockTours.filter((tour) => tour.category === "uzbekistan").slice(0, 4)
    const internationalTours = mockTours.filter((tour) => tour.category === "international").slice(0, 4)
    return (
        <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Uzbekistan Tours */}
                    <div>
                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-foreground mb-4">
                                {getTranslation(locale, "tours.uzbekistan")}
                            </h3>
                            <p className="text-muted-foreground">
                                {locale === "en" && "Explore the heart of Central Asia"}
                                {locale === "uz" && "Markaziy Osiyoning qalbini kashf eting"}
                                {locale === "ru" && "Исследуйте сердце Центральной Азии"}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mb-8">
                            {uzbekistanTours.map((tour, index) => (
                                <SmallTourCard key={tour.id} tour={tour} index={index} />
                            ))}
                        </div>
                        <div className="text-center">
                            <Button variant="outline" size="lg" className="rounded-full bg-transparent">
                                {getTranslation(locale, "tours.viewAll")}
                            </Button>
                        </div>
                    </div>

                    {/* International Tours */}
                    <div>
                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-foreground mb-4">
                                {getTranslation(locale, "tours.international")}
                            </h3>
                            <p className="text-muted-foreground">
                                {locale === "en" && "Discover amazing destinations worldwide"}
                                {locale === "uz" && "Butun dunyo bo'ylab ajoyib joylarni kashf eting"}
                                {locale === "ru" && "Откройте удивительные места по всему миру"}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mb-8">
                            {internationalTours.map((tour, index) => (
                                <SmallTourCard key={tour.id} tour={tour} index={index} />
                            ))}
                        </div>
                        <div className="text-center">
                            <Button variant="outline" size="lg" className="rounded-full bg-transparent">
                                {getTranslation(locale, "tours.viewAll")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TurCategory