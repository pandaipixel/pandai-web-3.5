'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import FeatureCard from '@/components/ui/FeatureCard'
import { studentFeatureCards } from '@/content/home'
import { useT } from '@/context/LanguageContext'
import { homeTranslations } from '@/content/translations/home'

const BG_IMAGE =
  'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/dc51ea3c-476f-4d71-6808-b19d65bfe200/public'

export default function StudentFeaturesSection() {
  const t = useT(homeTranslations)

  return (
    <section
      className="w-full"
      style={{
        paddingTop: '30px',
        paddingBottom: '70px',
        backgroundImage: `url('${BG_IMAGE}')`,
        backgroundRepeat: 'repeat',
        backgroundSize: '220px',
      }}
    >
      <div
        className="max-w-5xl mx-auto"
        style={{
          padding: '0 clamp(16px, 4vw, 50px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
        }}
      >
        {/* Heading */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{ position: 'relative', zIndex: 3, width: '100%', textAlign: 'center' }}
        >
          <p
            style={{
              fontSize: 'clamp(22px, 3.5vw, 35px)',
              fontWeight: 700,
              lineHeight: '1.4em',
              color: '#0B5851',
              margin: 0,
            }}
          >
            {t('studentFeatures.heading')}
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full"
          style={{ position: 'relative', zIndex: 3 }}
        >
          {studentFeatureCards.map((card) => (
            <motion.div
              key={card.titleKey}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                hovered: { scale: 1.02, transition: { duration: 0.2, ease: 'easeOut' } },
              }}
              whileHover="hovered"
              className="group cursor-pointer"
              style={{ height: '407px', minWidth: '300px' }}
            >
              <FeatureCard
                theme="student"
                image={card.image}
                imageAlt={card.imageAlt}
                title={t(card.titleKey)}
                buttonLabel={t(card.buttonKey)}
                buttonHref={card.buttonHref}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
