"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLocale } from "@/hooks/use-locale"
import { getTranslation } from "@/lib/i18n"

export function Footer() {
  const { locale } = useLocale()

  const quickLinks = [
    { href: "/", key: "nav.home" },
    { href: "/about", key: "nav.about" },
    { href: "/tur", key: "nav.tours" },
    { href: "/news", key: "nav.news" },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ]

  return (
    <footer className="bg-gradient-to-br from-primary/5 to-secondary/5 border-t border-border">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              TravelUz
            </motion.div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {locale === "en" &&
                "Discover the beauty of Uzbekistan and the world with our expertly crafted tours and unforgettable experiences."}
              {locale === "uz" &&
                "Bizning professional tarzda tayyorlangan sayohatlar va unutilmas tajribalar bilan O'zbekiston va dunyo go'zalligini kashf eting."}
              {locale === "ru" &&
                "Откройте красоту Узбекистана и мира с нашими профессионально разработанными турами и незабываемыми впечатлениями."}
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 text-primary" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              {locale === "en" && "Quick Links"}
              {locale === "uz" && "Tezkor Havolalar"}
              {locale === "ru" && "Быстрые Ссылки"}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {getTranslation(locale, link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              {locale === "en" && "Contact Info"}
              {locale === "uz" && "Aloqa Ma'lumotlari"}
              {locale === "ru" && "Контактная Информация"}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Tashkent, Uzbekistan</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span>+998 71 123 45 67</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span>info@traveluz.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 TravelUz. {locale === "en" && "All rights reserved."}
            {locale === "uz" && "Barcha huquqlar himoyalangan."}
            {locale === "ru" && "Все права защищены."}
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              {locale === "en" && "Privacy Policy"}
              {locale === "uz" && "Maxfiylik Siyosati"}
              {locale === "ru" && "Политика Конфиденциальности"}
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              {locale === "en" && "Terms of Service"}
              {locale === "uz" && "Foydalanish Shartlari"}
              {locale === "ru" && "Условия Использования"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
