'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { competitionSection } from '@/content/home'

export default function CompetitionSection() {
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
            // Matches Framer: padding 50px 50px 0px 50px
            paddingTop: '50px',
            paddingLeft: '50px',
            paddingRight: '50px',
            paddingBottom: '0px',
          }}
        >
          {/* Image + text overlay area — height driven by image, no clipping */}
          <div style={{ position: 'relative' }}>

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

            {/* Heading row — absolutely overlaid at top of image, z:1 (matches Framer y:0) */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1, textAlign: 'center' }}>
              {/* "Score Better" — 35px × 1.4em = 49px, #00cc85 green matching hero section */}
              <p style={{
                fontSize: '35px',
                fontWeight: 700,
                lineHeight: '1.4em',
                color: '#00cc85',
                margin: 0,
              }}>
                {competitionSection.heading}
              </p>
              {/* "with Competition Practices" — 16px × 1.3em = 21px, Pandai Grey */}
              <p style={{
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '1.3em',
                color: 'rgb(67, 73, 85)',
                margin: 0,
              }}>
                {competitionSection.subheading}
              </p>
            </div>

          </div>

          {/* Description — between image and CTA button */}
          <div style={{ padding: '15px', textAlign: 'center' }}>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.3em',
              color: 'rgb(67, 73, 85)',
              margin: 0,
            }}>
              {competitionSection.description}
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
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '62px',
                paddingLeft: '32px',
                paddingRight: '32px',
                borderRadius: '9999px',
                backgroundColor: '#00cc85',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 600,
                textDecoration: 'none',
                border: '1px solid #0b5851',
                gap: '10px',
              }}
            >
              {competitionSection.cta.label}
              {/* Arrow circle — matches FeatureCard button style */}
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
