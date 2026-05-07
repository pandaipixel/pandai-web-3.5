'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { learnFeatured, learnFeatureCards } from '@/content/students'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useT } from '@/context/LanguageContext'
import { studentsTranslations } from '@/content/translations/students'

export default function LearnSection() {
  const t = useT(studentsTranslations)

  return (
    <section style={{ padding: '0 30px 50px 30px' }}>
      <div className="max-w-5xl mx-auto">
        <div
          className="flex flex-col rounded-3xl bg-white overflow-hidden"
          style={{ border: '1px solid #00cc85' }}
        >

          {/* ── Title bar ── */}
          <div
            className="flex items-center justify-center py-4"
            style={{ backgroundColor: '#00cc85' }}
          >
            <h2 className="font-bold text-[41px] text-white tracking-tight">
              {t('learnSection.title')}
            </h2>
          </div>

          {/* ── Content area ── */}
          <div className="flex flex-col gap-5 p-8">

            {/* Featured card — Online Tuition */}
            <div
              className="flex flex-row items-stretch rounded-2xl overflow-hidden"
              style={{ border: '1px solid #00cc85', backgroundColor: '#ffffff', height: 'fit-content' }}
            >
              {/* Left: image stack */}
              <div
                className="relative flex-1 flex items-start justify-center overflow-hidden"
                style={{ backgroundColor: '#ffffff' }}
              >
                {/* Decorative blobs */}
                <div style={{ position: 'absolute', top: -25, left: -25, width: 110, height: 110, borderRadius: '50%', backgroundColor: '#ccffcc' }} />
                <div style={{ position: 'absolute', bottom: -25, left: -25, width: 90, height: 90, borderRadius: '50%', backgroundColor: '#8CEB8B' }} />
                <div style={{ position: 'absolute', top: 15, right: -25, width: 80, height: 80, borderRadius: '50%', backgroundColor: '#00CC85' }} />

                {/* Illustration — 70% upscaled, anchored to top */}
                <Image
                  src={learnFeatured.image}
                  alt="Online Tuition illustration"
                  width={408}
                  height={340}
                  className="relative z-10 w-[408px] h-[340px] object-contain object-top"
                  style={{ transform: 'scale(1.3) translateY(15%)', transformOrigin: 'top center' }}
                />
              </div>

              {/* Right: text stack */}
              <div className="flex flex-col gap-4 flex-1" style={{ padding: '40px', margin: 0 }}>
                <h3 className="font-bold text-[22px]" style={{ color: '#00cc85' }}>
                  {t('learnSection.featured.title')}
                </h3>
                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {([1, 2, 3] as const).map(n => (
                    <li key={n} className="flex items-start gap-2 p-0 m-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden="true">
                        <circle cx="12" cy="12" r="12" fill="#00cc85" />
                        <path d="M7 12l3.5 3.5L17 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[14px]" style={{ color: '#434955' }}>
                        {t(`learnSection.featured.point${n}` as any)}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={learnFeatured.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full text-white font-bold text-sm self-start transition-transform duration-200 hover:scale-[1.02]"
                  style={{ backgroundColor: '#00cc85', border: '1px solid #0b5851' }}
                >
                  <span>{t('learnSection.featured.cta')}</span>
                  <span
                    className="flex items-center justify-center"
                    style={{ width: 36, height: 36, borderRadius: 9999, backgroundColor: '#ccffcc' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" stroke="#0b5851" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            {/* Feature cards grid 3×3 */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-5"
            >
              {learnFeatureCards.map((card, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="relative flex flex-col items-center text-center bg-white rounded-3xl overflow-hidden"
                  style={{ border: '1px solid #00cc85', alignSelf: 'stretch' }}
                >
                  {/* Decorative blobs */}
                  <div style={{ position: 'absolute', top: -30, left: 44, width: 66, height: 66, borderRadius: '50%', backgroundColor: '#ccffcc' }} />
                  <div style={{ position: 'absolute', top: 130, left: -60, width: 114, height: 114, borderRadius: '50%', backgroundColor: '#8CEB8B' }} />
                  <div style={{ position: 'absolute', top: 160, left: 200, width: 165, height: 165, borderRadius: '50%', backgroundColor: '#00CC85' }} />

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

                  {/* Lower text stack */}
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
      </div>
    </section>
  )
}
