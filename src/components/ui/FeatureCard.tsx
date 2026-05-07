'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

// ─────────────────────────────────────────────
// FeatureCard — reusable across pages
// Pixel-accurate to Framer source (all values from DevTools inspection)
// Both themes share: same border, same 3 circles, same button
// ─────────────────────────────────────────────

export interface FeatureCardProps {
  theme: 'light' | 'dark' | 'student'
  image: string
  imageAlt: string
  title: string
  buttonLabel: string
  buttonHref: string
}

function CardButton({ label, href, isStudent = false }: { label: string; href: string; isStudent?: boolean }) {
  if (isStudent) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#00cc85] group-hover:bg-white transition-colors duration-200"
        style={{ border: '1px solid #0b5851', borderRadius: 30, padding: '8px 8px 8px 20px' }}
      >
        <span
          className="text-white group-hover:text-[#00cc85] transition-colors duration-200"
          style={{ fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}
        >
          {label}
        </span>
        <span
          className="flex items-center justify-center shrink-0"
          style={{ width: 34, height: 34, backgroundColor: '#ccffcc', borderRadius: '100%' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0b5851" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </span>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 bg-[#00cc85] hover:bg-white transition-colors duration-200"
      style={{
        border: '1px solid #0b5851',
        borderRadius: 30,
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '20px',
        paddingRight: '8px',
      }}
    >
      <span className="text-white group-hover:text-[#00cc85] transition-colors duration-200" style={{ fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}>
        {label}
      </span>
      {/* Arrow circle — #ccffcc with dark teal chevron (Framer token) */}
      <span
        className="flex items-center justify-center shrink-0"
        style={{ width: 34, height: 34, backgroundColor: '#ccffcc', borderRadius: '100%' }}
      >
        <svg
          width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="#0b5851" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </span>
    </Link>
  )
}

export default function FeatureCard({
  theme,
  image,
  imageAlt,
  title,
  buttonLabel,
  buttonHref,
}: FeatureCardProps) {
  const isStudent = theme === 'student'
  const isLight   = theme === 'light'

  const cardBg      = isLight || isStudent ? '#ffffff'                   : '#2253e6'
  const contentBg   = isStudent ? 'rgba(255, 255, 255, 0.5)'
                    : isLight   ? 'rgba(204, 255, 204, 0.75)'
                    :             'rgba(17, 41, 144, 0.8)'
  const titleColor  = isLight || isStudent ? '#0b5851' : '#ffffff'
  const borderWidth = isStudent ? '1.5px' : '1px'
  const borderRadiusPx = isStudent ? 20 : 25

  return (
    <div
      className="relative flex flex-col overflow-hidden h-full"
      style={{
        backgroundColor: cardBg,
        border: `${borderWidth} solid #00cc85`,
        borderRadius: borderRadiusPx,
      }}
    >

      {/* ── Circles — identical for both themes (same Framer CSS classes/positions) ── */}

      {/* framer-zcg75a — #8ceb8b, 140×140, bottom:102 left:-70 */}
      <motion.div
        className="absolute pointer-events-none"
        variants={{ hovered: { x: -18, y: 14, transition: { duration: 1.1, ease: 'easeInOut' } } }}
        style={{ width: 140, height: 140, bottom: 102, left: -70, backgroundColor: '#8ceb8b', borderRadius: '100%', zIndex: 0 }}
      />
      {/* framer-10nunue — #00cc85, 210×210, top:70 right:-105 */}
      <motion.div
        className="absolute pointer-events-none"
        variants={{ hovered: { x: 22, y: -18, transition: { duration: 1.3, ease: 'easeInOut' } } }}
        style={{ width: 210, height: 210, top: 70, right: -105, backgroundColor: '#00cc85', borderRadius: '100%', zIndex: 0 }}
      />
      {/* framer-kczqee — #ccffcc, 84×84, top:28 left:34 */}
      <motion.div
        className="absolute pointer-events-none"
        variants={{ hovered: { x: 12, y: -16, transition: { duration: 0.9, ease: 'easeInOut' } } }}
        style={{ width: 84, height: 84, top: 28, left: 34, backgroundColor: '#ccffcc', borderRadius: '100%', zIndex: 0 }}
      />

      {/* ── Image — flex:1 grows wrapper to fill remaining height; image fills wrapper ── */}
      <div style={{ zIndex: 1, flex: 1, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={imageAlt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: isStudent ? 'center' : 'bottom',
            display: 'block',
            ...(isStudent && { transform: 'scale(0.75)', transformOrigin: 'center center' }),
          }}
        />
      </div>

      {/* ── Content — top border separates image from text ── */}
      <div
        className="relative flex flex-col items-center"
        style={{
          backgroundColor: contentBg,
          borderTop: `${borderWidth} solid #00cc85`,
          zIndex: 2,
          justifyContent: isStudent ? 'space-between' : 'center',
          gap: isStudent ? '25px' : '16px',
          padding: isStudent ? '15px 15px 25px 15px' : '16px 24px 24px',
          ...(isStudent && { height: '218px', flexShrink: 0, overflow: 'hidden' }),
        }}
      >
        <p
          className="text-center font-bold text-base sm:text-lg leading-snug"
          style={{ color: titleColor }}
        >
          {title}
        </p>
        <CardButton label={buttonLabel} href={buttonHref} isStudent={isStudent} />
      </div>

    </div>
  )
}
