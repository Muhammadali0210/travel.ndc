"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useLocale } from "@/hooks/use-locale"
import { NewsCard } from "@/components/news-card"
import { PageBanner } from "@/components/page-banner"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useNewsGet } from "@/services/news.service"
import { INews } from "@/types"
import useTranslationStore from "@/store/lang.store"

export default function NewsPage() {
  const { t, locale } = useLocale();
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const { lang } = useTranslationStore()

  const { data: filteredNews } = useNewsGet({ params: { lang } })

  return (
    <div className="min-h-screen">
      <PageBanner
        title={t.get("news.title")}
        description={t.get("news.desc")}
        backgroundImage="/images/nature2.webp"
        height="50vh"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="relative w-full mb-12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder={t.get("faq.inputText")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 text-lg rounded-2xl"
          />
        </div>

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
            <h3 className="text-2xl font-semibold text-muted-foreground mb-4">{t.get("news.no-result")}</h3>
          </motion.div>
        )}
      </div>
    </div>
  )
}
