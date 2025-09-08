"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useLocale } from "@/hooks/use-locale"
import { newsData } from "@/lib/mock-data"
import { NewsCard } from "@/components/news-card"
import { PageBanner } from "@/components/page-banner"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, Tag } from "lucide-react"
import { useTranslation } from "react-i18next";

export default function NewsPage() {
  // const { t } = useLocale()
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const filteredNews = newsData
    .filter((news) => {
      const matchesSearch =
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || news.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      }
    })

  const categories = ["all", ...Array.from(new Set(newsData.map((news) => news.category)))]

  return (
    <div className="min-h-screen">
      <PageBanner
        title={t("news.title")}
        subtitle={t("news.subtitle")}
        backgroundImage="/uzbekistan-landscape-mountains-desert-panorama.jpg"
        // eslint-disable-next-line @next/next/no-img-element
        //  @ts-ignore
        height="60vh"
      />

      <div className="container mx-auto px-4 py-16">
        {/* Filters */}
        <div
          className="mb-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t("news.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="border border-border">
                <Tag className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t("news.categoryPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? t("news.allCategories") : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border border-border">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t("news.sortPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t("news.newest")}</SelectItem>
                <SelectItem value="oldest">{t("news.oldest")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NewsCard news={news} />
            </motion.div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <h3 className="text-2xl font-semibold text-muted-foreground mb-4">{t("news.noResults")}</h3>
            <p className="text-muted-foreground">{t("news.tryDifferentSearch")}</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
