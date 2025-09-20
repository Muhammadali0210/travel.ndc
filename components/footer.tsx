"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLocale } from "@/hooks/use-locale"
import useTranslationStore from "@/store/lang.store"

export function Footer() {
  const { locale, t } = useLocale()
  const { siteinfo } = useTranslationStore()

  const quickLinks = [
    { href: "/", key: "nav.link1" },
    { href: "/about", key: "nav.link2" },
    { href: "/tur", key: "nav.link3" },
    { href: "/news", key: "nav.link4" },
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
            <p className="text-muted-foreground text-sm leading-relaxed"  dangerouslySetInnerHTML={{ __html: siteinfo?.desc || ""}}></p>
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
              {t.get("footer.quick-links")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {t.get(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              {t.get("footer.contact-infor")}
            </h3>
            <div className="space-y-3">
              {siteinfo?.address && (
                siteinfo?.address?.split("|")?.map((line, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{line}</span>
                  </div>
                ))
              )}
              {siteinfo?.phone_number && (
                siteinfo?.phone_number?.split("|")?.map((line, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{line}</span>
                  </div>
                ))
              )}
              {siteinfo?.email && (
                siteinfo?.email?.split("|")?.map((line, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{line}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 TravelUz. {t.get("footer.copyright")}
          </p>
          
        </div>
      </div>
    </footer>
  )
}
