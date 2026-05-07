// ─────────────────────────────────────────────
// Homepage content
// Edit all text, images, and data here
// ─────────────────────────────────────────────

export const competitionSection = {
  heading: 'Score Better',
  subheading: 'with Competition Practices',
  description: 'Gain access to various academic competition questions to improve your chances at scoring greater marks!',
  cta: {
    label: 'Academic Competitions',
    href: 'https://my.pandai.org/competitions',
  },
  competitions: [
    'Kangaroo Math',
    'Kancil Science',
    'Kijang Economics',
    'Beaver Computational Thinking',
  ],
  levels: ['Primary', 'Secondary', 'Form 1–3', 'Form 4–5'],
}

export const asFeaturedIn = {
  heading: 'As Featured In',
  logos: [
    { name: 'TechCrunch',       src: 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/8ceeecac-54cd-42a9-65d5-2852ad17dd00/128px' },
    { name: 'Berita Harian',    src: 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/17013407-1cf9-479a-5753-247f43673c00/128px' },
    { name: 'Tech in Asia',     src: 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/a492fa2f-6e3b-43c6-7c33-471d6cc65d00/256px' },
    { name: 'Vulcan Post',      src: 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/7d60c5d1-2316-44ef-2504-7ca431d2f300/128px' },
    { name: 'Digital News Asia',src: 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/9bc5a53b-5bfd-45bb-7b0d-6218d2b52000/128px' },
    { name: 'e27',              src: 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/0ec92697-8c68-40fb-eecf-3cc8c51f9200/128px' },
    { name: 'AmanZ',            src: 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/c87240e9-7e00-4ce9-d8d8-1ed0a662c300/256px' },
    { name: 'The Edge',         src: 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/6fd859e7-9ed8-4e3d-ffaf-e3a3cf12c500/256px' },
    { name: 'TV3',              src: 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/dcabe206-2371-4251-5428-a2931fdb2c00/256px' },
    { name: 'Astro Awani',      src: 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/c7f6637e-897e-408a-2cb8-e1cec53c6600/256px' },
    { name: 'Bernama',          src: 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/7e371014-75b5-4873-b0ad-bc3bed697d00/256px' },
    { name: 'RTM',              src: 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/ef4d2b02-9a36-467f-a39e-71380aa5a800/128px' },
    { name: 'Malaysiakini',     src: 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/a4c2d0e0-5fe4-42c5-c0e9-eba768626900/128px' },
    { name: 'BFM',              src: 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/ffc9f9ce-1438-46e0-a80a-6c4527752e00/128px' },
  ],
}

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

// ─────────────────────────────────────────────
// Feature Cards Section
// Edit: theme ('light'|'dark'), image URL, title, button label, button href
// ─────────────────────────────────────────────

export const featureCards = [
  {
    theme: 'light' as const,
    image: 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/1f1850cd-8ab3-47f0-267a-6f63be111500/512px',
    imageAlt: 'Students, Parents & Teachers using Pandai',
    title: 'What other Students, Parents, & Teachers say after using Pandai?',
    buttonLabel: 'Find Out More',
    buttonHref: 'https://my.pandai.org/about/testimonial',
  },
  {
    theme: 'dark' as const,
    image: 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/90762f8a-ef31-42e2-66ac-7dfdcfdd3d00/1024px',
    imageAlt: 'Ask PBot — AI study buddy',
    title: 'Experience the future of learning with Ask PBot, your AI study buddy',
    buttonLabel: 'Meet Ask PBot',
    buttonHref: 'https://blog.pandai.org/meet-ask-pbot-your-ultimate-study-buddy-in-pandai/',
  },
]

// ─────────────────────────────────────────────
// Testimonials Section
// Edit card text/images and store ratings here
// ─────────────────────────────────────────────

export const testimonialsSection = {
  // Heading — {users} and {questions} are replaced with live API counts
  headingPrefix: 'Pandai helped',
  headingMid: 'Malaysian students practise and complete',
  headingSuffix: 'questions since January 2020',

  // ── Testimonial cards ──
  // Edit: name, role, avatar path, quote, rating (1–5)
  cards: [
    {
      name: 'Ezran',
      role: 'Primary Student',
      avatar: '/images/avatar-ezran.png',
      quote:
        'Saya menggunakan pandai untuk mengulangkaji dan membuat latihan, saya juga suka mencabar diri saya di Pandai untuk mendapatkan skor tertinggi',
      rating: 5,
    },
    {
      name: 'Hafizah',
      role: 'Primary Student',
      avatar: '/images/avatar-hafizah.png',
      quote:
        'Saya menggunakan pandai untuk mengulangkaji pelajaran di rumah. Pandai memberi peluang kepada pelajar untuk belajar dari kesilapan. Terima kasih pandai!',
      rating: 5,
    },
    {
      name: 'Irfan',
      role: 'Secondary Student',
      avatar: '/images/avatar-irfan.png',
      quote:
        'Saya suka menghadiri kelas Live Tuition Pandai! Para tutor yang mengajar dalam kelas semuanya menarik dan sangat membantu. Saya senang faham dan hadam apa yang mereka ajarkan.',
      rating: 5,
    },
    {
      name: 'Ain',
      role: 'Secondary Student',
      avatar: '/images/avatar-ain.png',
      quote:
        'Saya menggunakan semua fungsi yg terdapat dalam PANDAI untuk membantu saya dalam persediaan SPM. Selepas menggunakan Pandai keputusan peperiksaan saya sangat cemerlang dan bertambah baik!',
      rating: 5,
    },
  ],

  // ── Store ratings ──
  // Edit: platform label, numeric score, icon URL
  storeRatings: [
    {
      platform: 'Play Store Rating',
      translationKey: 'ratings.playstore',
      score: 4.7,
      icon: 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/0857e4da-2767-43d6-aaa6-e4b2105dc500/64px',
      href: 'https://play.google.com/store/apps/details?id=com.pandai.app&showAllReviews=true&pli=1',
    },
    {
      platform: 'App Store Rating',
      translationKey: 'ratings.appstore',
      score: 4.7,
      icon: 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/2ab607db-ef11-44ec-c36e-1087bd643d00/64px',
      href: 'https://apps.apple.com/my/app/pandai-practice-for-exam/id1495066585',
    },
    {
      platform: 'TrustPilot Score',
      translationKey: 'ratings.trustpilot',
      score: 4.8,
      icon: 'https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/543b4257-486b-4300-b714-76b8e6c56600/64px',
      href: 'https://www.trustpilot.com/review/pandai.org',
    },
  ],
}
