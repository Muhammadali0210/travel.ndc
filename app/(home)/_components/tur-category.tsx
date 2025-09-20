'use client'

import { SmallTourCard } from "@/components/small-tour-card"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/hooks/use-locale"
import { useToursGet } from "@/services/tours.service"
import { ITour } from "@/types"
import Link from "next/link"

const TurCategory = () => {
    const { locale, t } = useLocale()
    const { data: uzbekistanTours } = useToursGet({ params: { country: 'uzbekistan' } })
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
                                {t.get("home.tour-uz-desc")}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mb-8">
                            {uzbekistanTours?.data.map((tour, index) => (
                                <SmallTourCard key={tour.id} tour={tour as ITour} index={index} />
                            ))}
                        </div>
                        <div className="text-center">
                            <Link href={"/tur"}>
                                <Button variant="outline" size="lg" className="rounded-full bg-transparent">
                                    {t.get("tours.all-tours")}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* International Tours */}
                    <div>
                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-foreground mb-4">
                                {t.get("home.tour-ru")}
                            </h3>
                            <p className="text-muted-foreground">
                                {t.get("home.tour-ru-desc")}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 mb-8">
                            {internationalTours?.data.map((tour, index) => (
                                <SmallTourCard key={tour.id} tour={tour as ITour} index={index} />
                            ))}
                        </div>
                        <div className="text-center">
                            <Link href={"/tur"}>
                                <Button variant="outline" size="lg" className="rounded-full bg-transparent">
                                    {t.get("tours.all-tours")}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TurCategory