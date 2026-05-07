'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { hero } from '@/content/students'
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations'
import { useT } from '@/context/LanguageContext'
import { studentsTranslations } from '@/content/translations/students'

export default function StudentsHeroSection() {
  const t = useT(studentsTranslations)


  return (
    <section className="relative bg-white overflow-hidden pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* ── LEFT: Headline + Subtext + CTA ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center lg:items-start lg:text-left w-full"
          >
            {/* Headline — same font sizes as home hero: 41px / 50px / 60px */}
            <motion.h1
              variants={fadeInUp}
              className="font-bold tracking-tight flex flex-col gap-6"
              style={{ color: '#00cc85' }}
            >
              <span className="leading-[1.05] text-[60px]">{t('hero.headline.line1')}</span>
              <span className="leading-[1.05] text-[32px]" style={{ color: '#434955' }}>{t('hero.headline.line2')}</span>
            </motion.h1>

          </motion.div>

          {/* ── RIGHT: Student visual ── */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center w-full"
          >
            <Image
              src={hero.visual.student}
              alt="Pandai student"
              width={600}
              height={469}
              className="w-full max-w-[320px] md:max-w-[420px] lg:max-w-full object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
