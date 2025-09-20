"use client"

import { motion } from "framer-motion"
import { useLocale } from "@/hooks/use-locale"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getImageUrl } from "@/lib/utils"
import { useNewsByIdGet } from "@/services/news.service"
import React from "react"
interface NewsPageProps {
  params: Promise<{ slug: string }>
}

export default function NewsDetailPage({ params }: NewsPageProps) {
  const { t } = useLocale()
  const { slug } = React.use(params)
  const { data: news } = useNewsByIdGet(slug)

  return (
    <div className="min-h-screen">
      <div className="relative h-[50vh] overflow-hidden">
        <Image src={getImageUrl(news?.images[0]?.lg || "")} alt="Image" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">{news?.title}</h1>
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(news?.date || "").toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Link href="/news">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-lg max-w-none"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{news?.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: news?.desc || "" }}></p>
          </motion.article>


          {/* Related Articles */}
          {/* {relatedNews?.data.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-16"
            >
              <h3 className="text-2xl font-bold mb-8">{t.news.relatedArticles}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedNews?.data.map((item) => (
                  <Link key={item.id} href={`/news/${item.slug}`}>
                    <div className="group cursor-pointer">
                      <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                        <Image
                          src={getImageUrl(item?.images[0]?.lg || "")}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <Badge variant="secondary" className="mb-2">
                        {item?.category}
                      </Badge>
                      <h4 className="font-semibold group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-2">{new Date(item.date).toLocaleDateString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )} */}
        </div>
      </div>
    </div>
  )
}
