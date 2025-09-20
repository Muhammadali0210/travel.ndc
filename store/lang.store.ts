import { BASE_URL } from '@/lib/constants'
import { ILangData, ITranslation } from '@/types'
import { create } from 'zustand'

interface TranslationState {
  t: ITranslation | null
  lang: string
  langData: ILangData | null
  setLang: (lang: string) => void
  setT: (t: ITranslation) => void
  fetchTranslations: (lang?: string) => Promise<void>
  fetchSiteinfo: (lang?: string) => Promise<void>
  siteinfo: any
}


const useTranslationStore = create<TranslationState>((set, get) => ({
  t: null,
  lang: 'en',
  langData: null,
  siteinfo: null,

  setLang: (lang: string) => set({ lang }),

  setT: (t: ITranslation) => set({ t }),
  fetchSiteinfo: async (lang) => {
    try {
      const currentLang = lang || get().lang
      const res = await fetch(BASE_URL + `/siteinfo`, {
        headers: {
            'Accept-Language': currentLang,
        }
      })
      const data = await res.json()
      set({
        siteinfo: data?.data || null,
      })
      console.log('✅ Site info fetched:', data)
    } catch (error) {
      console.error('❌ Site info fetch failed:', error)
    }
  },

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
