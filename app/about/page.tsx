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

export default function AboutPage() {
  const { t } = useLocale()

  const stats = [
      { number: "10+", label: "Years Experience" },
    { number: "5000+", label: "Happy Travelers" },
    { number: "50+", label: "Destinations" },
    { number: "98%", label: "Satisfaction" },
  ]

  const team = [
    {
      name: "Akmal Karimov",
      role: "Founder",
      image: "/professional-uzbek-man-founder.jpg",
      bio: "Founder",
    },
    {
      name: "Dilnoza Rahimova",
      role: "Tour Guide",
      image: "/professional-uzbek-woman-tour-guide.jpg",
      bio: "Tour Guide",
    },
    {
      name: "Bobur Tashmatov",
      role: "Operations Manager",
      image: "/professional-uzbek-man-operations-manager.jpg",
      bio: "Operations Manager",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "We are passionate about travel and sharing the wonders of the world with you.",
    },
    {
      icon: Users,
      title: "Community",
      description: "We support local communities and promote sustainable tourism practices.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in every aspect of your journey.",
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "We are committed to responsible tourism that preserves destinations for future generations.",
    },
  ]

  return (
    <div className="min-h-screen">
      <PageBanner
        title="About Us"
        subtitle="Discover who we are and what drives our passion for travel"
        backgroundImage="/bukhara-old-city-architecture.jpg"
        height="60vh"
      />

      <div className="container mx-auto px-4 py-16">
        {/* Our Story */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                Our Story
              </Badge>
              <h2 className="text-3xl font-bold mb-6 text-balance">Passionate About Creating Unforgettable Journeys</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Founded in 2014, we began as a small group of travel enthusiasts with a simple mission: to share the incredible beauty and rich culture of Uzbekistan with the world.</p>
                <p>Over the years, we've grown into a trusted travel company, but our core values remain unchanged. We believe that travel is more than just visiting places – it's about creating connections, understanding cultures, and making memories that last a lifetime.</p>
                <p>Today, we're proud to have helped thousands of travelers discover the magic of Central Asia and beyond, always with the same personal touch and attention to detail that defined us from the beginning.</p>
              </div>
              <Link href="/contact">
                <Button className="mt-6">Get In Touch</Button>
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
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Our Values
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-balance">What We Stand For</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">What We Stand For</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              
                <FeatureCard icon={value.icon} title={value.title} description={value.description} />
            ))}
          </div>
        </motion.section>

        {/* Team */}
        <motion.section
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
        </motion.section>
      </div>
    </div>
  )
}
