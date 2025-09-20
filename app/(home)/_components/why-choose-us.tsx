'use client'
import { FeatureCard } from '@/components/feature-card'
import { Award, Headphones, Shield, Users } from 'lucide-react'
import { useLocale } from "@/hooks/use-locale"

const WhyChooseUs = () => {
    const { locale, t } = useLocale()
    const features = [
        {
            icon: Users,
            title: t.get("home.our-1"),
        },
        {
            icon: Shield,
            title: t.get("home.our-2"),
        },
        {
            icon: Headphones,
            title: t.get("home.our-3"),
        }
    ]
    return (
        <section className="py-20 px-4 bg-background">
            <div className="container">
                <div
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        {t.get("home.our")}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {t.get("home.our-text")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
                    {features?.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs