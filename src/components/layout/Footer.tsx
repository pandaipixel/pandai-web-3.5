import Link from 'next/link'
import Image from 'next/image'
import { footerLinks, footerLegal } from '@/content/nav'

export default function Footer() {
  return (
    <footer className="bg-surface-inverse text-text-inverse py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <Image src="/images/logo-white.svg" alt="Pandai" width={120} height={29} />
            </div>
            <p className="text-sm text-text-tertiary leading-relaxed">
              Malaysia&apos;s #1 online learning app for school students.
            </p>
            <p className="text-xs text-text-tertiary mt-3">
              Transforming learning space with technology.
            </p>
          </div>

          {footerLinks.map((col) => (
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
          <p className="text-xs text-text-tertiary">{footerLegal.copyright}</p>
          <div className="flex items-center gap-6">
            {footerLegal.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-text-tertiary hover:text-text-inverse transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-text-tertiary">{footerLegal.ssm}</p>
        </div>
      </div>
    </footer>
  )
}
