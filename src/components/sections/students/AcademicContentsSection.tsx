'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { academicContents, academicFeatureCards } from '@/content/students'
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations'
import { useT } from '@/context/LanguageContext'
import { studentsTranslations } from '@/content/translations/students'

export default function AcademicContentsSection() {
  const t = useT(studentsTranslations)

  return (
    <section style={{ padding: '0 30px 50px 30px', marginTop: 0 }}>
      <div className="max-w-5xl mx-auto">

        {/* ── Outer frame: white bg, green border, vertical stack, 30px padding ── */}
        <div
          className="flex flex-col gap-0 rounded-3xl bg-white"
          style={{ border: '1px solid #00cc85', padding: '0 30px 30px 30px' }}
        >

          {/* ── Top: 2-column — title/subtitle/CTA | illustration ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:grid lg:grid-cols-2 gap-0 items-start"
            style={{ paddingLeft: '30px', paddingTop: '30px', paddingBottom: '30px' }}
          >
            {/* Left copy */}
            <div className="flex flex-col gap-5 self-center">
              <motion.h2
                variants={fadeInUp}
                className="font-bold text-[28px] md:text-[32px] leading-tight"
                style={{ color: '#0b5851' }}
              >
                {t('academicContents.title')}
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="font-bold text-[16px] md:text-[18px] leading-snug"
                style={{ color: '#1a1a1a' }}
              >
                {t('academicContents.subtitle')}
              </motion.p>

              <motion.div variants={fadeInUp}>
                <Link
                  href={academicContents.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full text-white font-bold text-sm transition-transform duration-200 hover:scale-[1.02]"
                  style={{
                    backgroundColor: '#00cc85',
                    border: '1px solid #0b5851',
                  }}
                >
                  <span>{t('academicContents.cta')}</span>
                  <span
                    className="flex items-center justify-center"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 9999,
                      backgroundColor: '#ccffcc',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" stroke="#0b5851" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Right illustration */}
            <motion.div
              variants={scaleIn}
              className="flex items-center justify-center overflow-visible mx-auto"
              style={{ padding: 0, paddingRight: '30px', width: 420, height: 300, alignSelf: 'center' }}
            >
              <Image
                src={academicContents.visual}
                alt="Academic content illustration"
                width={420}
                height={300}
                className="w-full h-full object-cover object-center"
                style={{ transform: 'scale(1.2)', transformOrigin: 'center' }}
              />
            </motion.div>
          </motion.div>


          {/* ── Bottom: horizontal Feature Cards stack ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-row gap-5 rounded-2xl"
            style={{
              padding: '30px',
              backgroundColor: '#ccffcc',
              border: '1px solid #00cc85',
              height: 'fit-content',
            }}
          >
            {academicFeatureCards.map((card, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="relative flex flex-col items-center text-center flex-1 bg-white rounded-3xl overflow-hidden"
                style={{
                  border: '1px solid #00cc85',
                  alignSelf: 'stretch',
                }}
              >
                {/* Decorative blobs */}
                <div style={{
                  position: 'absolute',
                  top: -30,
                  left: 44,
                  width: 66,
                  height: 66,
                  borderRadius: '50%',
                  backgroundColor: '#ccffcc',
                }} />
                <div style={{
                  position: 'absolute',
                  top: 130,
                  left: -60,
                  width: 114,
                  height: 114,
                  borderRadius: '50%',
                  backgroundColor: '#8CEB8B',
                }} />
                <div style={{
                  position: 'absolute',
                  top: 160,
                  left: 200,
                  width: 165,
                  height: 165,
                  borderRadius: '50%',
                  backgroundColor: '#00CC85',
                }} />

                {/* Illustration */}
                <div className="relative z-10 flex flex-1 items-center justify-center w-full">
                  <Image
                    src={card.image}
                    alt={t(card.titleKey as any)}
                    width={160}
                    height={180}
                    className="w-[160px] h-[180px] object-contain"
                  />
                </div>

                {/* Text */}
                <div
                  className="relative z-10 flex flex-col items-center gap-3 px-5 py-5 w-full flex-1"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    borderTop: '1px solid #00cc85',
                    borderRight: 'none',
                    borderBottom: 'none',
                    borderLeft: 'none',
                    borderRadius: 0,
                    alignSelf: 'stretch',
                  }}
                >
                  <h3 className="font-bold text-[20px]" style={{ color: '#00cc85' }}>
                    {t(card.titleKey as any)}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-center" style={{ color: '#434955' }}>
                    {t(card.descKey as any)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
