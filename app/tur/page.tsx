"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageBanner } from "@/components/page-banner"
import { TourCardCreative } from "@/components/tour-card-creative"
import { useLocale } from "@/hooks/use-locale"
import { useToursGet } from "@/services/tours.service"
import { ITour } from "@/types"

export default function ToursPage() {
  const { t } = useLocale()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string | null>("all")
  const [sortBy, setSortBy] = useState<string | null>("all")
  const [title, setTitle] = useState("")

  const { data: filteredTours } = useToursGet({
    params: {
      title: title,
      price_sort: sortBy === "all" ? null : sortBy,
      info: categoryFilter === "all" ? null : categoryFilter
    },
    options: {
      keepPreviousData: true,
      retry: false
    }
  })


  const searchHandler = (text: string) => {
    setSearchTerm(text)
    let timeout = setTimeout(() => {
      setTitle(text)
    }, 500)
    return () => clearTimeout(timeout)
  }

  return (
    <div className="min-h-screen">
      <PageBanner
        title={t.get("tours.title")}
        description={t.get("tours.desc")}
        backgroundImage="/images/nature.jpg"
        height="50vh"
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
                placeholder={t.get("tours.search-text")}
                value={searchTerm}
                onChange={(e) => searchHandler(e.target.value)}
                className="pl-10 rounded-xl border border-border"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-4 max-md:mt-4">
              <Select value={categoryFilter as string} onValueChange={(e) => setCategoryFilter(e === "all" ? null : e)}>
                <SelectTrigger className="w-48 max-md:w-full rounded-xl border border-border">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.get("tours.all-tours")}</SelectItem>
                  <SelectItem value="1">{t.get("home.tour-uz")}</SelectItem>
                  <SelectItem value="0">{t.get("home.tour-ru")}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy as string} onValueChange={(e) => setSortBy(e === "all" ? null : e)}>
                <SelectTrigger className="w-48 max-md:w-full rounded-xl border border-border">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.get("tours.all-tours")}</SelectItem>
                  <SelectItem value="asc">{t.get("tours.price-low-to")}</SelectItem>
                  <SelectItem value="desc">{t.get("tours.price-high-to")}</SelectItem>
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
            {filteredTours?.data.map((tour, index) => (
              <TourCardCreative key={tour.id} tour={tour as ITour} index={index} />
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredTours?.data.length === 0 || !filteredTours && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {t.get("tours.tour-not-found")}
              </h3>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
