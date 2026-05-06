'use client'

import { useLang, type Lang } from '@/context/LanguageContext'

const LABELS: Record<Lang, string> = {
  en: 'EN',
  ms: 'BM',
}

const NEXT: Record<Lang, Lang> = {
  en: 'ms',
  ms: 'en',
}

export default function LangToggle() {
  const { lang, setLang } = useLang()

  return (
    <button
      onClick={() => setLang(NEXT[lang])}
      aria-label={lang === 'en' ? 'Switch to Bahasa Malaysia' : 'Switch to English'}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 select-none"
      style={{
        backgroundColor: '#00cc85',
        border: '1.5px solid #0b5851',
        borderRadius: 9999,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        boxShadow: '0 4px 16px rgba(0,204,133,0.35)',
      }}
    >
      {/* Globe icon */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>

      {/* Current lang label */}
      <span style={{ color: '#ffffff', fontWeight: 700, fontSize: 13, letterSpacing: '0.04em' }}>
        {LABELS[lang]}
      </span>

      {/* Divider */}
      <span style={{ width: 1, height: 14, backgroundColor: 'rgba(255,255,255,0.4)' }} />

      {/* Next lang label (dimmer) */}
      <span style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 600, fontSize: 13, letterSpacing: '0.04em' }}>
        {LABELS[NEXT[lang]]}
      </span>
    </button>
  )
}
