"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PageBanner } from "@/components/page-banner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Search, MessageCircle, Phone, Mail } from "lucide-react"
import Link from "next/link"

import { useTranslation } from "react-i18next";
import i18n from "@/i18n/config"
import { useLocale } from "@/hooks/use-locale"
import { useFaqsGet } from "@/services/faq.service"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useTranslationStore from "@/store/lang.store"

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<number[]>([])
  const { t } = useLocale();
  const { siteinfo } = useTranslationStore();


  const { data: faqData } = useFaqsGet()

  const filteredFaqs = faqData?.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen">
      <PageBanner
        title={t.get("faq.title")}
        description={t.get("faq.subtitle")}
        backgroundImage="/images/nature4.png"
        height="50vh"
      />


      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder={t.get("faq.inputText")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-lg rounded-2xl"
            />
          </div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {filteredFaqs?.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={`item-${faq.id}`}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 text-left text-lg font-medium text-gray-800 underline-none hover:bg-gray-50 focus:bg-gray-50 focus:ring-0">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-5 pb-4 text-gray-600">
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8"
        >
          <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">{t.get("faq.cardTitle")}</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">{t.get("faq.cardSubtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="gap-2">
                <Mail className="h-4 w-4" />
                {t.get("faq.conactButton")}
              </Button>
            </Link>
            <Link href={`tel:${siteinfo?.phone_number?.split("|")[0]}`}>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Phone className="h-4 w-4" />
                {t.get("faq.callButton")}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
