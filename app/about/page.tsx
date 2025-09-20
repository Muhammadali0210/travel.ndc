"use client"

import { motion } from "framer-motion"
import { useLocale } from "@/hooks/use-locale"
import { PageBanner } from "@/components/page-banner"
import { FeatureCard } from "@/components/feature-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Globe, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import WhyChooseUs from "../(home)/_components/why-choose-us"
import useTranslationStore from "@/store/lang.store"

export default function AboutPage() {
  const { t } = useLocale()
  const { siteinfo} = useTranslationStore()

  const stats = [
    { number: t.get("about.number1"), label: t.get("about.label1") },
    { number: t.get("about.number2"), label: t.get("about.label2") },
    { number: t.get("about.number3"), label: t.get("about.label3") },
    { number: t.get("about.number4"), label: t.get("about.label4") },
  ]

  return (
    <div className="min-h-screen">
      <PageBanner
        title="About Us"
        description=""
        backgroundImage="/bukhara-old-city-architecture.jpg"
        height="50vh"
      />

      <div className="container mx-auto px-4 py-16">
        {/* Our Story */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                {t.get("about.small-title")}
              </Badge>
              <h2 className="text-3xl font-bold mb-6 text-balance">{ siteinfo?.title }</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: siteinfo?.desc || ""}}></div>
              <Link href="/contact">
                <Button className="mt-6">{t.get("nav.link6")}</Button>
              </Link>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image src="/samarkand-registan-square.jpg" alt="Our story" fill className="object-cover" />
            </div>
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Our Values */}
        <WhyChooseUs />

        {/* <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Our Team
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-balance">Meet the Team Behind Our Success</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Meet the Team Behind Our Success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="text-center group"
              >
                <div className="relative h-64 w-64 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.section> */}
      </div>
    </div>
  )
}
