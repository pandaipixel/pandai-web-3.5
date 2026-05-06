'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, navCTA } from '@/content/nav'

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="opacity-60">
      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type NavLinkProps = { label: string; href: string; hoverBg: string; hoverText: string }

function NavLink({ label, href, hoverBg, hoverText }: NavLinkProps) {
  const [hovered, setHovered] = useState(false)
  const textColor = hovered ? (hoverText === 'dark' ? '#1a1a1a' : '#ffffff') : '#475569'

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
      style={{ backgroundColor: hovered ? hoverBg : 'transparent', color: textColor }}
    >
      {label}
      <ChevronDown />
    </Link>
  )
}

function MobileNavLink({ label, href, hoverBg, hoverText }: NavLinkProps & { onClick?: () => void }) {
  const [active, setActive] = useState(false)
  const textColor = active ? (hoverText === 'dark' ? '#1a1a1a' : '#ffffff') : '#475569'

  return (
    <Link
      href={href}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setActive(false)}
      className="flex items-center justify-between py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200"
      style={{ backgroundColor: active ? hoverBg : 'transparent', color: textColor }}
    >
      {label}
      <ChevronDown />
    </Link>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Pill container */}
        <div
          className="flex items-center rounded-full bg-white px-4 py-2.5 lg:px-6"
          style={{ border: '1px solid #00cc85' }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image src="/images/logo-normal.svg" alt="Pandai" width={110} height={26} priority />
          </Link>

          {/* Desktop Nav + CTAs — grouped on the right */}
          <div className="hidden lg:flex items-center gap-0.5 ml-auto">
            <nav className="flex items-center gap-0.5">
              {navLinks.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </nav>

            {/* CTA buttons */}
            <div className="flex items-center gap-2 ml-3">
            <Link
              href={navCTA.signIn.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2 rounded-full border text-sm font-semibold transition-all duration-150 hover:bg-surface-secondary"
              style={{ borderColor: '#00cc85', color: '#00cc85' }}
            >
              {navCTA.signIn.label}
            </Link>
            <Link
              href={navCTA.signUp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2 rounded-full text-white text-sm font-semibold transition-colors duration-150"
              style={{ backgroundColor: '#00cc85' }}
            >
              {navCTA.signUp.label}
            </Link>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 ml-auto"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block w-5 h-0.5 bg-text-primary origin-center" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-0.5 bg-text-primary" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block w-5 h-0.5 bg-text-primary origin-center" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-7xl mx-auto overflow-hidden"
          >
            <div className="mt-2 rounded-2xl bg-white border border-border-default shadow-lg px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <MobileNavLink
                  key={link.href}
                  {...link}
                  onClick={() => setMenuOpen(false)}
                />
              ))}
              <div className="flex gap-2 mt-2 justify-end">
                <Link
                  href={navCTA.signIn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-5 py-2.5 rounded-full border font-semibold text-sm"
                  style={{ borderColor: '#00cc85', color: '#00cc85' }}
                >
                  {navCTA.signIn.label}
                </Link>
                <Link
                  href={navCTA.signUp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-5 py-2.5 rounded-full text-white font-semibold text-sm"
                  style={{ backgroundColor: '#00cc85' }}
                >
                  {navCTA.signUp.label}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
