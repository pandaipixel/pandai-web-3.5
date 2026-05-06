'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import FeatureCard from '@/components/ui/FeatureCard'
import { featureCards } from '@/content/home'

export default function FeatureCardsSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {featureCards.map((card) => (
            <motion.div key={card.title} variants={fadeInUp} className="h-full">
              <FeatureCard {...card} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
