'use client'

import Link from 'next/link'

// ─────────────────────────────────────────────
// FeatureCard — reusable across pages
// Supports two themes: 'light' (white) and 'dark' (deep blue)
// ─────────────────────────────────────────────

export interface FeatureCardProps {
  theme: 'light' | 'dark'
  image: string
  imageAlt: string
  title: string
  buttonLabel: string
  buttonHref: string
}

// ── Chevron button (green pill, white circle arrow) ──
function CardButton({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center rounded-full gap-3"
      style={{
        backgroundColor: '#00cc85',
        paddingTop: '7px',
        paddingBottom: '7px',
        paddingLeft: '22px',
        paddingRight: '7px',
      }}
    >
      <span className="text-white font-bold text-sm whitespace-nowrap">{label}</span>
      <span
        className="flex items-center justify-center rounded-full shrink-0"
        style={{ width: 36, height: 36, backgroundColor: 'rgba(255,255,255,0.95)' }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00cc85"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
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

  // Theme-specific values
  const cardBg        = isLight ? '#e9fbf5' : '#1a1f6b'
  const textColor     = isLight ? '#1a1a1a' : '#ffffff'
  const gradientStop  = isLight ? 'rgba(233,251,245,' : 'rgba(26,31,107,'
  const border        = isLight ? '1.5px solid #d1fae5' : 'none'

  return (
    <div
      className="relative flex flex-col rounded-3xl overflow-hidden"
      style={{ backgroundColor: cardBg, border }}
    >

      {/* ── Background decorative circles ── */}
      {isLight ? (
        <>
          {/* Top-right — medium green, larger */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 220, height: 220,
              top: -55, right: -55,
              backgroundColor: '#66d59d',
            }}
          />
          {/* Bottom-left — medium green, larger */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 180, height: 180,
              bottom: -45, left: -45,
              backgroundColor: '#66d59d',
            }}
          />
        </>
      ) : (
        <>
          {/* Large teal radial orb — upper-center */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: '130%',
              aspectRatio: '1',
              top: '-30%',
              left: '50%',
              transform: 'translateX(-50%)',
              background:
                'radial-gradient(circle at 42% 38%, rgba(60,220,220,0.75) 0%, rgba(30,185,185,0.40) 38%, rgba(15,150,155,0.15) 60%, transparent 78%)',
            }}
          />
          {/* Top-right small mint circle */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{ width: 34, height: 34, top: 16, right: 16, backgroundColor: '#ccf5e7' }}
          />
          {/* Mid-right small green circle */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{ width: 20, height: 20, top: '38%', right: 14, backgroundColor: '#4db570' }}
          />
        </>
      )}

      {/* ── Image section ── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient blend — bottom of image fades into content bg */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: '40%',
            background: `linear-gradient(to bottom, ${gradientStop}0) 0%, ${gradientStop}1) 100%)`,
          }}
        />
      </div>

      {/* ── Content section ── */}
      <div
        className="flex flex-col items-center gap-5 px-6 pt-3 pb-7"
        style={{ backgroundColor: cardBg }}
      >
        <p
          className="text-center font-bold text-base sm:text-lg leading-snug"
          style={{ color: textColor }}
        >
          {title}
        </p>
        <CardButton label={buttonLabel} href={buttonHref} />
      </div>

    </div>
  )
}
