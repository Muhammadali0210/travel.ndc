'use client'
import { NewsCard } from "@/components/news-card"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/hooks/use-locale"
import { getTranslation } from "@/lib/i18n"
import { mockNews } from "@/lib/mock-data"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"

const LastNews = () => {
    const { locale } = useLocale()
    const latestNews = mockNews.slice(0, 4)
    return (
        <section className="py-20 px-4 bg-gradient-to-br from-secondary/5 to-primary/5">
            <div className="container">
                <div
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        {getTranslation(locale, "news.title")}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {locale === "en" && "Stay updated with the latest travel news and destination insights."}
                        {locale === "uz" && "Eng so'nggi sayohat yangiliklari va yo'nalishlar haqida ma'lumotlarda bo'ling."}
                        {locale === "ru" && "Будьте в курсе последних новостей путешествий и информации о направлениях."}
                    </p>
                </div>

                <div className="relative">
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        navigation={{
                            prevEl: ".news-prev",
                            nextEl: ".news-next",
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        className="pb-12"
                    >
                        {latestNews.map((news, index) => (
                            <SwiperSlide key={news.id}>
                                <NewsCard news={news} index={index} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center space-x-4 mt-8">
                        <Button variant="outline" size="icon" className="news-prev rounded-full bg-transparent">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="news-next rounded-full bg-transparent">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LastNews