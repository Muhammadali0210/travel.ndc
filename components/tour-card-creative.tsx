"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Clock, DollarSign, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/hooks/use-locale"
import { getImageUrl } from "@/lib/utils"
import { ITour } from "@/types"

interface TourCardCreativeProps {
  tour: ITour
  index?: number
}

export function TourCardCreative({ tour, index = 0 }: TourCardCreativeProps) {
  const { t } = useLocale();
  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={getImageUrl(tour?.images[0]?.md)}
          alt={tour?.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Popular Badge */}
        {tour?.status === "1" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="absolute top-4 right-4"
          >
            <Badge className="bg-secondary text-secondary-foreground font-semibold px-3 py-1">
              <Star className="w-3 h-3 mr-1 fill-current" />
              {t.get("home.popular")}
            </Badge>
          </motion.div>
        )}

        {/* Price Tag */}
        <div className="absolute top-4 left-4">
          <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-2 rounded-full text-sm font-bold">
            {tour.price}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl line-clamp-1 font-bold text-card-foreground group-hover:text-primary transition-colors">
            {tour.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-1" dangerouslySetInnerHTML={{ __html: tour.desc || "" }} />
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span className="font-semibold">{tour?.date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-semibold">
              {tour?.price}
            </span>
          </div>
        </div>

        <Link href={`/tur/${tour?.slug}`}>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold transition-all duration-300 hover:scale-105">
            {t.get("home.learnMore")}
          </Button>
        </Link>
      </div>

      {/* Glassmorphism Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  )
}
