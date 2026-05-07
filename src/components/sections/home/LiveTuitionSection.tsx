'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { useT } from '@/context/LanguageContext'
import { homeTranslations } from '@/content/translations/home'

const BG_IMAGE   = 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/6b0f757c-5bda-41b9-57d9-87c666666200/public'
const IMG_LEFT   = 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/cd9d5a79-bb1f-4092-95cc-e5d76a72d600/1024px'
const IMG_CENTER = 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/685bf821-5e7c-4d90-e25b-564134e6e800/1024px'
const IMG_RIGHT  = 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/a0497eee-d6d0-4755-61e2-24f946a22400/1024px'

export default function LiveTuitionSection() {
  const t = useT(homeTranslations)

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8" style={{ paddingTop: 25, paddingBottom: 25 }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          whileHover="hovered"
          viewport={{ once: true, margin: '-60px' }}
          style={{ borderRadius: 25, overflow: 'hidden' }}
        >
          {/* ── Upper stack ── */}
          <div
            style={{
              position: 'relative',
              backgroundImage: `url('${BG_IMAGE}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '30px 30px 0 30px',
              overflow: 'hidden',
            }}
          >
            {/* Decorative semi-circle — dome behind tutors image */}
            <motion.div
              variants={{ hovered: { y: 100, transition: { duration: 0.4, ease: 'easeOut' } } }}
              style={{
                position: 'absolute',
                width: 720,
                height: 720,
                borderRadius: '100%',
                backgroundColor: '#d1d4ff',
                opacity: 0.3,
                bottom: -250,
                left: '50%',
                translateX: '-50%',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />

            {/* Heading + subtitle */}
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
              <h2
                style={{
                  fontSize: 'clamp(26px, 4vw, 48px)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.2,
                  margin: '0 0 14px',
                }}
              >
                {t('liveTuition.headingPre')}
                <span style={{ color: '#FFD700' }}>{t('liveTuition.headingHighlight')}</span>
                {t('liveTuition.headingPost')}
              </h2>
              <p
                style={{
                  fontSize: 'clamp(13px, 1.4vw, 15px)',
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {t('liveTuition.subtitle')}
              </p>
            </div>

            {/* Three images */}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginTop: 20,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                src={IMG_LEFT}
                alt="Subject icons"
                variants={{ hovered: { x: -18, transition: { duration: 0.4, ease: 'easeOut' } } }}
                style={{ width: '21%', objectFit: 'contain', alignSelf: 'flex-end',  }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                src={IMG_CENTER}
                alt="Pandai tutors"
                variants={{ hovered: { scale: 1.3, transition: { duration: 0.4, ease: 'easeOut' } } }}
                style={{ width: '70%', objectFit: 'contain' }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                src={IMG_RIGHT}
                alt="Subject icons"
                variants={{ hovered: { x: 18, transition: { duration: 0.4, ease: 'easeOut' } } }}
                style={{ width: '21%', objectFit: 'contain', alignSelf: 'flex-end',  }}
              />
            </div>
          </div>

          {/* ── Lower CTA strip ── */}
          <div
            style={{
              backgroundColor: 'rgba(47, 59, 128, 0.9)',
              borderTop: '1.5px solid rgba(255,255,255,0.3)',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            {[
              { labelKey: 'liveTuition.ctaSchedule' as const },
              { labelKey: 'liveTuition.ctaTutors' as const },
            ].map(({ labelKey }) => (
              <Link
                key={labelKey}
                href="#"
                className="group inline-flex items-center gap-2 bg-[#00cc85] hover:bg-white transition-colors duration-200"
                style={{ border: '1px solid #0b5851', borderRadius: 30, padding: '8px 8px 8px 20px', textDecoration: 'none' }}
              >
                <span
                  className="text-white group-hover:text-[#00cc85] transition-colors duration-200"
                  style={{ fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap' }}
                >
                  {t(labelKey)}
                </span>
                <span
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 38, height: 38, backgroundColor: '#ccffcc', borderRadius: '100%' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0b5851" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
