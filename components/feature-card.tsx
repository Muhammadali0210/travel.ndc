"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  index?: number
}

export function FeatureCard({ icon: Icon, title,  index = 0 }: FeatureCardProps) {
  return (
    <div
      
      className="group relative p-8 bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-border/50 hover:border-primary/20"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 text-center space-y-4">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-primary/25"
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">{title}</h3>
        </div>
      </div>
    </div>
  )
}
