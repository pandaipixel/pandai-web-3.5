'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { competitionSection } from '@/content/home'
import { useT } from '@/context/LanguageContext'
import { homeTranslations } from '@/content/translations/home'

export default function CompetitionSection() {
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
            overflow: 'hidden',
            paddingTop: '50px',
            paddingLeft: 'clamp(16px, 5vw, 50px)',
            paddingRight: 'clamp(16px, 5vw, 50px)',
            paddingBottom: '0px',
          }}
        >
          {/* Image + text overlay area — paddingTop reserves space for heading above the image */}
          <div style={{ position: 'relative', paddingTop: 'clamp(72px, 9vw, 110px)' }}>

            {/* Background image — in-flow so container grows to full image height */}
            <img
              src="https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/4863ad76-7afd-49d8-0fca-342ac3890400/1024px"
              alt=""
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
              }}
            />

            {/* Heading row — absolutely overlaid at top of image, z:1 */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1, textAlign: 'center', padding: '0 12px' }}>
              <p style={{
                fontSize: 'clamp(20px, 3.5vw, 35px)',
                fontWeight: 700,
                lineHeight: '1.4em',
                color: '#00cc85',
                margin: 0,
                wordBreak: 'break-word',
              }}>
                {t('competition.heading')}
              </p>
              <p style={{
                fontSize: 'clamp(13px, 2vw, 16px)',
                fontWeight: 400,
                lineHeight: '1.3em',
                color: 'rgb(67, 73, 85)',
                margin: 0,
                wordBreak: 'break-word',
              }}>
                {t('competition.subheading')}
              </p>
            </div>

          </div>

          {/* Description — between image and CTA button */}
          <div style={{ padding: '15px', textAlign: 'center' }}>
            <p style={{
              fontSize: 'clamp(13px, 2vw, 16px)',
              lineHeight: '1.4em',
              color: 'rgb(67, 73, 85)',
              margin: 0,
            }}>
              {t('competition.description')}
            </p>
          </div>

          {/* CTA button row — padding 25px 0, matches Framer xR9xnkkPq */}
          <div
            style={{
              paddingTop: '25px',
              paddingBottom: '25px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <motion.a
              href={competitionSection.cta.href}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center bg-[#00cc85] hover:bg-white transition-colors duration-200"
              style={{
                height: '62px',
                paddingLeft: '32px',
                paddingRight: '32px',
                borderRadius: '9999px',
                fontSize: '16px',
                fontWeight: 600,
                textDecoration: 'none',
                border: '1px solid #0b5851',
                gap: '10px',
              }}
            >
              <span className="text-white group-hover:text-[#00cc85] transition-colors duration-200">
                {t('competition.cta')}
              </span>
              {/* Arrow circle */}
              <span style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                borderRadius: '9999px',
                backgroundColor: '#ccffcc',
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="#0b5851" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
