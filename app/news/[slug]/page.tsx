"use client"

import { motion } from "framer-motion"
import { useLocale } from "@/hooks/use-locale"
import { newsData } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

interface NewsDetailPageProps {
  params: {
    slug: string
  }
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { t } = useLocale()
  const news = newsData.find((item) => item.slug === params.slug)

  if (!news) {
    notFound()
  }

  const relatedNews = newsData.filter((item) => item.id !== news.id && item.category === news.category).slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Image */}
      <div className="relative h-[70vh] overflow-hidden">
        <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
              <Badge variant="secondary" className="mb-4">
                {news.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">{news.title}</h1>
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(news.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {news.readTime} {t.news.minRead}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Link href="/news">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                {t.common.back}
              </Button>
            </Link>
          </motion.div>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">{news.excerpt}</p>

            <div className="space-y-6 text-foreground">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>

              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>

              <blockquote className="border-l-4 border-primary pl-6 italic text-lg my-8">
                "Travel is the only thing you buy that makes you richer. Every journey opens new horizons and creates
                memories that last a lifetime."
              </blockquote>

              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                explicabo.
              </p>

              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                dolores eos qui ratione voluptatem sequi nesciunt.
              </p>
            </div>
          </motion.article>

          {/* Share Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 pt-8 border-t"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                {t.news.shareArticle}
              </h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Button>
                <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Button>
                <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Related Articles */}
          {relatedNews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-16"
            >
              <h3 className="text-2xl font-bold mb-8">{t.news.relatedArticles}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedNews.map((item) => (
                  <Link key={item.id} href={`/news/${item.slug}`}>
                    <div className="group cursor-pointer">
                      <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <Badge variant="secondary" className="mb-2">
                        {item.category}
                      </Badge>
                      <h4 className="font-semibold group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-2">{new Date(item.date).toLocaleDateString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
