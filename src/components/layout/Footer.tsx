import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-surface-inverse text-text-inverse py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
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
          </div>

          {[
            {
              title: 'Product',
              links: ['Students', 'Teachers', 'Parents', 'Pricing'],
            },
            {
              title: 'Company',
              links: ['About', 'Blog', 'Careers', 'Press'],
            },
            {
              title: 'Support',
              links: ['Help Center', 'Contact', 'Privacy Policy', 'Terms'],
            },
          ].map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold mb-4">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-text-tertiary hover:text-text-inverse transition-colors"
                    >
                      {link}
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
          <p className="text-xs text-text-tertiary">SSM-201901044079</p>
        </div>
      </div>
    </footer>
  )
}
