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
  const { locale, t } = useLocale()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("popular")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const { data: filteredTours } = useToursGet()

  return (
    <div className="min-h-screen">
      <PageBanner
        title={t.get("nav.link3")}
        description="Discover amazing destinations and unforgettable experiences"
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
                placeholder={
                  "Search tours..."
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
                    All Tours
                  </SelectItem>
                  <SelectItem value="uzbekistan">{t.get("home.tour-uz")}</SelectItem>
                  <SelectItem value="international">{t.get("home.tour-ru")}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 max-md:w-full rounded-xl border border-border">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">
                    Most Popular
                  </SelectItem>
                  <SelectItem value="price-low">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-high">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="duration">
                    Duration
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
            {filteredTours?.data.map((tour, index) => (
              <TourCardCreative key={tour.id} tour={tour as ITour} index={index} />
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredTours?.data.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                No tours found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
