'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import FeatureCard from '@/components/ui/FeatureCard'
import { featureCards } from '@/content/home'
import { useT } from '@/context/LanguageContext'
import { homeTranslations } from '@/content/translations/home'

const CARD_KEYS = [
  { title: 'featureCard1.title', button: 'featureCard1.button' },
  { title: 'featureCard2.title', button: 'featureCard2.button' },
] as const

export default function FeatureCardsSection() {
  const t = useT(homeTranslations)

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
          {featureCards.map((card, i) => (
            <motion.div key={card.title} variants={fadeInUp} className="h-full">
              <FeatureCard
                {...card}
                title={t(CARD_KEYS[i].title)}
                buttonLabel={t(CARD_KEYS[i].button)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
