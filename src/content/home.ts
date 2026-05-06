// ─────────────────────────────────────────────
// Homepage content
// Edit all text, images, and data here
// ─────────────────────────────────────────────

export const tagline = {
  text: "Pandai is Malaysia's online learning platform for students aged 7–17. It combines live tuition, quiz battles, quick notes, topical tests and exams, student leaderboards, detailed report cards, and academic-competition practice to help students learn effectively, track progress, and improve grades — all from home.",
}

export const hero = {
  // Main headline — each string is one line
  headlineLines: ["Malaysia's", '#1 Online', 'Learning App'],

  // Trust badges row beneath the headline
  trustBadges: [
    { src: '/images/badge-moe.png',          alt: 'MOE Curriculum Supported'              },
    { src: '/images/badge-personalized.png', alt: 'Personalized Learning Certified'        },
    { src: '/images/badge-finland.png',      alt: 'Education Alliance Finland Certified'   },
  ],

  // Right-side visual layers (swap files here to update the hero image)
  visual: {
    bgCircle:   '/images/bg-right.png',    // green circle background composition
    student:    '/images/hero-student.png', // student photo overlaid on circle
    appMockup:  '/images/app-mockup.png',  // phone mockup (if shown separately)
  },

  // ── legacy fields kept for future sections ──
  socialProof: {
    count: '1,000,000+',
    label: 'students already learning',
    avatars: [
      '/images/avatar-ain.png',
      '/images/avatar-ezran.png',
      '/images/avatar-hafizah.png',
      '/images/avatar-irfan.png',
    ],
  },
  image: '/images/hero-student.png',
  bgLeft: '/images/bg-left.png',
  bgRight: '/images/bg-right.png',
}

export const stats = [
  { value: '1M+', label: 'Active Students' },
  { value: '40+', label: 'Subjects Covered' },
  { value: '500K+', label: 'Questions in Bank' },
  { value: '4.8★', label: 'App Store Rating' },
]

export const features = [
  {
    title: 'Personalised Quizzes',
    description: "AI-powered quizzes that adapt to each student's weak areas for faster improvement.",
    icon: '/images/asset-1.svg',
  },
  {
    title: 'Live Tuition',
    description: 'Join live classes with top Malaysian teachers from the comfort of home.',
    icon: '/images/asset-2.svg',
  },
  {
    title: 'Flashcards & Notes',
    description: 'Study smarter with structured notes and spaced-repetition flashcards.',
    icon: '/images/asset-3.svg',
  },
]

export const trustedBy = {
  heading: 'Trusted & recognised by',
  badges: [
    { src: '/images/badge-moe.png', alt: 'Ministry of Education Malaysia' },
    { src: '/images/badge-finland.png', alt: 'Finland Education' },
    { src: '/images/badge-personalized.png', alt: 'Personalized Learning' },
  ],
}

export const testimonials = [
  {
    name: 'Ain',
    role: 'Form 5 Student',
    avatar: '/images/avatar-ain.png',
    quote: 'Pandai helped me score straight As in my SPM. The quizzes are fun and actually work!',
    rating: 5,
  },
  {
    name: 'Ezran',
    role: 'Form 3 Student',
    avatar: '/images/avatar-ezran.png',
    quote: "I used to dread studying. Now I look forward to it. Pandai's gamified approach is amazing.",
    rating: 5,
  },
  {
    name: 'Hafizah',
    role: 'Parent',
    avatar: '/images/avatar-hafizah.png',
    quote: "I can track my son's progress daily. It gives me peace of mind knowing he's learning consistently.",
    rating: 5,
  },
  {
    name: 'Irfan',
    role: 'Form 4 Student',
    avatar: '/images/avatar-irfan.png',
    quote: 'Live tuition on Pandai is way better than physical tuition. Cheaper too!',
    rating: 5,
  },
]

export const appDownload = {
  heading: 'Start learning today',
  subtext: 'Download Pandai free on iOS and Android.',
  image: '/images/app-mockup.png',
  appStore: {
    label: 'Download on the App Store',
    href: 'https://apps.apple.com/my/app/pandai/id1490660301',
    badge: '/images/badge-1.svg',
  },
  playStore: {
    label: 'Get it on Google Play',
    href: 'https://play.google.com/store/apps/details?id=org.pandai.app',
    badge: '/images/badge-2.svg',
  },
}

export const faq = [
  {
    question: 'Is Pandai free to use?',
    answer:
      'Yes! Pandai has a free tier with access to thousands of questions and study materials. Premium plans unlock live tuition and advanced features.',
  },
  {
    question: 'Which subjects and levels are supported?',
    answer:
      'Pandai covers all major Malaysian school subjects from Primary 1 to Form 5, including UPSR, PT3, and SPM syllabuses.',
  },
  {
    question: "Can parents monitor their child's progress?",
    answer:
      'Absolutely. Parents get a dedicated dashboard to track study time, quiz scores, and improvement trends.',
  },
  {
    question: 'Is Pandai aligned with the Malaysian curriculum?',
    answer:
      'Yes — all content is mapped to the Kementerian Pendidikan Malaysia (KPM) curriculum and updated regularly.',
  },
]
