"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLocale } from "@/hooks/use-locale"
import useTranslationStore from "@/store/lang.store"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { locale, t } = useLocale()
  const { fetchTranslations, fetchSiteinfo, setLang } = useTranslationStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", key: "nav.link1" },
    { href: "/about", key: "nav.link2" },
    { href: "/tur", key: "nav.link3" },
    { href: "/news", key: "nav.link4" },
    { href: "/faq", key: "nav.link5" },
    { href: "/contact", key: "nav.link6" },
  ]

  const localeLabels: Record<string, string> = {
    en: "English",
    uz: "O'zbekcha",
    ru: "Русский",
  }

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.1)",
        backdropFilter: isScrolled ? "blur(10px)" : "blur(5px)",
        boxShadow: isScrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "0 0 0 0 rgba(0, 0, 0, 0)",
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled
                ? "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                : "text-white drop-shadow-lg"
            }`}
            style={!isScrolled ? { textShadow: "2px 2px 4px rgba(0,0,0,0.8)" } : {}}
          >
            TravelUz
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative transition-colors duration-300 ${
                isScrolled
                  ? "text-foreground hover:text-primary"
                  : "text-white hover:text-primary-foreground drop-shadow-md"
              }`}
              style={!isScrolled ? { textShadow: "1px 1px 2px rgba(0,0,0,0.8)" } : {}}
            >
              <motion.span whileHover={{ y: -2 }} className="block">
                 {t.get(item.key)}
              </motion.span>
            </Link>
          ))}
        </div>

        {/* Language Switcher & Mobile Menu */}
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center space-x-2 transition-colors duration-300 ${
                  isScrolled
                    ? "text-foreground hover:text-primary hover:bg-accent"
                    : "text-white hover:text-primary-foreground hover:bg-white/20 drop-shadow-md"
                }`}
                style={!isScrolled ? { textShadow: "1px 1px 2px rgba(0,0,0,0.8)" } : {}}
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{localeLabels[locale]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {(["en", "uz", "ru"] as string[]).map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => {fetchTranslations(lang); setLang(lang); fetchSiteinfo(lang)}}
                  className={locale === lang ? "bg-accent" : ""}
                >
                  {localeLabels[lang]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className={`md:hidden transition-colors duration-300 ${
              isScrolled
                ? "text-foreground hover:text-primary hover:bg-accent"
                : "text-white hover:text-primary-foreground hover:bg-white/20 drop-shadow-md"
            }`}
            style={!isScrolled ? { textShadow: "1px 1px 2px rgba(0,0,0,0.8)" } : {}}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 bg-background/95 backdrop-blur-md rounded-lg border border-border"
          >
            <div className="px-4 py-2 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.get(item.key)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
