import Link from 'next/link'
import Image from 'next/image'

const footerCols = [
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

export default function Footer() {
  return (
    <footer className="bg-surface-inverse text-text-inverse py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/images/logo-white.svg"
                alt="Pandai"
                width={120}
                height={29}
              />
            </div>
            <p className="text-sm text-text-tertiary leading-relaxed">
              Malaysia&apos;s #1 online learning app for school students.
            </p>
            <p className="text-xs text-text-tertiary mt-3">
              Transforming learning space with technology.
            </p>
          </div>

          {footerCols.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold mb-4">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-tertiary hover:text-text-inverse transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-tertiary">
            © 2025 Pandai Education Sdn. Bhd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-xs text-text-tertiary hover:text-text-inverse transition-colors">
              Terms Of Service
            </Link>
            <Link href="/privacy" className="text-xs text-text-tertiary hover:text-text-inverse transition-colors">
              Privacy Policy
            </Link>
            <Link href="/help" className="text-xs text-text-tertiary hover:text-text-inverse transition-colors">
              Help Center
            </Link>
          </div>
          <p className="text-xs text-text-tertiary">SSM-201901044079</p>
        </div>
      </div>
    </footer>
  )
}
