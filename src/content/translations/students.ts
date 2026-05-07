import type { TranslationDict } from '@/context/LanguageContext'

// ─────────────────────────────────────────────
// Students page translations
// Add EN + BM strings here for every user-visible piece of copy.
// Mirror the structure of src/content/translations/home.ts.
// ─────────────────────────────────────────────

export const studentsTranslations: TranslationDict = {
  en: {
    // ── Page meta ──
    'meta.title': 'For Students — Pandai',

    // ── HeroSection ──
    'hero.headline': 'Learn smarter, score higher',
    'hero.subtext':
      'Pandai gives every Malaysian student the tools to study effectively — quizzes, notes, live classes, and more.',
    'hero.cta': 'Get Started Free',
  },

  ms: {
    // ── Page meta ──
    'meta.title': 'Untuk Pelajar — Pandai',

    // ── HeroSection ──
    'hero.headline': 'Belajar pintar, dapatkan markah lebih tinggi',
    'hero.subtext':
      'Pandai memberi setiap pelajar Malaysia alat untuk belajar dengan berkesan — kuiz, nota, kelas langsung, dan banyak lagi.',
    'hero.cta': 'Mula Percuma',
  },
}
