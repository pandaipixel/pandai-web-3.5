'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { useT } from '@/context/LanguageContext'
import { homeTranslations } from '@/content/translations/home'

const IMG_LOGO    = 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/3f4ff33d-da29-4375-43ce-a2f140d79700/public'
const IMG_DEVICES = 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/f9cf3e7b-ae23-41a9-0ae9-1b91e3666700/1024px'
const ICON_PLAY   = 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/0857e4da-2767-43d6-aaa6-e4b2105dc500/64px'
const ICON_APPLE  = 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/2ab607db-ef11-44ec-c36e-1087bd643d00/64px'
const ICON_HUAWEI = 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/61faf0ca-0c91-4896-11c1-479f2ef44c00/64px'
const ICON_GLOBE  = 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/1b2f9a57-d574-4b56-13e0-f5455e040e00/64px'

type DownloadKey =
  | 'download.btn1.label' | 'download.btn1.name'
  | 'download.btn2.label' | 'download.btn2.name'
  | 'download.btn3.label' | 'download.btn3.name'
  | 'download.btn4.label' | 'download.btn4.name'

const BUTTONS: { labelKey: DownloadKey; nameKey: DownloadKey; icon: string; href: string }[] = [
  { labelKey: 'download.btn1.label', nameKey: 'download.btn1.name', icon: ICON_PLAY,   href: 'https://play.google.com/store/apps/details?id=com.pandai.app' },
  { labelKey: 'download.btn2.label', nameKey: 'download.btn2.name', icon: ICON_APPLE,  href: 'https://apps.apple.com/my/app/pandai-practice-for-exam/id1495066585' },
  { labelKey: 'download.btn3.label', nameKey: 'download.btn3.name', icon: ICON_HUAWEI, href: 'https://appgallery.huawei.com/#/app/C102782793' },
  { labelKey: 'download.btn4.label', nameKey: 'download.btn4.name', icon: ICON_GLOBE,  href: 'https://pandai.org' },
]

function DownloadButton({ label, name, icon, href }: { label: string; name: string; icon: string; href: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
      style={{
        display: 'inline-flex',
        alignItems: 'stretch',
        width: 300,
        border: '1px solid #00cc85',
        borderRadius: 33,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        textDecoration: 'none',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,204,133,0.2)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
    >
      {/* Left icon area — #cbffcc bg with right divider */}
      <div
        style={{
          backgroundColor: '#cbffcc',
          borderRight: '1px solid #00cc85',
          padding: '12px 14px 12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt={name} style={{ width: 36, height: 36, objectFit: 'contain' }} />
      </div>

      {/* Right — label + name + arrow */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 10px 10px 18px',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <span style={{ fontSize: 11, color: '#555', fontWeight: 500, lineHeight: 1.3 }}>{label}</span>
          <span style={{ fontSize: 15, color: '#0b1f3a', fontWeight: 700, lineHeight: 1.3, whiteSpace: 'nowrap' }}>{name}</span>
        </div>
        {/* Arrow circle */}
        <span
          style={{
            width: 41,
            height: 41,
            backgroundColor: '#8ceb8b',
            borderRadius: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0b5851" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

export default function DownloadSection() {
  const t = useT(homeTranslations)
  const row1 = BUTTONS.slice(0, 3)
  const row2 = BUTTONS.slice(3)

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8" style={{ paddingTop: 25, paddingBottom: 25 }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            position: 'relative',
            backgroundColor: '#ffffff',
            border: '1px solid #00cc85',
            borderRadius: 25,
            padding: '20px 20px 30px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            overflow: 'hidden',
          }}
        >
          {/* ── Decorative blobs (animated) ── */}
          <motion.div
            animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', width: 432, height: 432, borderRadius: 500, backgroundColor: '#00cc85', left: -232, bottom: -229, zIndex: 0, pointerEvents: 'none' }}
          />
          <motion.div
            animate={{ x: [0, -20, 25, 0], y: [0, 20, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            style={{ position: 'absolute', width: 277, height: 277, borderRadius: 500, backgroundColor: '#ccffcc', right: -130, bottom: -119, zIndex: 0, pointerEvents: 'none' }}
          />
          <motion.div
            animate={{ x: [0, -15, 20, 0], y: [0, 18, -12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            style={{ position: 'absolute', width: 118, height: 118, borderRadius: 500, backgroundColor: '#8ceb8b', right: 60, top: 30, zIndex: 0, pointerEvents: 'none' }}
          />

          {/* ── Stack 1: Heading ── */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '8px 12px',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: 'clamp(22px, 3.5vw, 40px)', fontWeight: 800, color: '#0b5851', lineHeight: 1.2 }}>
              {t('download.headingPre')}
            </span>
            {/* Pandai logo pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG_LOGO}
                alt="Pandai"
                style={{ height: 'clamp(24px, 3vw, 36px)', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <span style={{ fontSize: 'clamp(22px, 3.5vw, 40px)', fontWeight: 800, color: '#0b5851', lineHeight: 1.2 }}>
              {t('download.headingSuffix')}
            </span>
          </div>

          {/* ── Stack 2: Device mockup ── */}
          <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMG_DEVICES}
              alt="Pandai on all devices"
              style={{ width: '100%', maxWidth: 860, objectFit: 'contain', display: 'block' }}
            />
          </div>

          {/* ── Stack 3: Platform CTA ── */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              width: '100%',
            }}
          >
            {/* Subtitle */}
            <p style={{ fontSize: 'clamp(16px, 1.9vw, 21px)', fontWeight: 700, color: '#0b5851', margin: 0, textAlign: 'center' }}>
              {t('download.subtitlePre')}
              <span style={{ color: '#00cc85' }}>{t('download.subtitleHighlight')}</span>
            </p>

            {/* Row 1: 3 buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
              {row1.map(btn => (
                <DownloadButton key={btn.href} label={t(btn.labelKey)} name={t(btn.nameKey)} icon={btn.icon} href={btn.href} />
              ))}
            </div>

            {/* Row 2: 1 centred button */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {row2.map(btn => (
                <DownloadButton key={btn.href} label={t(btn.labelKey)} name={t(btn.nameKey)} icon={btn.icon} href={btn.href} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
