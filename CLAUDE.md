# CLAUDE.md — Pandai Web 3.5 Redevelopment Guide
> **Homepage-first redevelopment of `my.pandai.org` from Framer → Next.js**
> Repository: https://github.com/pandaipixel/pandai-web-3.5

---

## How to Use This File

Import this file into a Claude Code session. Claude will:
- Execute all bash/terminal commands **automatically without asking for confirmation**
- Only **pause and ask for confirmation before any `git commit` or `git push`**
- Guide you step-by-step through each phase in order
- Never skip a phase unless explicitly told to

---

## Project Context

- **Site:** `my.pandai.org` — Pandai's public marketing/landing site
- **From:** Framer (hosted)
- **To:** Next.js 14 (App Router) + Tailwind CSS + Framer Motion, self-hosted on Cloudflare Pages
- **Design source of truth:** Figma DS 1.5 (`TLVKe3bgJTdVvuPAzgDq2f`)
- **Current repo state:** Vite + React scaffold, `node_modules` and `dist` committed — needs full cleanup before migration
- **Stack decision:** TypeScript, Next.js App Router, Tailwind CSS v3, Framer Motion v11, ESLint + Prettier

---

## Rules for Claude

1. **Run all bash commands automatically** — do not ask "should I run this?" Just run it.
2. **Only confirm before git commits** — show the proposed commit message and changed files, then wait.
3. **Work phase by phase** — complete each phase fully before moving to the next.
4. **Preserve design fidelity** — every component decision should reference Pandai DS 1.5 tokens.
5. **No placeholder content** — if real copy or assets aren't available, flag it rather than invent it.
6. **TypeScript strict mode** — all new files are `.tsx` or `.ts`, no `.js` files in `src/`.

---

## Phase 0 — Repo Cleanup

**Goal:** Strip the existing Vite scaffold and all committed build artifacts. Leave a clean git history starting point.

### Steps

**0.1 — Clone the repo locally (if not already)**
```bash
git clone https://github.com/pandaipixel/pandai-web-3.5.git
cd pandai-web-3.5
```

**0.2 — Remove committed `node_modules` and `dist` from git tracking**
```bash
git rm -r --cached node_modules
git rm -r --cached dist
```

**0.3 — Create a proper `.gitignore` immediately**

Create `.gitignore` at repo root with this content:
```
# Dependencies
node_modules/
.pnp
.pnp.js

# Build outputs
dist/
.next/
out/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Misc
.DS_Store
*.pem
Thumbs.db

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# TypeScript
*.tsbuildinfo
next-env.d.ts

# Vercel / Cloudflare
.vercel
.wrangler

# Editor
.vscode/settings.json
.idea/
```

**0.4 — Remove all old Vite scaffold files**
```bash
rm -f index.html
rm -f vite.config.js
rm -f package.json
rm -f package-lock.json
rm -rf src/
rm -rf dist/
rm -rf node_modules/
rm -rf .github/workflows/
```

**0.5 — Confirm cleanup**
```bash
ls -la
```
Expected: only `.git/`, `.gitignore`, `README.md` remain.

> ⏸️ **GIT CHECKPOINT — Claude will pause here.**
> Proposed commit: `chore: clean repo — remove Vite scaffold, node_modules, dist, add .gitignore`

---

## Phase 1 — Next.js Project Setup

**Goal:** Initialize a fresh Next.js 14 project in the repo with the correct configuration.

### Steps

**1.1 — Initialize Next.js with TypeScript, Tailwind, ESLint, App Router**
```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-git
```
> When prompted, accept all defaults. The `--no-git` flag prevents it from reinitializing git.

**1.2 — Install Framer Motion**
```bash
npm install framer-motion
```

**1.3 — Install additional dependencies**
```bash
npm install clsx tailwind-merge
npm install @next/font
npm install -D prettier prettier-plugin-tailwindcss
```

**1.4 — Verify the install**
```bash
npm run dev &
sleep 5 && curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
kill %1
```
Expected: `200`

> ⏸️ **GIT CHECKPOINT — Claude will pause here.**
> Proposed commit: `feat: initialize Next.js 14 with TypeScript, Tailwind, Framer Motion`

---

## Phase 2 — Design System Token Setup

**Goal:** Map Pandai DS 1.5 Figma variables into Tailwind config and CSS custom properties. These tokens are the single source of truth — no hardcoded hex values anywhere in component code.

### Steps

**2.1 — Create the CSS variables file**

Create `src/styles/tokens.css`:
```css
/* ============================================
   PANDAI DESIGN SYSTEM 1.5 — CSS TOKENS
   Source: Figma DS 1.5 (TLVKe3bgJTdVvuPAzgDq2f)
   ============================================ */

:root {
  /* --- Brand / Atomic Colors --- */
  --color-brand-green: #22c55e;
  --color-brand-green-dark: #16a34a;
  --color-brand-green-light: #86efac;
  --color-brand-blue: #3b82f6;
  --color-brand-purple: #a855f7;
  --color-brand-yellow: #eab308;
  --color-brand-orange: #f97316;
  --color-brand-red: #ef4444;

  /* --- Semantic Colors --- */
  --color-surface-primary: #ffffff;
  --color-surface-secondary: #f8fafc;
  --color-surface-tertiary: #f1f5f9;
  --color-surface-inverse: #0f172a;

  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-text-tertiary: #94a3b8;
  --color-text-inverse: #ffffff;
  --color-text-brand: #16a34a;

  --color-border-default: #e2e8f0;
  --color-border-strong: #cbd5e1;
  --color-border-brand: #22c55e;

  /* --- Typography (Poppins) --- */
  --font-family-base: 'Poppins', sans-serif;

  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-md: 1.125rem;   /* 18px */
  --font-size-lg: 1.25rem;    /* 20px */
  --font-size-xl: 1.5rem;     /* 24px */
  --font-size-2xl: 2rem;      /* 32px */
  --font-size-3xl: 2.5rem;    /* 40px */
  --font-size-4xl: 3rem;      /* 48px */
  --font-size-5xl: 3.75rem;   /* 60px */

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.2;
  --line-height-snug: 1.35;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.65;

  /* --- Spacing --- */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */

  /* --- Border Radius --- */
  --radius-sm: 0.375rem;   /* 6px */
  --radius-md: 0.5rem;     /* 8px */
  --radius-lg: 0.75rem;    /* 12px */
  --radius-xl: 1rem;       /* 16px */
  --radius-2xl: 1.5rem;    /* 24px */
  --radius-full: 9999px;

  /* --- Shadows (Elevation) --- */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
  --shadow-brand: 0 8px 24px rgba(34, 197, 94, 0.25);

  /* --- Transitions --- */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
}
```

**2.2 — Update `tailwind.config.ts` to use the tokens**

Replace the default Tailwind config with:
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: 'var(--color-brand-green)',
          'green-dark': 'var(--color-brand-green-dark)',
          'green-light': 'var(--color-brand-green-light)',
          blue: 'var(--color-brand-blue)',
          purple: 'var(--color-brand-purple)',
          yellow: 'var(--color-brand-yellow)',
          orange: 'var(--color-brand-orange)',
          red: 'var(--color-brand-red)',
        },
        surface: {
          primary: 'var(--color-surface-primary)',
          secondary: 'var(--color-surface-secondary)',
          tertiary: 'var(--color-surface-tertiary)',
          inverse: 'var(--color-surface-inverse)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          inverse: 'var(--color-text-inverse)',
          brand: 'var(--color-text-brand)',
        },
        border: {
          default: 'var(--color-border-default)',
          strong: 'var(--color-border-strong)',
          brand: 'var(--color-border-brand)',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        brand: 'var(--shadow-brand)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
    },
  },
  plugins: [],
}

export default config
```

**2.3 — Set up Poppins font and import tokens in global CSS**

Update `src/app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
@import '../styles/tokens.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: var(--font-family-base);
    color: var(--color-text-primary);
    background-color: var(--color-surface-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }
}
```

**2.4 — Create a utility helper for class merging**

Create `src/lib/utils.ts`:
```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**2.5 — Create the shared animation variants file**

Create `src/lib/animations.ts`:
```ts
import type { Variants } from 'framer-motion'

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

export const cardHover = {
  rest: { scale: 1, boxShadow: 'var(--shadow-md)' },
  hover: {
    scale: 1.02,
    boxShadow: 'var(--shadow-xl)',
    transition: { duration: 0.25, ease: 'easeOut' },
  },
}
```

> ⏸️ **GIT CHECKPOINT — Claude will pause here.**
> Proposed commit: `feat: add design system tokens, tailwind config, Poppins font, animation variants`

---

## Phase 3 — Project Structure Scaffold

**Goal:** Create the full folder structure for the homepage build before writing any component code.

### Steps

**3.1 — Create the directory structure**
```bash
mkdir -p src/app/(marketing)
mkdir -p src/components/ui
mkdir -p src/components/layout
mkdir -p src/components/sections/home
mkdir -p src/components/shared
mkdir -p src/assets/images
mkdir -p src/assets/icons
mkdir -p src/lib
mkdir -p src/styles
mkdir -p public/images
```

**3.2 — Create placeholder index files for components**
```bash
touch src/components/ui/index.ts
touch src/components/layout/index.ts
touch src/components/sections/home/index.ts
```

**3.3 — Update `src/app/layout.tsx` root layout**

Replace with:
```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pandai — Malaysia\'s #1 Online Learning App',
  description: 'Score A and improve grades with Pandai. Game-like quizzes, tests, flashcards, notes, and live tuition for Malaysian school students.',
  keywords: 'pandai, online learning, malaysia, school, quiz, SPM, UPSR, PT3',
  openGraph: {
    title: 'Pandai — Malaysia\'s #1 Online Learning App',
    description: 'Score A and improve grades with Pandai.',
    url: 'https://my.pandai.org',
    siteName: 'Pandai',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_MY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pandai — Malaysia\'s #1 Online Learning App',
    description: 'Score A and improve grades with Pandai.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
```

**3.4 — Create the marketing route group layout**

Create `src/app/(marketing)/layout.tsx`:
```tsx
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

**3.5 — Create the homepage route**

Create `src/app/(marketing)/page.tsx`:
```tsx
// Homepage sections — built phase by phase
// Each section is imported here once built

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Sections will be imported here in Phase 4 */}
      <div className="flex items-center justify-center h-screen text-text-secondary">
        <p className="font-sans text-lg">Pandai Web 3.5 — In Development</p>
      </div>
    </div>
  )
}
```

**3.6 — Run dev server to confirm clean boot**
```bash
npm run dev
```
> Verify no TypeScript or import errors. Then stop the server and continue.

> ⏸️ **GIT CHECKPOINT — Claude will pause here.**
> Proposed commit: `feat: scaffold project structure, root layout, marketing route group`

---

## Phase 4 — Layout Components (Navbar + Footer)

**Goal:** Build `Navbar` and `Footer` using DS 1.5 tokens. These must be pixel-accurate to the live site.

### Reference
Before building, Claude should:
1. Visit `https://my.pandai.org` and take note of the navbar structure
2. Reference the DS 1.5 Figma file for NavBar Dropdown Button 1.5 component (`TLVKe3bgJTdVvuPAzgDq2f`)

### Steps

**4.1 — Build the Navbar component**

Create `src/components/layout/Navbar.tsx`:

The Navbar must include:
- Pandai logo (SVG, links to `/`)
- Navigation links: Students, Teachers, Parents, Blog
- CTA button: "Download App" (uses Button 1.5 DS component, brand green)
- Mobile hamburger menu with animated drawer (Framer Motion)
- Sticky on scroll with backdrop blur + border on scroll
- Transparent on top, white + shadow after 64px scroll

```tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Students', href: '/students' },
  { label: 'Teachers', href: '/teachers' },
  { label: 'Parents', href: '/parents' },
  { label: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 64)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border-default'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            {/* Replace with actual Pandai SVG logo */}
            <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-xl text-text-primary font-sans">pandai</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="https://app.pandai.org/app/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold transition-colors duration-150 shadow-brand"
            >
              Get Started Free
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-text-primary origin-center transition-colors"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-text-primary"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-text-primary origin-center"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-white border-t border-border-default"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 px-4 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-secondary font-medium text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="https://app.pandai.org/app/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center px-5 py-3 rounded-full bg-brand-green text-white font-semibold text-sm"
              >
                Get Started Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
```

**4.2 — Build a placeholder Footer**

Create `src/components/layout/Footer.tsx`:
```tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-surface-inverse text-text-inverse py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-bold text-xl">pandai</span>
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
```

**4.3 — Export from layout index**

Update `src/components/layout/index.ts`:
```ts
export { default as Navbar } from './Navbar'
export { default as Footer } from './Footer'
```

> ⏸️ **GIT CHECKPOINT — Claude will pause here.**
> Proposed commit: `feat: build Navbar and Footer layout components with DS tokens`

---

## Phase 5 — Homepage Sections

**Goal:** Build the homepage section by section. Each section is a self-contained component under `src/components/sections/home/`.

### Section Build Order
1. `HeroSection` — headline, subtext, CTA buttons, hero image/graphic
2. `StatsSection` — 1M+ students, subject coverage, etc.
3. `FeaturesSection` — key product features with icons
4. `HowItWorksSection` — step-by-step process
5. `TestimonialsSection` — student testimonials/reviews
6. `AppDownloadSection` — App Store / Play Store CTAs
7. `FAQSection` — frequently asked questions

### Per-Section Build Process

For **each** section, Claude must:

**Step A — Gather design reference**
- Ask: "Do you have a screenshot of this section from the Framer site, or should I pull from the live site?"
- If live site reference needed: review `https://my.pandai.org` for the section layout
- Identify: layout grid, typography scale, colors (map to DS tokens), animation behavior

**Step B — Build the component**
- All animations use `framer-motion` with `whileInView={{ visible: true }}` + `viewport={{ once: true, margin: '-80px' }}`
- Use `staggerContainer` and `fadeInUp` from `@/lib/animations`
- No hardcoded colors — only Tailwind token classes
- Mobile-first responsive: `flex-col` on mobile, grid on desktop

**Step C — Import into page**
- Add the section to `src/app/(marketing)/page.tsx`
- Test on dev server

---

### 5.1 — HeroSection

Create `src/components/sections/home/HeroSection.tsx`:
```tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-br from-surface-primary via-surface-secondary to-surface-primary">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 text-text-brand text-sm font-semibold mb-6">
                🏆 Malaysia&apos;s #1 Learning App
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6"
            >
              Score{' '}
              <span className="text-brand-green">better grades</span>{' '}
              with Pandai
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-text-secondary leading-relaxed mb-8 max-w-lg"
            >
              Game-like quizzes, live tuition, flashcards, and AI-powered study tools — everything your child needs to excel in school.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="https://app.pandai.org/app/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-base transition-all duration-200 shadow-brand hover:shadow-xl"
              >
                Start Learning Free
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-border-strong hover:border-brand-green text-text-primary hover:text-brand-green font-semibold text-base transition-all duration-200"
              >
                See How It Works
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-brand-green/20 border-2 border-white flex items-center justify-center text-xs font-bold text-text-brand"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-text-secondary">
                <span className="font-bold text-text-primary">1,000,000+</span>{' '}
                students already learning
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Hero Visual */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center"
          >
            {/* 
              PLACEHOLDER — Replace with actual hero image or Lottie animation
              Recommended: app screenshot mockup or 3D illustration from Framer
            */}
            <div className="w-full max-w-md aspect-square rounded-3xl bg-gradient-to-br from-brand-green/20 to-brand-blue/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-text-secondary font-medium">Hero Visual Placeholder</p>
                <p className="text-xs text-text-tertiary mt-1">Replace with app mockup</p>
              </div>
            </div>

            {/* Floating badge cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-brand-yellow/20 flex items-center justify-center text-lg">⭐</div>
              <div>
                <p className="text-xs font-bold text-text-primary">4.8 Rating</p>
                <p className="text-xs text-text-tertiary">App Store</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center text-lg">🎯</div>
              <div>
                <p className="text-xs font-bold text-text-primary">Score Improved</p>
                <p className="text-xs text-text-tertiary">+40% avg. grade lift</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

**5.2 — StatsSection**

Create `src/components/sections/home/StatsSection.tsx` with animated counters for key metrics (1M+ students, subjects covered, questions bank, satisfaction rate). Use `useInView` from framer-motion to trigger count-up animation when scrolled into view.

**5.3 — FeaturesSection**

Create `src/components/sections/home/FeaturesSection.tsx` with a grid of feature cards. Each card uses DS 1.5 Label Badges and icon illustration.

**5.4 — Continue remaining sections**

Follow the same pattern for `HowItWorksSection`, `TestimonialsSection`, `AppDownloadSection`, `FAQSection`.

> ⏸️ **GIT CHECKPOINT after all homepage sections are built.**
> Proposed commit: `feat: build all homepage sections — hero, stats, features, testimonials, download CTA`

---

## Phase 6 — Cloudflare Pages Deployment Setup

**Goal:** Configure the repo for Cloudflare Pages deployment with CI/CD on `git push`.

### Steps

**6.1 — Add Cloudflare-specific Next.js config**

Update `next.config.ts`:
```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export', // Static export for Cloudflare Pages
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
}

export default nextConfig
```

> ⚠️ Note: `output: 'export'` disables server-side features. If SSR/ISR is needed later, switch to Cloudflare Workers with `@cloudflare/next-on-pages` adapter.

**6.2 — Add build script for Cloudflare**

Update `package.json` scripts:
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "export": "next build"
}
```

**6.3 — Create Cloudflare Pages config**

Create `wrangler.toml`:
```toml
name = "pandai-web"
compatibility_date = "2024-01-01"

[site]
bucket = "./out"
```

**6.4 — GitHub Actions CI workflow**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: pandai-web
          directory: out
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

**6.5 — Cloudflare Pages setup (manual step — Claude will instruct)**

Claude will guide through:
1. Log into Cloudflare Dashboard → Pages → Create Project
2. Connect GitHub → select `pandaipixel/pandai-web-3.5`
3. Build settings: Framework = Next.js (Static), Build command = `npm run build`, Output = `out`
4. Add secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
5. Custom domain: point `my.pandai.org` DNS to Cloudflare Pages

> ⏸️ **GIT CHECKPOINT — Claude will pause here.**
> Proposed commit: `feat: configure Cloudflare Pages deployment, GitHub Actions CI`

---

## Phase 7 — Asset Migration from Framer

**Goal:** Replace all placeholder assets with real Pandai brand assets.

### Checklist

- [ ] Pandai logo SVG (primary + white variant)
- [ ] App screenshots / hero mockup images
- [ ] Feature section illustrations or icons
- [ ] Testimonial avatars
- [ ] OG image (`public/og-image.png`, 1200×630px)
- [ ] Favicon set (`public/favicon.ico`, `public/apple-touch-icon.png`)

### Process per asset

1. Export from Figma DS 1.5 or Framer
2. Optimize: SVGs via SVGO, PNGs via Squoosh (target < 200KB for images)
3. Place in `public/images/` or `src/assets/`
4. Update component references

> ⏸️ **GIT CHECKPOINT after all assets replaced.**
> Proposed commit: `feat: replace placeholder assets with production Pandai brand assets`

---

## Phase 8 — Polish & QA

**Goal:** Pre-launch quality pass before pointing DNS.

### QA Checklist

**Responsive**
- [ ] Mobile (375px) — all sections stack correctly
- [ ] Tablet (768px) — grid transitions work
- [ ] Desktop (1280px+) — max-width container correct

**Performance**
- [ ] Run `npm run build` — no TypeScript errors
- [ ] Lighthouse score target: Performance ≥ 90, Accessibility ≥ 95
- [ ] All images have `alt` attributes
- [ ] Fonts loaded with `display=swap`

**Animations**
- [ ] All scroll animations trigger correctly with `once: true`
- [ ] Reduced motion respected: add `@media (prefers-reduced-motion)` guard
- [ ] No janky/laggy transitions on mobile

**SEO**
- [ ] `metadata` correct in `layout.tsx`
- [ ] OG image renders correctly (test with og:image debugger)
- [ ] No broken links

**Accessibility**
- [ ] All interactive elements have focus states
- [ ] Color contrast passes WCAG AA
- [ ] Keyboard navigation works for navbar

> ⏸️ **GIT CHECKPOINT after QA pass.**
> Proposed commit: `fix: QA pass — responsive, a11y, performance polish`

---

## Phase 9 — DNS Cutover

**Goal:** Switch `my.pandai.org` from Framer to Cloudflare Pages.

### Steps

1. Confirm Cloudflare Pages preview deploy is working at the `.pages.dev` URL
2. In your DNS provider (or Cloudflare DNS):
   - Remove existing Framer CNAME for `my.pandai.org`
   - Add Cloudflare Pages CNAME: `my.pandai.org` → `pandai-web.pages.dev`
3. Cloudflare handles SSL automatically
4. TTL: set to 1 minute before cutover, restore to 1 hour after
5. Monitor for 30 minutes post-cutover

> ⚠️ Keep Framer subscription active for 1 billing cycle post-cutover as a rollback option.

---

## Quick Reference

### Key Commands
```bash
npm run dev          # Start local dev server (http://localhost:3000)
npm run build        # Production build + type check
npm run lint         # ESLint check
```

### Key File Locations
```
src/app/(marketing)/page.tsx        — Homepage
src/components/sections/home/       — Homepage sections
src/components/layout/              — Navbar, Footer
src/components/ui/                  — Reusable UI primitives
src/lib/animations.ts               — Framer Motion variants
src/styles/tokens.css               — DS 1.5 CSS custom properties
tailwind.config.ts                  — Tailwind token mapping
public/                             — Static assets
```

### DS 1.5 Figma Reference
- File Key: `TLVKe3bgJTdVvuPAzgDq2f`
- Known working component pages: Button 1.5, Label Badges 1.5, Progress Bar 1.5, Avatar 1.5, Divider 1.5, NavBar Dropdown Button 1.5

### Git Commit Convention
```
feat: new feature or component
fix: bug fix or correction
chore: tooling, config, deps
style: visual/CSS changes only
refactor: code restructure, no behavior change
docs: documentation changes
```

---

*Last updated: May 2026 | pandai-web-3.5 | Rai @ Pandai*
