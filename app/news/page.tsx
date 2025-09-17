"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useLocale } from "@/hooks/use-locale"
import { NewsCard } from "@/components/news-card"
import { PageBanner } from "@/components/page-banner"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, Tag } from "lucide-react"
import { useTranslation } from "react-i18next";
import { useNewsGet } from "@/services/news.service"
import { INews } from "@/types"

export default function NewsPage() {
  const { t, locale } = useLocale();
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const { data: filteredNews } = useNewsGet()

  return (
    <div className="min-h-screen">
      <PageBanner
        title="Latest News"
        description="Discover amazing destinations and unforgettable experiences"
        backgroundImage="/images/nature2.webp"
        height="50vh"
      />

      <div className="container mx-auto px-4 py-16">
        {/* Filters */}
        <div
          className="mb-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border"
        >
          <div className="grid grid-cols-1 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews?.data.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NewsCard news={news as INews} />
            </motion.div>
          ))}
        </div>

        {filteredNews?.data.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <h3 className="text-2xl font-semibold text-muted-foreground mb-4">No results</h3>
            <p className="text-muted-foreground">Try different search</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
