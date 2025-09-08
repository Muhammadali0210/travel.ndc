"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useLocale } from "@/hooks/use-locale"
import { PageBanner } from "@/components/page-banner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react"

export default function ContactPage() {
  const { t } = useLocale()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: t.contact.address,
      details: ["Tashkent, Uzbekistan", "Amir Temur Street 15", "Yunusabad District"],
    },
    {
      icon: Phone,
      title: t.contact.phone,
      details: ["+998 71 123 45 67", "+998 90 123 45 67", "+998 95 123 45 67"],
    },
    {
      icon: Mail,
      title: t.contact.email,
      details: ["info@uzbektravel.com", "tours@uzbektravel.com", "support@uzbektravel.com"],
    },
    {
      icon: Clock,
      title: t.contact.hours,
      details: [t.contact.weekdays, t.contact.saturday, t.contact.sunday],
    },
  ]

  return (
    <div className="min-h-screen">
      <PageBanner
        title={t.contact.title}
        subtitle={t.contact.subtitle}
        backgroundImage="/serene-mountain-lake.png"
        height="60vh"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Badge variant="secondary" className="mb-4">
              {t.contact.getInTouch}
            </Badge>
            <h2 className="text-3xl font-bold mb-6 text-balance">{t.contact.formTitle}</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">{t.contact.formDescription}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t.contact.name} *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder={t.contact.namePlaceholder}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.contact.email} *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder={t.contact.emailPlaceholder}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.contact.phone}</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder={t.contact.phonePlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.contact.subject} *</label>
                <Select value={formData.subject} onValueChange={(value) => handleChange("subject", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.contact.subjectPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booking">{t.contact.booking}</SelectItem>
                    <SelectItem value="information">{t.contact.information}</SelectItem>
                    <SelectItem value="support">{t.contact.support}</SelectItem>
                    <SelectItem value="partnership">{t.contact.partnership}</SelectItem>
                    <SelectItem value="other">{t.contact.other}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.contact.message} *</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder={t.contact.messagePlaceholder}
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full gap-2">
                <Send className="h-4 w-4" />
                {t.contact.sendMessage}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Badge variant="secondary" className="mb-4">
              {t.contact.contactInfo}
            </Badge>
            <h2 className="text-3xl font-bold mb-6 text-balance">{t.contact.infoTitle}</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">{t.contact.infoDescription}</p>

            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20"
        >
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              {t.contact.location}
            </Badge>
            <h2 className="text-3xl font-bold mb-4">{t.contact.findUs}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.contact.locationDescription}</p>
          </div>
          <div className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">{t.contact.mapPlaceholder}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
