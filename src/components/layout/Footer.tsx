import Link from 'next/link'
import Image from 'next/image'
import {
  footerBrand,
  footerAcademic,
  footerExamPrep,
  footerCompetition,
  footerFeatures,
  footerCompany,
  footerLegal,
} from '@/content/nav'

// ── Social icons (inline SVG — no extra dependency) ──────────────────────────
function SocialIcon({ platform }: { platform: string }) {
  const cls = 'w-5 h-5'
  if (platform === 'facebook') return (
    <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
  if (platform === 'instagram') return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
  if (platform === 'twitter') return (
    <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
  if (platform === 'youtube') return (
    <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.965C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.965A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1a1a1a"/>
    </svg>
  )
  if (platform === 'tiktok') return (
    <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.26 8.26 0 0 0 4.84 1.56V6.79a4.85 4.85 0 0 1-1.07-.1z"/>
    </svg>
  )
  if (platform === 'discord') return (
    <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  )
  return null
}

// ── Reusable link style ───────────────────────────────────────────────────────
function FooterLink({ label, href, highlight = false }: { label: string; href: string; highlight?: boolean }) {
  return (
    <Link
      href={href}
      className="text-sm transition-colors duration-150 hover:!text-[#00cc85]"
      style={{ color: highlight ? '#00cc85' : '#666666' }}
    >
      {label}
    </Link>
  )
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-white font-semibold text-sm mb-4">{children}</h3>
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1a1a1a' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1.2fr_1fr_1fr] gap-10 lg:gap-8 mb-12">

          {/* ── Col 1: Brand ── */}
          <div className="flex flex-col gap-4">
            <Image src="/images/logo-white.svg" alt="Pandai" width={120} height={29} />

            <p className="text-sm leading-relaxed" style={{ color: '#999999' }}>
              {footerBrand.description}
            </p>

            <div>
              <p className="text-sm font-semibold" style={{ color: '#666666' }}>{footerBrand.company}</p>
              <p className="text-sm font-semibold" style={{ color: '#00cc85' }}>{footerBrand.ssm}</p>
            </div>

            <p className="text-sm" style={{ color: '#666666' }}>{footerBrand.address}</p>
            <p className="text-sm" style={{ color: '#666666' }}>{footerBrand.phone}</p>

            {/* Social icons — update hrefs in content/nav.ts → footerBrand.socials */}
            <div className="flex items-center gap-4 mt-1">
              {footerBrand.socials.map((s) => (
                <Link
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="transition-opacity duration-150 hover:opacity-70"
                  style={{ color: '#00cc85' }}
                >
                  <SocialIcon platform={s.platform} />
                </Link>
              ))}
            </div>
          </div>

          {/* ── Col 2: Academic + Exam + Competition ── */}
          <div className="flex flex-col gap-8">

            {/* Academic Content */}
            <div>
              <FooterHeading>{footerAcademic.heading}</FooterHeading>
              <div className="flex flex-col gap-2">
                {footerAcademic.rows.map((row, i) => (
                  <div key={i} className="flex items-center gap-1 flex-wrap">
                    {row.map((item, j) => (
                      <span key={item.label} className="flex items-center gap-1">
                        <FooterLink label={item.label} href={item.href} />
                        {j < row.length - 1 && <span style={{ color: '#444444' }}>|</span>}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Preparation */}
            <div>
              <FooterHeading>{footerExamPrep.heading}</FooterHeading>
              <div className="flex flex-col gap-2">
                {footerExamPrep.links.map((link) => (
                  <FooterLink key={link.label} label={link.label} href={link.href} highlight={link.highlight} />
                ))}
              </div>
            </div>

            {/* Competition Preparation */}
            <div>
              <FooterHeading>{footerCompetition.heading}</FooterHeading>
              <div className="flex flex-col gap-2">
                {footerCompetition.links.map((link) => (
                  <FooterLink key={link.label} label={link.label} href={link.href} />
                ))}
              </div>
            </div>

          </div>

          {/* ── Col 3: Features ── */}
          <div className="flex flex-col gap-2">
            {footerFeatures.links.map((link) => (
              <FooterLink key={link.label} label={link.label} href={link.href} />
            ))}
          </div>

          {/* ── Col 4: Platform / Company / Support ── */}
          <div className="flex flex-col gap-8">

            <div className="flex flex-col gap-2">
              {footerCompany.platform.map((link) => (
                <FooterLink key={link.label} label={link.label} href={link.href} />
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {footerCompany.company.map((link) => (
                <FooterLink key={link.label} label={link.label} href={link.href} />
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {footerCompany.support.map((link) => (
                <FooterLink key={link.label} label={link.label} href={link.href} />
              ))}
            </div>

          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-sm" style={{ color: '#666666' }}>{footerLegal.copyright}</p>

          <div className="flex items-center gap-1">
            {footerLegal.links.map((link, i) => (
              <span key={link.label} className="flex items-center gap-1">
                <Link
                  href={link.href}
                  className="text-sm transition-opacity hover:opacity-70"
                  style={{ color: '#00cc85' }}
                >
                  {link.label}
                </Link>
                {i < footerLegal.links.length - 1 && (
                  <span className="text-sm" style={{ color: '#444444' }}>•</span>
                )}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
