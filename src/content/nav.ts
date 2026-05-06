// ─────────────────────────────────────────────
// Shared navigation & footer content
// Edit links, labels, and URLs here
// ─────────────────────────────────────────────

// hoverBg: pill background on hover (from DS)
// hoverText: text color on hover ('white' or 'dark')
export const navLinks = [
  { label: 'Students', href: '/students', hoverBg: '#00cc85', hoverText: 'white' },
  { label: 'Parents',  href: '/parents',  hoverBg: '#fece00', hoverText: 'dark'  },
  { label: 'Teachers', href: '/teachers', hoverBg: '#ff5c98', hoverText: 'white' },
  { label: 'About',    href: '/about',    hoverBg: '#00cc85', hoverText: 'white' },
]

export const navCTA = {
  signIn:  { label: 'Sign In',  href: 'https://app.pandai.org/app/login'  },
  signUp:  { label: 'Sign Up',  href: 'https://app.pandai.org/app/signup' },
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────

export const footerBrand = {
  description:
    'Pandai is a learning app that helps students get better grades in school through game-like quizzes, tests, exams, notes, videos and more',
  company: 'Pandai Education Sdn Bhd',
  ssm:     '201901044079',
  address: 'D-09-02, Menara Suezcap 1, KL Gateway, No. 2 Jalan Kerinchi, 59200 Kuala Lumpur, Malaysia',
  phone:   '+03-2709-0508',

  // ── Social media links — update hrefs here ──
  socials: [
    { platform: 'facebook',  label: 'Facebook',  href: 'https://facebook.com/pandaiapp'   },
    { platform: 'instagram', label: 'Instagram', href: 'https://instagram.com/pandaiapp'  },
    { platform: 'twitter',   label: 'X',         href: 'https://twitter.com/pandaiapp'    },
    { platform: 'youtube',   label: 'YouTube',   href: 'https://youtube.com/@pandai'      },
    { platform: 'tiktok',    label: 'TikTok',    href: 'https://tiktok.com/@pandaiapp'    },
    { platform: 'discord',   label: 'Discord',   href: 'https://discord.gg/pandai'        },
  ],
}

// Academic Content — rows rendered with | separator between items
export const footerAcademic = {
  heading: 'Academic Content',
  rows: [
    [{ label: 'Year 1', href: '#' }, { label: 'Year 2', href: '#' }, { label: 'Year 3', href: '#' }],
    [{ label: 'Year 4', href: '#' }, { label: 'Year 5', href: '#' }, { label: 'Year 6', href: '#' }],
    [{ label: 'Form 1', href: '#' }, { label: 'Form 2', href: '#' }, { label: 'Form 3', href: '#' }],
    [{ label: 'Form 4', href: '#' }, { label: 'Form 5', href: '#' }],
  ],
}

export const footerExamPrep = {
  heading: 'Exam Preparation',
  links: [
    { label: 'SPM',  href: '#', highlight: false },
    { label: 'PKSK', href: '#', highlight: false },
    { label: 'UASA', href: '#', highlight: false },
    { label: 'UPKK', href: '#', highlight: false },
    { label: 'UKKM', href: '#', highlight: false },
  ],
}

export const footerCompetition = {
  heading: 'Competition Preparation',
  links: [
    { label: 'Kangaroo Maths',        href: '#' },
    { label: 'Kancil Science',        href: '#' },
    { label: 'Beaver Comp. Thinking', href: '#' },
    { label: 'Kijang Economics',      href: '#' },
    { label: 'Olimpiad',              href: '#' },
  ],
}

export const footerFeatures = {
  // No heading — plain link list
  links: [
    { label: 'Live Tuition',              href: '#' },
    { label: 'Ask Pbot',                  href: '#' },
    { label: 'Battle',                    href: '#' },
    { label: 'Quiz',                      href: '#' },
    { label: 'Topical Test',              href: '#' },
    { label: 'Practice Exams',            href: '#' },
    { label: 'Flashcards',                href: '#' },
    { label: 'Quick Notes',               href: '#' },
    { label: 'Learning Videos',           href: '#' },
    { label: 'Interactive Experiment',    href: '#' },
    { label: 'Rewards',                   href: '#' },
    { label: 'Certs & Badges',            href: '#' },
    { label: 'Leaderboard',               href: '#' },
    { label: 'Daily Goals',               href: '#' },
    { label: 'Score Card',                href: '#' },
    { label: 'Report Card',               href: '#' },
    { label: 'Content Creator Showcase',  href: '#' },
  ],
}

export const footerCompany = {
  platform: [
    { label: 'Pandai Teacher',    href: '#' },
    { label: 'Pandai Parents',    href: '#' },
    { label: 'Community Events',  href: '#' },
  ],
  company: [
    { label: 'Blog',                    href: '#' },
    { label: 'About Us',                href: '/about' },
    { label: 'Our Team',                href: '#' },
    { label: 'Join The Team',           href: '#' },
    { label: 'Corporate Partnerships',  href: '#' },
    { label: 'Apply Scholarship',       href: '#' },
  ],
  support: [
    { label: 'User Video Guides', href: '#' },
    { label: 'Quick Guides',      href: '#' },
    { label: 'Help Center',       href: '#' },
  ],
}

export const footerLegal = {
  copyright: '© 2026 Pandai.org All Right Reserved',
  links: [
    { label: 'Terms Of Service', href: '/terms'   },
    { label: 'Privacy Policy',   href: '/privacy' },
  ],
}
