"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLocale } from "@/hooks/use-locale"
import { PageBanner } from "@/components/page-banner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Search, MessageCircle, Phone, Mail } from "lucide-react"
import Link from "next/link"

import { useTranslation } from "react-i18next";
import i18n from "@/i18n/config"

export default function FAQPage() {
  // const { t } = useLocale()
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<number[]>([])
  const { t } = useTranslation();

  const faqCategories = [
    {
      title: t("faq.booking"),
      questions: [
        {
          question: t("faq.howToBook"),
          answer: t("faq.howToBookAnswer"),
        },
        {
          question: t("faq.cancellation"),
          answer: t("faq.cancellationAnswer"),
        },
        {
          question: t("faq.payment"),
          answer: t("faq.paymentAnswer"),
        },
      ],
    },
    {
      title: t("faq.travel"),
      questions: [
        {
          question: t("faq.bestTime"),
          answer: t("faq.bestTimeAnswer"),
        },
        {
          question: t("faq.visa"),
          answer: t("faq.visaAnswer"),
        },
        {
          question: t("faq.currency"),
          answer: t("faq.currencyAnswer"),
        },
      ],
    },
    {
      title: t("faq.accommodation"),
      questions: [
        {
          question: t("faq.hotels"),
          answer: t("faq.hotelsAnswer"),
        },
        {
          question: t("faq.meals"),
          answer: t("faq.mealsAnswer"),
        },
        {
          question: t("faq.transport"),
          answer: t("faq.transportAnswer"),
        },
      ],
    },
  ];

  const allQuestions = faqCategories.flatMap((category, categoryIndex) =>
    category.questions.map((q, questionIndex) => ({
      ...q,
      id: categoryIndex * 100 + questionIndex,
      category: category.title,
    })),
  )

  const filteredQuestions = allQuestions.filter(
    (q) =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng)
  }


  return (
    <div className="min-h-screen">
      <PageBanner
        title={t("faq.title")}
        // eslint-disable-next-line react/no-unescaped-entities
        // @ts-ignore
        subtitle={t("faq.subtitle")}
        backgroundImage="/khiva-ancient-fortress-walls.jpg"
        height="40vh"
      />

      {/* <button onClick={() => changeLang('en')}>EN</button>
      <button onClick={() => changeLang('ru')}>RU</button> */}

      <div className="container mx-auto px-4 py-16">
        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder={t("faq.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {searchTerm ? (
            // Search Results
            <div className="space-y-4">
              {filteredQuestions.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-sm border overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {item.category}
                      </Badge>
                      <h3 className="font-semibold text-lg">{item.question}</h3>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${openItems.includes(item.id) ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openItems.includes(item.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 text-muted-foreground leading-relaxed">{item.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
              {filteredQuestions.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-muted-foreground mb-2">{t("faq.noResults")}</h3>
                  <p className="text-muted-foreground">{t("faq.tryDifferentSearch")}</p>
                </div>
              )}
            </div>
          ) : (
            // Categories
            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 px-6 py-4">
                    <h2 className="text-xl font-bold">{category.title}</h2>
                  </div>
                  <div className="divide-y">
                    {category.questions.map((item, questionIndex) => {
                      const itemId = categoryIndex * 100 + questionIndex
                      return (
                        <div key={questionIndex}>
                          <button
                            onClick={() => toggleItem(itemId)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <h3 className="font-semibold">{item.question}</h3>
                            <ChevronDown
                              className={`h-5 w-5 transition-transform ${openItems.includes(itemId) ? "rotate-180" : ""
                                }`}
                            />
                          </button>
                          <AnimatePresence>
                            {openItems.includes(itemId) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 pb-4 text-muted-foreground leading-relaxed">{item.answer}</div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8"
        >
          <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">{t("faq.stillHaveQuestions")}</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">{t("faq.contactDescription")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="gap-2">
                <Mail className="h-4 w-4" />
                {t("faq.contactUs")}
              </Button>
            </Link>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Phone className="h-4 w-4" />
              {t("faq.callUs")}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
