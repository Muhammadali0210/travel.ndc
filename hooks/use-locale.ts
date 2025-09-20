"use client"

import { useState } from "react"
import useTranslationStore from "@/store/lang.store"

export function useLocale() {
  const [locale] = useState<string>("en")
  const { t } = useTranslationStore()

  const getTranslation = (key: string): string => {
    return t?.[key] || "test"
  }

  return { locale, t: { get: getTranslation } }
}
