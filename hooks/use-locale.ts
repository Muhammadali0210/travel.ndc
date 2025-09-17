"use client"

import { useState, useEffect } from "react"
import useTranslationStore from "@/store/lang.store"

export function useLocale() {
  const [locale, setLocale] = useState<string>("en")
  const { t, fetchTranslations } = useTranslationStore()

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale")
    if (savedLocale && ["en", "uz", "ru"].includes(savedLocale)) {
      setLocale(savedLocale)
    }
    // Fetch translations on mount
    fetchTranslations(locale)
  }, [locale, fetchTranslations])

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale)
    localStorage.setItem("locale", newLocale)
    fetchTranslations(newLocale)
  }

  const getTranslation = (key: string): string => {
    return t?.[key] || "test"
  }

  return { locale, changeLocale, t: { get: getTranslation } }
}
