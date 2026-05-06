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
  signIn: {
    label: 'Sign In',
    href: 'https://app.pandai.org/app/login',
  },
  signUp: {
    label: 'Sign Up',
    href: 'https://app.pandai.org/app/signup',
  },
}

export const footerLinks = [
  {
    title: 'For Students',
    links: [
      { label: 'Personalized Learning', href: '/students' },
      { label: 'Interactive Content', href: '/students' },
      { label: 'Trackable Progress', href: '/students' },
      { label: 'Rewards', href: '/students' },
    ],
  },
  {
    title: 'For Parents',
    links: [
      { label: 'Track Progress', href: '/parents' },
      { label: 'Set Targets', href: '/parents' },
      { label: 'Manage Account', href: '/parents' },
      { label: 'Get Support', href: '/parents' },
    ],
  },
  {
    title: 'For Teachers',
    links: [
      { label: 'Quiz Builder', href: '/teachers' },
      { label: 'eLADAP', href: '/teachers' },
      { label: 'eRPH', href: '/teachers' },
      { label: 'Community', href: '/teachers' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Join The Team', href: '/careers' },
      { label: 'Corporate Partnerships', href: '/partners' },
    ],
  },
]

export const footerLegal = {
  copyright: '© 2025 Pandai Education Sdn. Bhd. All rights reserved.',
  ssm: 'SSM-201901044079',
  links: [
    { label: 'Terms Of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Help Center', href: '/help' },
  ],
}
