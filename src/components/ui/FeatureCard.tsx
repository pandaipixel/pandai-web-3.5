'use client'

import Link from 'next/link'

// ─────────────────────────────────────────────
// FeatureCard — reusable across pages
// Pixel-accurate to Framer source (all values from DevTools inspection)
// Both themes share: same border, same 3 circles, same button
// ─────────────────────────────────────────────

export interface FeatureCardProps {
  theme: 'light' | 'dark'
  image: string
  imageAlt: string
  title: string
  buttonLabel: string
  buttonHref: string
}

// Identical button for both themes (confirmed from Framer HTML inspection)
function CardButton({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2"
      style={{
        backgroundColor: '#00cc85',
        border: '1px solid #0b5851',
        borderRadius: 30,
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '20px',
        paddingRight: '8px',
      }}
    >
      <span style={{ color: '#ffffff', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}>
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
  const isLight = theme === 'light'

  // Only these three values differ between themes
  const cardBg     = isLight ? '#ffffff'                   : '#2253e6'
  const contentBg  = isLight ? 'rgba(204, 255, 204, 0.75)' : 'rgba(17, 41, 144, 0.8)'
  const titleColor = isLight ? '#0b5851'                   : '#ffffff'

  return (
    <div
      className="relative flex flex-col overflow-hidden h-full"
      style={{
        backgroundColor: cardBg,
        border: '1px solid #00cc85',
        borderRadius: 25,
      }}
    >

      {/* ── Circles — identical for both themes (same Framer CSS classes/positions) ── */}

      {/* framer-zcg75a — #8ceb8b, 140×140, bottom:102 left:-70 */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 140, height: 140,
          bottom: 102, left: -70,
          backgroundColor: '#8ceb8b',
          borderRadius: '100%',
          zIndex: 0,
        }}
      />
      {/* framer-10nunue — #00cc85, 210×210, top:70 right:-105 */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 210, height: 210,
          top: 70, right: -105,
          backgroundColor: '#00cc85',
          borderRadius: '100%',
          zIndex: 0,
        }}
      />
      {/* framer-kczqee — #ccffcc, 84×84, top:28 left:34 */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 84, height: 84,
          top: 28, left: 34,
          backgroundColor: '#ccffcc',
          borderRadius: '100%',
          zIndex: 0,
        }}
      />

      {/* ── Image — flex:1 grows wrapper to fill remaining height; image fills wrapper ── */}
      <div style={{ zIndex: 1, flex: 1, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={imageAlt}
          style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom', display: 'block' }}
        />
      </div>

      {/* ── Content — top border separates image from text ── */}
      <div
        className="relative flex flex-col items-center gap-4 px-6 pt-4 pb-6"
        style={{
          backgroundColor: contentBg,
          borderTop: '1px solid #00cc85',
          zIndex: 2,
        }}
      >
        <p
          className="text-center font-bold text-base sm:text-lg leading-snug"
          style={{ color: titleColor }}
        >
          {title}
        </p>
        <CardButton label={buttonLabel} href={buttonHref} />
      </div>

    </div>
  )
}
