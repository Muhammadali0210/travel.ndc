"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageBanner } from "@/components/page-banner"
import { TourCardCreative } from "@/components/tour-card-creative"
import { useLocale } from "@/hooks/use-locale"
import { getTranslation } from "@/lib/i18n"
import { mockTours } from "@/lib/mock-data"

export default function ToursPage() {
  const { locale } = useLocale()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("popular")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredTours = mockTours
    .filter((tour) => {
      const matchesSearch =
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || tour.category === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "duration":
          return Number.parseInt(a.duration) - Number.parseInt(b.duration)
        case "popular":
        default:
          return b.isPopular ? 1 : -1
      }
    })

  return (
    <div className="min-h-screen">
      <PageBanner
        title={getTranslation(locale, "nav.tours")}
        description={
          locale === "en"
            ? "Discover amazing destinations and unforgettable experiences"
            : locale === "uz"
              ? "Ajoyib joylar va unutilmas tajribalarni kashf eting"
              : "Откройте удивительные места и незабываемые впечатления"
        }
        backgroundImage="/uzbekistan-landscape-mountains-desert-panorama.jpg"
      />

      <section className="py-16 max-md:py-8 px-4">
        <div className="container">
          {/* Filters and Search */}
          <div
            className="mb-12 flex max-md:flex-col justify-between w-full"
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder={
                  locale === "en" ? "Search tours..." : locale === "uz" ? "Sayohatlarni qidirish..." : "Поиск туров..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl border border-border"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-4 max-md:mt-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48 max-md:w-full rounded-xl border border-border">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {locale === "en" ? "All Tours" : locale === "uz" ? "Barcha Sayohatlar" : "Все Туры"}
                  </SelectItem>
                  <SelectItem value="uzbekistan">{getTranslation(locale, "tours.uzbekistan")}</SelectItem>
                  <SelectItem value="international">{getTranslation(locale, "tours.international")}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 max-md:w-full rounded-xl border border-border">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">
                    {locale === "en" ? "Most Popular" : locale === "uz" ? "Eng Mashhur" : "Самые Популярные"}
                  </SelectItem>
                  <SelectItem value="price-low">
                    {locale === "en"
                      ? "Price: Low to High"
                      : locale === "uz"
                        ? "Narx: Pastdan Yuqoriga"
                        : "Цена: По возрастанию"}
                  </SelectItem>
                  <SelectItem value="price-high">
                    {locale === "en"
                      ? "Price: High to Low"
                      : locale === "uz"
                        ? "Narx: Yuqoridan Pastga"
                        : "Цена: По убыванию"}
                  </SelectItem>
                  <SelectItem value="duration">
                    {locale === "en" ? "Duration" : locale === "uz" ? "Davomiyligi" : "Продолжительность"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tours Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredTours.map((tour, index) => (
              <TourCardCreative key={tour.id} tour={tour} index={index} />
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredTours.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {locale === "en" ? "No tours found" : locale === "uz" ? "Sayohatlar topilmadi" : "Туры не найдены"}
              </h3>
              <p className="text-muted-foreground">
                {locale === "en"
                  ? "Try adjusting your search criteria"
                  : locale === "uz"
                    ? "Qidiruv mezonlarini o'zgartirib ko'ring"
                    : "Попробуйте изменить критерии поиска"}
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
