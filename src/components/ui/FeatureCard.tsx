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

  return (
    <div
      className="relative flex flex-col rounded-3xl overflow-hidden"
      style={{
        backgroundColor: isLight ? '#ffffff' : '#1a1f6b',
        border: isLight ? '1.5px solid #d1fae5' : 'none',
      }}
    >

      {/* ── Background circles — zIndex 0, always behind content ── */}
      {isLight ? (
        <>
          {/* Top-right — large dark green */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 220, height: 220,
              top: -55, right: -55,
              backgroundColor: '#52c491',
              zIndex: 0,
            }}
          />
          {/* Bottom-left — medium light green */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 160, height: 160,
              bottom: -40, left: -40,
              backgroundColor: '#b4f3bf',
              zIndex: 0,
            }}
          />
        </>
      ) : (
        <>
          {/* Large teal radial orb */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: '150%',
              aspectRatio: '1',
              top: '-25%',
              left: '50%',
              transform: 'translateX(-50%)',
              background:
                'radial-gradient(circle, rgba(55,215,205,0.85) 0%, rgba(30,185,195,0.45) 40%, rgba(15,145,155,0.12) 65%, transparent 80%)',
              zIndex: 0,
            }}
          />
          {/* Top-right small mint circle */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{ width: 34, height: 34, top: 16, right: 16, backgroundColor: '#ccf5e7', zIndex: 1 }}
          />
          {/* Mid-right small green circle */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{ width: 20, height: 20, top: '42%', right: 14, backgroundColor: '#4db570', zIndex: 1 }}
          />
        </>
      )}

      {/* ── Image — zIndex 1, above circles ── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', zIndex: 1 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* ── Content — zIndex 2, always on top ── */}
      <div
        className="relative flex flex-col items-center gap-5 px-6 pt-4 pb-7"
        style={{
          backgroundColor: isLight ? '#ffffff' : 'rgba(12, 17, 75, 0.9)',
          zIndex: 2,
        }}
      >
        <p
          className="text-center font-bold text-base sm:text-lg leading-snug"
          style={{ color: isLight ? '#1a1a1a' : '#ffffff' }}
        >
          {title}
        </p>
        <CardButton label={buttonLabel} href={buttonHref} />
      </div>

    </div>
  )
}
