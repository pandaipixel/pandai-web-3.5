# Pandai Web 3.5 — Master Development Log

> **Project:** my.pandai.org homepage rebuild · Framer → Next.js 14  
> **Repo:** https://github.com/pandaipixel/pandai-web-3.5  
> **Deployment:** Cloudflare Pages (auto-deploy on push to `main`)  
> **Design source:** Figma DS 1.5 — file key `TLVKe3bgJTdVvuPAzgDq2f`  
> **Last updated:** 2026-05-06

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript strict) |
| Styling | Tailwind CSS v4 + CSS custom properties (tokens.css) |
| Animations | Framer Motion v11 |
| Font | **Poppins only** (400/500/600/700/800) — enforced on `html, body` and `*` |
| Deployment | Cloudflare Pages — static export (`output: 'export'`) |
| Branch flow | develop on `staging` → merge to `main` → Cloudflare auto-deploys |

---

## Repo Structure

```
src/
├── app/
│   ├── layout.tsx                   # Root layout — metadata, Poppins, globals.css
│   ├── globals.css                  # @import tokens.css + Tailwind + base resets
│   └── (marketing)/
│       ├── layout.tsx               # Marketing layout — Navbar + main + Footer
│       └── page.tsx                 # Homepage — imports all sections in order
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx               # Sticky navbar, colored pill hover, mobile drawer
│   │   └── Footer.tsx               # Dark footer, 5 link columns + social icons
│   └── sections/home/
│       ├── HeroSection.tsx          # Hero — headline, trust badges, student image
│       ├── TaglineSection.tsx        # Tagline card — two-tone bg, bookmark ribbon
│       └── TestimonialsSection.tsx   # Testimonials — live count heading, 2×2 cards, rating pills
│
├── content/                         # ✏️ ALL editable copy lives here — never edit components directly
│   ├── home.ts                      # Hero, tagline, testimonials, stats, features, FAQ, app download
│   ├── nav.ts                       # Navbar links + CTA + full footer content
│   ├── students.ts                  # (placeholder)
│   ├── teachers.ts                  # (placeholder)
│   ├── parents.ts                   # (placeholder)
│   └── about.ts                     # (placeholder)
│
├── lib/
│   ├── animations.ts                # Framer Motion variants (fadeInUp, staggerContainer, scaleIn…)
│   ├── usePandaiCount.ts            # Hook — fetches live user/question counts from pandai.org/count/
│   └── utils.ts                     # cn() helper (clsx + tailwind-merge)
│
└── styles/
    └── tokens.css                   # Pandai DS 1.5 CSS custom properties (colors, radii, shadows…)

public/images/
    hero-student.png                 # Hero right-side student photo
    avatar-{ain,ezran,hafizah,irfan}.png   # Testimonial avatars
    badge-{moe,finland,personalized}.png   # Trust badges (hero)
    badge-1.svg / badge-2.svg        # App Store / Play Store download badges
    logo-normal.svg / logo-white.svg # Pandai logos
    bg-left.png / bg-right.png       # Background decoration assets
    testimonial-bg.jpeg              # (unused — replaced by Cloudflare Images URL)
```

---

## Design System Tokens (Key Colors)

All tokens are in `src/styles/tokens.css`. Never hardcode hex values in components — use these.

| Token | Hex | Usage |
|---|---|---|
| OG-Green/50 | `#e9fbf5` | Section backgrounds, card light bg |
| OG-Green/100 | `#ccf5e7` | Tagline card background left strip |
| OG-Green/200 | `#99ebce` | Borders, dividers |
| OG-Green/300 | `#66e0b6` | Tagline card border |
| OG-Green/500 | `#00cc85` | Primary brand green — CTAs, names, highlights |
| OG-Green/700 | `#007a50` | Bookmark ribbon right half |
| `#1a1a1a` | — | Body text (near-black) |
| `#374151` | — | Quote/secondary text |
| `#6b7280` | — | Tertiary/label text |
| `#F5A623` | — | Star rating gold |

---

## Sections Built

### ✅ Navbar (`src/components/layout/Navbar.tsx`)
- Sticky, transparent → white + shadow after 64px scroll
- Logo left, nav links center-left, Sign In + Sign Up CTAs right (`ml-auto`)
- Per-link colored hover pills: Students=green, Parents=yellow, Teachers=pink, About=green
- Mobile: hamburger → animated drawer with same colored pills
- Content: `src/content/nav.ts` → `navLinks`, `navCTA`

### ✅ Footer (`src/components/layout/Footer.tsx`)
- Dark background `#1a1a1a`, 5 content columns + brand column
- Link hover: gray → `#00cc85` green
- Inline SVG social icons (Facebook, Instagram, X, YouTube, TikTok, Discord) in green
- Content: `src/content/nav.ts` → `footerBrand`, `footerAcademic`, `footerExamPrep`, `footerCompetition`, `footerFeatures`, `footerCompany`, `footerLegal`

### ✅ HeroSection (`src/components/sections/home/HeroSection.tsx`)
- `max-w-5xl` container, `px-4 sm:px-6 lg:px-8 py-8`, `pt-24` for navbar offset
- Headline from `hero.headlineLines[]` — green, responsive: 41px/50px/60px
- Trust badges row from `hero.trustBadges[]`
- Right side: student photo from `hero.visual.student`
- Mobile stacked, desktop 2-col grid
- Content: `src/content/home.ts` → `hero`

### ✅ TaglineSection (`src/components/sections/home/TaglineSection.tsx`)
- `max-w-5xl` container — matches testimonials width
- Card: two-tone background (left 3.5% `#CCFFCC`, right `#F2FFF2`), hard stop (no gradient blend)
- Border: `2px solid #66e0b6` (OG-Green/300)
- Bookmark ribbon: absolute, top-left, `#00CC85`, V-notch clip-path
- Content: `src/content/home.ts` → `tagline.text`

### ✅ TestimonialsSection (`src/components/sections/home/TestimonialsSection.tsx`)
- Outer frame: rounded-3xl, `2px solid #99ebce` border, background image from Cloudflare Images
  - BG image URL: `https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/7f059ac0-95c3-4213-59e9-c5cbf1160e00/1024px`
- **Dynamic heading**: fetches live `users` + `questions` from `https://pandai.org/count/` via `usePandaiCount` hook; falls back to `878,501` / `722,682,777` on CORS error
- **2×2 testimonial cards**:
  - Top half: `#e8faf0` mint bg, 72px avatar (green border + mint fill), green name, dark role
  - Divider: `1.5px solid #99ebce`
  - Bottom half: white, quote text, 5-star gold rating
- **3 store rating pills** (two-tone):
  - Left half: mint `#e8faf0`, inner border `#99ebce`, platform icon via Cloudflare Images URL
  - Right half: white, large score, half-star-aware stars, label, filled green chevron button
  - Pill shape: `border-radius: 9999px`, `border: 1.5px solid #99ebce`
- Content: `src/content/home.ts` → `testimonialsSection`

**Store rating icon URLs** (stored in `home.ts` → `testimonialsSection.storeRatings[].icon`):
```
Play Store:  https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/0857e4da-2767-43d6-aaa6-e4b2105dc500/64px
App Store:   https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/2ab607db-ef11-44ec-c36e-1087bd643d00/64px
TrustPilot:  https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/543b4257-486b-4300-b714-76b8e6c56600/64px
```

---

## Sections Remaining (Homepage)

Build order — each section follows the same pattern: component in `src/components/sections/home/`, content in `src/content/home.ts`, imported into `src/app/(marketing)/page.tsx`.

| # | Section | Status | Notes |
|---|---|---|---|
| 4 | StatsSection | ⬜ Not started | Animated counters: 1M+ students, 40+ subjects, 500K+ questions, 4.8★ |
| 5 | FeaturesSection | ⬜ Not started | Feature cards grid with icons |
| 6 | HowItWorksSection | ⬜ Not started | Step-by-step numbered process |
| 7 | AppDownloadSection | ⬜ Not started | App Store + Play Store CTAs with app mockup |
| 8 | FAQSection | ⬜ Not started | Accordion, content in `home.ts → faq[]` |

---

## Shared Conventions

### Adding a new section
1. Create `src/components/sections/home/NewSection.tsx` — `'use client'` if using hooks/motion
2. Add all copy/images to `src/content/home.ts` as a named export
3. Export from `src/components/sections/home/index.ts`
4. Import and add to `src/app/(marketing)/page.tsx`

### Section container standard
Every section uses this wrapper for consistent alignment:
```tsx
<section className="w-full px-4 sm:px-6 lg:px-8 py-8">
  <div className="max-w-5xl mx-auto">
    {/* content */}
  </div>
</section>
```

### Animation standard
```tsx
<motion.div
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-60px' }}
>
```
Use `staggerContainer` on the parent when animating a list of children with `fadeInUp`.

### Font rule
**Poppins is the only font.** It is enforced globally in `globals.css`:
```css
html, body { font-family: 'Poppins', sans-serif; }
*, *::before, *::after { font-family: inherit; }
```
Never set `font-family` anywhere else.

### External images
Cloudflare Images URLs are used directly as `<img src="...">` (not Next.js `<Image>`) to avoid remote pattern config. This is fine since `output: 'export'` disables image optimisation anyway.

---

## API Integration

**Live count endpoint:** `https://pandai.org/count/`

Returns:
```json
{ "users": 878501, "questions": 722682777, "quizzess": 86750, "teachers": 92610 }
```

Hook: `src/lib/usePandaiCount.ts` — call it in any client component that needs live counts. Falls back to hardcoded values silently on CORS/network error.

---

## Deployment

- **Cloudflare Pages** auto-deploys on push to `main`
- Build command: `npm run build` → outputs to `out/`
- `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`
- GitHub Actions CI: builds + type-checks on every PR (does not deploy — Cloudflare handles that)

**Workflow:**
```bash
# Work on staging
git checkout staging
# … make changes, test on localhost:3000 …
git add . && git commit -m "feat: ..."
git push origin staging

# Merge to main to deploy
git checkout main && git merge staging && git push origin main
git checkout staging   # return to staging for next task
```

---

## Dev Commands

```bash
npm run dev      # http://localhost:3000
npm run build    # production build + TypeScript check
npm run lint     # ESLint
```

---

## Known Decisions & Context

- `max-w-5xl` is the standard content width for all sections (set to match testimonials frame)
- TaglineSection background uses a hard two-color split (not gradient): `linear-gradient(to right, #CCFFCC 3.5%, #F2FFF2 3.5%)`
- TestimonialsSection background image (`cover`, `center`) is a school-scene illustration from Cloudflare Images
- Stars in testimonial cards = 5 full gold stars; stars in rating pills = half-star-aware (fractional support via SVG `linearGradient`)
- `type` field was removed from `storeRatings` — icon URL is the single source of truth
- `usePandaiCount` uses `users` for student count and `questions` for questions count in the testimonials heading

---

_Maintained by: Rai @ Pandai · azrai@pandai.org_
