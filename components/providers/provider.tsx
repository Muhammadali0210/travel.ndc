'use client'

import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n/config'
import { useEffect, useState } from 'react'
import useTranslationStore from '@/store/lang.store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Providers({ children }: { children: React.ReactNode }) {
  const { t, fetchTranslations } = useTranslationStore()
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    fetchTranslations('en')
  }, [fetchTranslations])

  return (
    <QueryClientProvider client={queryClient}>
        {t ? children : 'Loading...'}
    </QueryClientProvider>
  )
}
