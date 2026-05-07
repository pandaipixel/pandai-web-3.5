'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { asFeaturedIn } from '@/content/home'
import { useT } from '@/context/LanguageContext'
import { homeTranslations } from '@/content/translations/home'

// Logos duplicated to create seamless infinite loop
const loopLogos = [...asFeaturedIn.logos, ...asFeaturedIn.logos]

export default function AsFeaturedInSection() {
  const t = useT(homeTranslations)
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #00cc85',
            borderRadius: '25px',
            overflow: 'hidden',
            paddingTop: '15px',
            paddingBottom: '15px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Heading row — 35px × 1.4em line-height = 49px, matches Framer exactly */}
          <div
            style={{
              height: '49px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <p style={{ fontSize: '35px', fontWeight: 600, lineHeight: '1.4em', color: '#00cc85', margin: 0, textAlign: 'center' }}>
              {t('asFeaturedIn.heading')}
            </p>
          </div>

          {/* Ticker — 134px, infinite marquee */}
          <div
            style={{
              height: '134px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            {/* Left fade */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '60px',
                zIndex: 2,
                background: 'linear-gradient(to right, #ffffff, transparent)',
                pointerEvents: 'none',
              }}
            />
            {/* Right fade */}
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '60px',
                zIndex: 2,
                background: 'linear-gradient(to left, #ffffff, transparent)',
                pointerEvents: 'none',
              }}
            />

            <div className="pandai-marquee-track">
              {loopLogos.map((logo, i) => (
                <div key={i} className="pandai-marquee-item">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    style={{ height: logo.height ? `${logo.height}px` : '44px', width: 'auto', maxWidth: '160px', objectFit: 'contain' }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
