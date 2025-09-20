"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useLocale } from "@/hooks/use-locale"
import { PageBanner } from "@/components/page-banner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import useTranslationStore from "@/store/lang.store"
import request from "@/hooks/https-request"
import { toast } from "sonner"

export default function ContactPage() {
  const { t } = useLocale()
  const { siteinfo } = useTranslationStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const formData = new FormData();
      formData.append("name", formData?.name);
      formData.append("email", formData?.email);
      formData.append("phone_number", formData?.phone_number);
      formData.append("message", formData?.message);
      const res = await request.post("/contacts", formData);
      alert(t.get("contact.form-success"));
      setFormData({
        name: "",
        email: "",
        phone_number: "",
        message: "",
      })
      console.log("Form submitted:", res)
    } catch (error) {
      console.log("Error submitting form:", error)
      alert(t.get("contact.form-error"));
    } finally {
      setIsLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: t.get("contact.address"),
      details: siteinfo ? siteinfo.address?.split("|") : []
    },
    {
      icon: Phone,
      title: t.get("contact.phone"),
      details: siteinfo ? siteinfo.phone_number?.split("|") : [],
    },
    {
      icon: Mail,
      title: t.get("contact.email"),
      details: siteinfo ? siteinfo.email?.split("|") : [],
    },
    {
      icon: Clock,
      title: t.get("contact.work-hours"),
      details: siteinfo ? siteinfo.work_time?.split("|") : [],
    },
  ]

  return (
    <div className="min-h-screen">
      <PageBanner
        title={t.get("contact.title")}
        description={t.get("contact.desc")}
        backgroundImage="/images/nature3.webp"
        height="50vh"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <Badge variant="secondary" className="mb-4">
              {t.get("contact.get-in-touch")}
            </Badge>
            <h2 className="text-3xl font-bold mb-6 text-balance">{t.get("contact.from-title")}</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">{t.get("contact.from-subtitle")}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t.get("contact.form-name")} *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({...prev, name: e.target.value}))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.get("contact.form-email")}</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({...prev, email: e.target.value}))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.get("contact.from-phone")}</label>
                <Input
                  type="text"
                  value={formData.phone_number}
                  onChange={(e) => setFormData((prev) => ({...prev, phone_number: e.target.value}))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.get("contact.from-message")} *</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({...prev, message: e.target.value}))}
                  placeholder={t.get("contact.from-message-placeh")}
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full gap-2">
                <Send className="h-4 w-4" />
                {t.get("contact.send")} {isLoading ? "..." : ""}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Badge variant="secondary" className="mb-4">
              {t.get("contact.contact-information")}
            </Badge>
            <h2 className="text-3xl font-bold mb-6 text-balance">{t.get("contact.contact-infor-text")}</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">{t.get("contact.contact-infor-subtext")}</p>

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
                      {info?.details?.map((detail, detailIndex) => (
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
              {t.get("contact.our-location")}
            </Badge>
            <h2 className="text-3xl font-bold mb-4">{t.get("contact.map-text")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.get("contact.map-subtex")}</p>
          </div>
          <div className="bg-gray-100 rounded-2xl h-96 relative overflow-hidden">
            <style>{`
              .map-container iframe {
                width: 100%;
                height: 100%;
                border: 0;
                border-radius: 1rem;
              }
            `}</style>
            <div
              className="map-container w-full h-full"
              dangerouslySetInnerHTML={{ __html: siteinfo?.map || "" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
