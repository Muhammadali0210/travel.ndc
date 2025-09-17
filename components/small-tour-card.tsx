"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Clock, DollarSign } from "lucide-react"
import { ITour } from "@/types"
import { getImageUrl } from "@/lib/utils"

interface SmallTourCardProps {
  tour: ITour
  index?: number
}

export function SmallTourCard({ tour, index = 0 }: SmallTourCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl bg-card shadow-md hover:shadow-xl transition-all duration-300"
    >
      <Link href={`/tur/${tour?.slug}`} className="flex gap-4">
        <div className="relative h-32 w-32 min-w-32 max-md:h-26 max-md:w-26 max-md:min-w-26 overflow-hidden">
          <Image
            src={getImageUrl(tour?.images[0]?.sm)}
            alt={tour.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Price */}
          <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded-lg text-xs font-bold">
            {tour.price}
          </div>
        </div>

        <div className="p-4 max-md:pl-0 space-y-2 flex flex-col justify-between">
          <h4 className="font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
            {tour?.title}
          </h4>

          <div className="w-full flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span className="font-medium">{tour?.date}</span>
            </div>
            <div className="flex items-center"> 
              <span className="font-medium">{tour?.price}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
