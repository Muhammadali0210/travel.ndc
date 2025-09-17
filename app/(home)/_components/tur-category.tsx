'use client'

import { SmallTourCard } from "@/components/small-tour-card"
import { Button } from "@/components/ui/button"
import { mockTours } from "@/lib/mock-data"
import { useLocale } from "@/hooks/use-locale"
import { useToursGet } from "@/services/tours.service"
import { ITour } from "@/types"

const TurCategory = () => {
    const { locale, t } = useLocale()
    const { data: uzbekistanTours } = useToursGet()
    const { data: internationalTours } = useToursGet()
    return (
        <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Uzbekistan Tours */}
                    <div>
                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-foreground mb-4">
                                {t.get("home.tour-uz")}
                            </h3>
                            <p className="text-muted-foreground">
                                Explore the heart of Central Asia
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mb-8">
                            {uzbekistanTours?.data.map((tour, index) => (
                                <SmallTourCard key={tour.id} tour={tour as ITour} index={index} />
                            ))}
                        </div>
                        <div className="text-center">
                            <Button variant="outline" size="lg" className="rounded-full bg-transparent">
                                {t.get("tours.all-tours")}
                            </Button>
                        </div>
                    </div>

                    {/* International Tours */}
                    <div>
                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-foreground mb-4">
                                {t.get("home.tour-ru")}
                            </h3>
                            <p className="text-muted-foreground">
                                Discover amazing destinations worldwide
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mb-8">
                            {internationalTours?.data.map((tour, index) => (
                                <SmallTourCard key={tour.id} tour={tour as ITour} index={index} />
                            ))}
                        </div>
                        <div className="text-center">
                            <Button variant="outline" size="lg" className="rounded-full bg-transparent">
                                {t.get("tours.all-tours")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TurCategory