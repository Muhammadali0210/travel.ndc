"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Clock, DollarSign, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/hooks/use-locale"
import Sidebar from "../_components/sidebar"
import Overview from "../_components/overview"
import { getImageUrl } from "@/lib/utils"
import * as React from "react"
import { useToursByIdGet } from "@/services/tours.service"
import { ITour } from "@/types"
import TurImageSlider from "../_components/tur-image-slider"



interface TourPageProps {
  params: Promise<{ slug: string }>
}

export default function TourPage({ params }: TourPageProps) {
  const { t } = useLocale()
  const { slug } = React.use(params)
  const [ activeImage, setActiveImage ] = React.useState<number>(0);


  const { data: tour, isLoading } = useToursByIdGet(slug)


  return (
    <div className="min-h-screen" style={{ opacity: isLoading ? 0.5 : 1 }}>
      <div className="relative h-[70vh] overflow-hidden">
        <div className="container">
            <Image src={getImageUrl(tour?.data?.images[activeImage]?.lg)} alt="Image" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/30" />

        <div className="absolute inset-0 flex items-end">
          <div className="container py-8 md:py-16">
            <div className="max-w-[80%]">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {tour?.data?.status === "1" && (
                  <Badge className="bg-secondary text-secondary-foreground">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {t.get("home.top")?.split(" ")[0]}
                  </Badge>
                )}

                <h1 className="text-4xl md:text-6xl font-bold text-white text-balance">{tour?.data?.title}</h1>

                <div className="flex flex-wrap items-center gap-6 text-white/80">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>{tour?.data?.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-white">{tour?.data?.price}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-6">{tour?.data?.title}</h2>

                <TurImageSlider images={tour?.data?.images || []} setActiveImage={(e) => setActiveImage(e)} />
              </motion.div>
              <Overview tour={tour?.data as ITour} />
            </div>

            <Sidebar tour={tour?.data as ITour} />
          </div>
        </div>
      </section>
    </div>
  )
}
