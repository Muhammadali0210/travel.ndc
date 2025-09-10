"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Clock, DollarSign, MapPin, Star, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useLocale } from "@/hooks/use-locale"
import { mockTours } from "@/lib/mock-data"
import Sidebar from "../_components/sidebar"
import Overview from "../_components/overview"
import * as React from "react"



interface TourPageProps {
  params: Promise<{ slug: string }>
}

export default function TourPage({ params }: TourPageProps) {
  const { locale } = useLocale()
  const { slug } = React.use(params)
  const tour = mockTours.find((t) => t.slug === slug)

  if (!tour) {
    notFound()
  }

  const tourContent = {
    en: {
      overview: "Tour Overview",
      highlights: "Tour Highlights",
      itinerary: "Detailed Itinerary",
      included: "What's Included",
      excluded: "What's Not Included",
      bookNow: "Book Now",
      shareTrip: "Share Trip",
      addToWishlist: "Add to Wishlist",
      gallery: "Photo Gallery",
      description:
        tour.content ||
        "Experience the magic of this incredible destination with our expertly crafted tour. Discover hidden gems, immerse yourself in local culture, and create memories that will last a lifetime. Our professional guides will ensure you have an unforgettable journey filled with authentic experiences and breathtaking moments.",
      highlights_list: [
        "Professional local guide throughout the journey",
        "Visit iconic landmarks and hidden gems",
        "Authentic cultural experiences and interactions",
        "Comfortable accommodation and transportation",
        "Small group sizes for personalized attention",
        "All entrance fees and permits included",
      ],
      included_list: [
        "Professional tour guide",
        "All transportation during the tour",
        "Accommodation (hotels/guesthouses)",
        "All entrance fees to attractions",
        "Traditional meals as specified",
        "Airport transfers",
      ],
      excluded_list: [
        "International flights",
        "Travel insurance",
        "Personal expenses and souvenirs",
        "Tips for guides and drivers",
        "Optional activities not mentioned",
        "Visa fees (if applicable)",
      ],
    },
    uz: {
      overview: "Sayohat Haqida",
      highlights: "Sayohat Diqqatga Sazovor Joylari",
      itinerary: "Batafsil Dastur",
      included: "Nima Kiritilgan",
      excluded: "Nima Kiritilmagan",
      bookNow: "Hozir Band Qilish",
      shareTrip: "Sayohatni Ulashish",
      addToWishlist: "Sevimlilar Ro'yxatiga Qo'shish",
      gallery: "Foto Galereya",
      description:
        "Bizning professional tarzda tayyorlangan sayohatimiz bilan bu ajoyib joyning sehrini his eting. Yashirin marvaridlarni kashf eting, mahalliy madaniyatga sho'ng'ing va umr bo'yi esda qoladigan xotiralar yarating.",
      highlights_list: [
        "Butun sayohat davomida professional mahalliy gid",
        "Mashhur diqqatga sazovor joylar va yashirin marvaridlarni ziyorat",
        "Asl madaniy tajribalar va muloqot",
        "Qulay turar joy va transport",
        "Shaxsiy e'tibor uchun kichik guruh hajmi",
        "Barcha kirish to'lovlari va ruxsatnomalar kiritilgan",
      ],
      included_list: [
        "Professional sayohat gidi",
        "Sayohat davomidagi barcha transport",
        "Turar joy (mehmonxonalar/uy-joylar)",
        "Diqqatga sazovor joylarga barcha kirish to'lovlari",
        "Belgilangan an'anaviy taomlar",
        "Aeroport transferlari",
      ],
      excluded_list: [
        "Xalqaro parvozlar",
        "Sayohat sug'urtasi",
        "Shaxsiy xarajatlar va esdaliklar",
        "Gidlar va haydovchilar uchun bahshishlar",
        "Aytilmagan ixtiyoriy faoliyatlar",
        "Viza to'lovlari (agar kerak bo'lsa)",
      ],
    },
    ru: {
      overview: "Обзор Тура",
      highlights: "Основные Моменты",
      itinerary: "Подробная Программа",
      included: "Что Включено",
      excluded: "Что Не Включено",
      bookNow: "Забронировать",
      shareTrip: "Поделиться",
      addToWishlist: "В Избранное",
      gallery: "Фотогалерея",
      description:
        "Почувствуйте магию этого невероятного места с нашим профессионально разработанным туром. Откройте скрытые жемчужины, погрузитесь в местную культуру и создайте воспоминания на всю жизнь.",
      highlights_list: [
        "Профессиональный местный гид на протяжении всего путешествия",
        "Посещение знаковых достопримечательностей и скрытых жемчужин",
        "Аутентичные культурные впечатления и взаимодействие",
        "Комфортное размещение и транспорт",
        "Небольшие группы для персонального внимания",
        "Все входные билеты и разрешения включены",
      ],
      included_list: [
        "Профессиональный гид",
        "Весь транспорт во время тура",
        "Размещение (отели/гостевые дома)",
        "Все входные билеты в достопримечательности",
        "Традиционные блюда по программе",
        "Трансферы из/в аэропорт",
      ],
      excluded_list: [
        "Международные перелеты",
        "Туристическая страховка",
        "Личные расходы и сувениры",
        "Чаевые гидам и водителям",
        "Дополнительные активности не указанные в программе",
        "Визовые сборы (если применимо)",
      ],
    },
  }

  const content = tourContent[locale]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div className="container">
          <Image src={tour.image || "/placeholder.svg"} alt={tour.title} fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        <div className="absolute inset-0 flex items-end">
          <div className="container py-8 md:py-16">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {tour.isPopular && (
                  <Badge className="bg-secondary text-secondary-foreground">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Popular
                  </Badge>
                )}

                <h1 className="text-4xl md:text-6xl font-bold text-white text-balance">{tour.title}</h1>

                <p className="text-xl text-white/90 text-pretty max-w-2xl">{tour.description}</p>

                <div className="flex flex-wrap items-center gap-6 text-white/80">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5" />
                    <span className="text-2xl font-bold text-white">${tour.price}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>{tour.category === "uzbekistan" ? "Uzbekistan" : "International"}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-6">Samarkand, Bukhara & Khiva Classic</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tour.gallery.map((image, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="relative h-48 rounded-lg overflow-hidden cursor-pointer"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${tour.title} gallery ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <Overview />
            </div>

            {/* Sidebar */}
            <Sidebar />
          </div>
        </div>
      </section>
    </div>
  )
}
