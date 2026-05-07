'use client'

import Image from 'next/image'
import Link from 'next/link'
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
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* ── LEFT: Headline + Subtext + CTA ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center lg:items-start lg:text-left w-full"
          >
            {/* Headline — same green + size scale as home hero */}
            <motion.h1
              variants={fadeInUp}
              className="font-bold leading-[1.05] tracking-tight text-[41px] md:text-[50px] lg:text-[60px]"
              style={{ color: '#00cc85' }}
            >
              {t('hero.headline')}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-base md:text-lg leading-relaxed max-w-xl"
              style={{ color: '#374151' }}
            >
              {t('hero.subtext')}
            </motion.p>

            {/* CTA — brand pill matching FeatureCard / Competition button style */}
            <motion.div variants={fadeInUp} className="mt-8">
              <Link
                href={hero.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full text-white font-bold text-sm md:text-base transition-transform duration-200 hover:scale-[1.02]"
                style={{
                  backgroundColor: '#00cc85',
                  border: '1px solid #0b5851',
                }}
              >
                <span>{t('hero.cta')}</span>
                <span
                  className="flex items-center justify-center"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9999,
                    backgroundColor: '#ccffcc',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 6l6 6-6 6"
                      stroke="#0b5851"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </motion.div>
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
