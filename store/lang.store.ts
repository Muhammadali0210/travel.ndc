import { BASE_URL } from '@/hooks/https-request'
import { ILangData, ITranslation } from '@/types'
import { create } from 'zustand'

interface TranslationState {
  t: ITranslation | null
  lang: string
  langData: ILangData | null
  setLang: (lang: string) => void
  setT: (t: ITranslation) => void
  fetchTranslations: (lang?: string) => Promise<void>
}


const useTranslationStore = create<TranslationState>((set, get) => ({
  t: null,
  lang: 'en',
  langData: null,

  setLang: (lang: string) => set({ lang }),

  setT: (t: ITranslation) => set({ t }),

  fetchTranslations: async (lang) => {
    try {
      const currentLang = lang || get().lang
      const res = await fetch(BASE_URL + `/translations`, {
        headers: {
            'Accept-Language': currentLang,
        }
      })
      const data = await res.json()
      console.log('✅ Translations fetched:', data)

      set({
        t: data,
        langData: data.langData,
      })
    } catch (error) {
      console.error('❌ Translation fetch failed:', error)
    }
  },
}))

export default useTranslationStore
