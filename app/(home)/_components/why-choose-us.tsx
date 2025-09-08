'use client'
import { FeatureCard } from '@/components/feature-card'
import { getTranslation } from '@/lib/i18n'
import { Award, Headphones, Shield, Users } from 'lucide-react'
import { useLocale } from "@/hooks/use-locale"

const WhyChooseUs = () => {
    const { locale } = useLocale()
    const features = [
        {
            icon: Users,
            title: getTranslation(locale, "features.experience.title"),
            description: getTranslation(locale, "features.experience.description"),
        },
        {
            icon: Shield,
            title: getTranslation(locale, "features.safety.title"),
            description: getTranslation(locale, "features.safety.description"),
        },
        {
            icon: Headphones,
            title: getTranslation(locale, "features.support.title"),
            description: getTranslation(locale, "features.support.description"),
        },
        {
            icon: Award,
            title: locale === "en" ? "Best Experience" : locale === "uz" ? "Eng Yaxshi Tajriba" : "Лучший Опыт",
            description:
                locale === "en"
                    ? "Award-winning tours and experiences"
                    : locale === "uz"
                        ? "Mukofotga sazovor bo'lgan sayohatlar va tajribalar"
                        : "Отмеченные наградами туры и впечатления",
        },
    ]
    return (
        <section className="py-20 px-4 bg-background">
            <div className="container">
                <div
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        {getTranslation(locale, "features.title")}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {locale === "en" &&
                            "We provide exceptional travel experiences with professional service and attention to detail."}
                        {locale === "uz" &&
                            "Biz professional xizmat va tafsilotlarga e'tibor bilan ajoyib sayohat tajribalarini taqdim etamiz."}
                        {locale === "ru" &&
                            "Мы предоставляем исключительные впечатления от путешествий с профессиональным сервисом и вниманием к деталям."}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features?.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs