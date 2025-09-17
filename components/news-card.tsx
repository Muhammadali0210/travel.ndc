"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/hooks/use-locale"
import { getImageUrl } from "@/lib/utils"
import { INews } from "@/types"

interface NewsCardProps {
  news: INews
  index?: number
}

export function NewsCard({ news, index = 0 }: NewsCardProps) {
  const { locale, t } = useLocale()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale === "uz" ? "uz-UZ" : locale === "ru" ? "ru-RU" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div
      className="group bg-card rounded-xl transition-all duration-300 overflow-hidden border"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={getImageUrl(news?.images[0]?.md || "")}
          alt={news.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(news?.date)}</span>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
            {news?.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2" dangerouslySetInnerHTML={{ __html: news?.desc || "" }}></p>
        </div>

        <Link href={`/news/${news?.slug}`}>
          <Button
            variant="outline"
            className="w-full cursor-pointer rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent"
          >
            Read more
          </Button>
        </Link>
      </div>
    </div>
  )
}
