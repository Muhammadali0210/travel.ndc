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
      title: "Address",
      details: ["Tashkent, Uzbekistan", "Amir Temur Street 15", "Yunusabad District"],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+998 71 123 45 67", "+998 90 123 45 67", "+998 95 123 45 67"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@uzbektravel.com", "tours@uzbektravel.com", "support@uzbektravel.com"],
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM", "Sunday: Closed"],
    },
  ]

  return (
    <div className="min-h-screen">
      <PageBanner
        title="Contact Us"
        description="Get in touch with our travel experts to plan your perfect journey"
        backgroundImage="/images/nature3.webp"
        height="50vh"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Badge variant="secondary" className="mb-4">
              Get In Touch
            </Badge>
            <h2 className="text-3xl font-bold mb-6 text-balance">Send Us a Message</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">Have questions about our tours or need help planning your trip? Fill out the form below and we'll get back to you within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone *</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject *</label>
                <Select value={formData.subject} onValueChange={(value) => handleChange("subject", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booking">Tour Booking</SelectItem>
                    <SelectItem value="information">General Information</SelectItem>
                    <SelectItem value="support">Customer Support</SelectItem>
                    <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Tell us about your travel plans or questions..."
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full gap-2">
                <Send className="h-4 w-4" />
                  Send Message
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Badge variant="secondary" className="mb-4">
              Contact Information
            </Badge>
            <h2 className="text-3xl font-bold mb-6 text-balance">Let's Start Planning Your Adventure</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">Ready to explore? Contact us through any of the methods below and let's create your perfect travel experience.</p>

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
              Our Location
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Find Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Visit our office in the heart of Tashkent for personalized travel consultation and planning.</p>
          </div>
          <div className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Our office is located in the heart of Tashkent, Uzbekistan.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
