# Pandai Web 3.5 — Master Development Log

> **Project:** my.pandai.org homepage rebuild · Framer → Next.js 14  
> **Repo:** https://github.com/pandaipixel/pandai-web-3.5  
> **Deployment:** Cloudflare Pages (auto-deploy on push to `main`)  
> **Design source:** Figma DS 1.5 — file key `TLVKe3bgJTdVvuPAzgDq2f`  
> **Last updated:** 2026-05-08

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
│   ├── icon.svg                     # Favicon — Pandai icon mark (auto-picked by Next.js App Router)
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
│       ├── TestimonialsSection.tsx   # Testimonials — live count heading, 2×2 cards, rating pills
│       ├── FeatureCardsSection.tsx   # 2-col feature cards grid (light + dark themes)
│       ├── AsFeaturedInSection.tsx   # Infinite marquee ticker of 14 media logos
│       └── CompetitionSection.tsx    # Competition image card with CTA button
│
├── content/                         # ✏️ ALL editable copy lives here — never edit components directly
│   ├── home.ts                      # Hero, tagline, testimonials, stats, features, FAQ, app download, asFeaturedIn, competitionSection
│   ├── translations/
│   │   └── home.ts                  # EN + BM strings for every homepage section — add keys here for all new sections
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
- Outer frame: `rounded-3xl`, `2px solid #99ebce` border
- **Background**: two-layer approach — CSS gradient + absolute `<img>`:
  - CSS: `linear-gradient(to bottom, #ffffff 78%, #00cc85 78%)` — white top, brand green bottom
  - Absolute `<img>` (`zIndex: 1`, `object-fit: contain`) layered on top of gradient
  - All content at `z-10` to sit above both layers
  - BG image URL: `https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/7f059ac0-95c3-4213-59e9-c5cbf1160e00/1024px`
- **Floating mascot**: absolutely positioned **outside** the `overflow-hidden` frame (sibling div), left edge, `top: 28%`
  - Image URL: `https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/ad44940d-1c50-4b50-0a5b-33ea6f0f3600/1024px`
  - `animate={{ y: [0, -10, 0] }}`, 2.5s loop, hidden on mobile (`hidden sm:block`)
  - Width: 92px, `left: -16px` to overlap the frame's left border
- **Dynamic heading**: fetches live `users` + `questions` from `https://pandai.org/count/` via `usePandaiCount` hook; falls back to `878,501` / `722,682,777` on CORS error
- **2×2 testimonial cards** — constrained to `max-w-2xl mx-auto` (not full-width):
  - Smaller size: 52px avatar, `text-base` name, `text-sm` role, `px-4 py-3` padding, `text-xs` quote, 13px stars
  - Top half: `#e8faf0` mint bg, green border avatar, green name, dark role
  - Divider: `1px solid #99ebce`
  - Bottom half: white, quote text, stars
  - Cards grid uses `animate="visible"` (not `whileInView`) because `overflow: hidden` on the parent breaks Intersection Observer — do NOT use `whileInView` inside `overflow: hidden` containers
- **3 store rating pills** (two-tone, each is a clickable `<motion.a>` opening in new tab):
  - Left half: mint `#e8faf0`, inner border `#99ebce`, platform icon via Cloudflare Images URL
  - Right half: white, large score, half-star-aware stars, label, filled green chevron button
  - Pill shape: `border-radius: 9999px`, `border: 1.5px solid #99ebce`
  - Uses `animate="visible"` instead of `whileInView` for same reason as cards above
- Content: `src/content/home.ts` → `testimonialsSection`

**Store rating assets & links** (all stored in `home.ts` → `testimonialsSection.storeRatings[]`):
| Platform | `icon` | `href` |
|---|---|---|
| Play Store | `…/0857e4da…/64px` | `https://play.google.com/store/apps/details?id=com.pandai.app&showAllReviews=true&pli=1` |
| App Store | `…/2ab607db…/64px` | `https://apps.apple.com/my/app/pandai-practice-for-exam/id1495066585` |
| TrustPilot | `…/543b4257…/64px` | `https://www.trustpilot.com/review/pandai.org` |

---

### ✅ FeatureCardsSection (`src/components/sections/home/FeatureCardsSection.tsx`)
- 2-column grid (`grid-cols-1 sm:grid-cols-2 gap-5`), `max-w-5xl` container
- Each card is the reusable `FeatureCard` UI component (`src/components/ui/FeatureCard.tsx`)
- Both `motion.div` wrappers use `h-full` to pass grid height down to cards

### ✅ FeatureCard (`src/components/ui/FeatureCard.tsx`) — reusable across pages
Pixel-accurate to Framer source (all values confirmed via Chrome DevTools inspection).

**Both themes share:** same green border (`1px solid #00cc85`), same 3 circles, same button, same image handling.

**Light theme:**
- Card bg: `#ffffff`, border-radius: `25px`
- Content bg: `rgba(204, 255, 204, 0.75)` + `borderTop: 1px solid #00cc85`
- Title color: `#0b5851` (dark teal)

**Dark theme:**
- Card bg: `#2253e6` (bright blue — NOT dark navy)
- Content bg: `rgba(17, 41, 144, 0.8)` + `borderTop: 1px solid #00cc85`
- Title color: `#ffffff`

**3 background circles (confirmed from DevTools — same positions for both themes):**
| Class | Color | Size | Position |
|---|---|---|---|
| `framer-zcg75a` | `#8ceb8b` | 140×140px | `bottom: 102px, left: -70px` |
| `framer-10nunue` | `#00cc85` | 210×210px | `top: 70px, right: -105px` |
| `framer-kczqee` | `#ccffcc` | 84×84px | `top: 28px, left: 34px` |

All circles: `zIndex: 0` (behind image and content).

**Image:** `object-fit: contain`, `object-position: bottom` (anchors image to bottom of wrapper, no gap above content section). Image wrapper: `flex: 1` so both cards in a row reach equal height.

**Button (identical for both themes):**
- Bg: `#00cc85`, border: `1px solid #0b5851`, radius: `30px`
- Label: white bold
- Arrow circle: `#ccffcc` (light green — NOT white)
- Chevron icon: `#0b5851` dark teal (NOT green)

**Button hrefs** (in `home.ts → featureCards[]`):
- Card 1: `https://my.pandai.org/about/testimonial`
- Card 2: `https://blog.pandai.org/meet-ask-pbot-your-ultimate-study-buddy-in-pandai/`

### ✅ AsFeaturedInSection (`src/components/sections/home/AsFeaturedInSection.tsx`)
- White card with `1px solid #00cc85` border, `border-radius: 25px`
- Heading: "As Featured In" — 35px, `#00cc85`, centered, 49px tall row
- Ticker: 134px tall, infinite CSS marquee (`pandai-marquee-track` / `pandai-marquee-item` classes in `globals.css`)
- 14 logos doubled (28 items) for seamless loop — `animation: pandai-marquee 28s linear infinite`
- Each logo: `height: 44px; width: auto; maxWidth: 160px; objectFit: contain` — natural aspect ratio (do NOT force a fixed width — logos have different aspect ratios)
- Each item: `min-width: 100px; padding: 0 16px` so narrow logos don't bunch together
- Left + right fade edges: 60px `linear-gradient` overlays at `zIndex: 2`
- Content: `src/content/home.ts` → `asFeaturedIn.logos[]`
- Translation key: `asFeaturedIn.heading`

### ✅ CompetitionSection (`src/components/sections/home/CompetitionSection.tsx`)
- White card, horizontal padding `clamp(16px, 5vw, 50px)` (responsive — avoids squeezing image on mobile)
- Background image in-flow (`display: block; width: 100%; height: auto`) — no clipping
- Image wrapper: `position: relative; paddingTop: clamp(72px, 9vw, 110px)` — reserves space above the image for the heading text
- Heading stack `position: absolute; top: 0` sits in that padded space: "Score Better" (`clamp(20px, 3.5vw, 35px)`, `#00cc85`, bold) + subheading (`clamp(13px, 2vw, 16px)`, Pandai Grey `rgb(67,73,85)`)
- Heading container has `padding: 0 12px` + `wordBreak: break-word` to prevent overflow on BM translations
- Description paragraph between image and button: `padding: 15px`, centered, `clamp(13px, 2vw, 16px)`
- CTA button: `height: 62px`, `border-radius: 9999px`, `#00cc85` bg, `1px solid #0b5851` border, arrow circle (`#ccffcc` bg, `#0b5851` chevron)
- Image URL: `https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/4863ad76-7afd-49d8-0fca-342ac3890400/1024px`
- CTA href: `https://my.pandai.org/competitions`
- Content: `src/content/home.ts` → `competitionSection`
- Translation keys: `competition.heading`, `competition.subheading`, `competition.description`, `competition.cta`

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
3. Add translation keys for **every user-visible string** in `src/content/translations/home.ts` — both `en` and `ms` blocks. Use `useT(homeTranslations)` in the component instead of referencing `home.ts` strings directly.
4. Export from `src/components/sections/home/index.ts`
5. Import and add to `src/app/(marketing)/page.tsx`

> **Translation rule:** Every string visible to the user (headings, body copy, button labels) must have a key in both `en` and `ms` inside `homeTranslations`. No section is considered done until its translations are wired. Static data that never changes between languages (image URLs, hrefs, logo names) stays in `home.ts` and does not need a translation key.

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

## MCP Connections

Run these at the start of every session to ensure tools are connected:

```bash
# Framer design-bridge relay (Streamable HTTP — must use --transport http)
claude mcp add --transport http design-bridge "https://framer-mcp-relay.orange-lamp-studio.workers.dev/mcp?userId=f355240a47ad9d8da33c3ddb3909680b86618f667fb2d8216d855ce03161058d"
```

> If already registered and showing ✗ Failed, remove and re-add:
> `claude mcp remove design-bridge && claude mcp add --transport http design-bridge "<url above>"`

| Server | Transport | Purpose |
|---|---|---|
| design-bridge | HTTP (Streamable) | Framer relay — design reference |
| claude.ai Figma | HTTPS | Figma DS 1.5 token inspection |

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

## Rules & Lessons Learned (Do Not Repeat)

### Git workflow
- **NEVER commit or push without explicit user approval.** Always show what changed and ask "shall I commit and push?" first.
- Always push to both `staging` AND `main` when user says "push" — merge staging → main, then push both.

### FeatureCard — what went wrong and what's right
- ❌ Card 1 background is NOT mint `#e9fbf5` — it is **white `#ffffff`**
- ❌ The "green" the user referred to is the content area bg (`rgba(204,255,204,0.75)`), NOT the card bg
- ❌ Do NOT use `backgroundSize: cover` on the testimonial section background — Framer uses `object-fit: contain` on an `<img>` element
- ✅ All circle sizes/positions must be confirmed from Chrome DevTools, not estimated
- ✅ Circles must have explicit `zIndex: 0`; image wrapper `zIndex: 1`; content `zIndex: 2` — without this, large circles cover the text
- ✅ Arrow circle in CardButton is `#ccffcc` (light green), chevron is `#0b5851` (dark teal) — confirmed from Framer tokens
- ✅ Image uses `object-fit: contain` + `object-position: bottom` to eliminate gap between image and content section
- ✅ Image wrapper uses `flex: 1` + `height: 100%` on the `<img>` to equalize card heights — do NOT use absolute positioning (causes collapse)

### TestimonialsSection — what went wrong and what's right
- ❌ Do NOT use `whileInView` inside an `overflow: hidden` parent — Intersection Observer breaks, elements stay invisible. Use `animate="visible"` instead for elements inside overflow containers
- ❌ Do NOT use an absolute `<img>` for the background without explicit `zIndex` on all content — the image covers everything
- ✅ Correct background approach: CSS `linear-gradient` for the two-tone color + separate absolute `<img>` for the pattern, with content at `z-10`
- ❌ When editing JSX, always check the opening tag still has its closing `>` — a missing `>` causes cascading syntax errors that break the entire component
- ✅ Floating mascot MUST be a sibling of the `overflow-hidden` frame (not inside it) — otherwise it gets clipped

### General
- ❌ Never use `object-fit: cover` for transparent PNG cutout images — use `object-contain` so the cutout blends with the card background
- ✅ When combining CSS background layers (gradient + image), use comma-separated values in `backgroundImage`, `backgroundSize`, `backgroundPosition`, `backgroundRepeat` — but the gradient will cover the image if `backgroundSize: 100% 100%` is used. Safer to separate them (gradient as `background`, image as absolute `<img>`)
- ✅ Always confirm Framer design values via Chrome DevTools inspection — never guess circle sizes/positions or color tokens

---

## Known Decisions & Context

- `max-w-5xl` is the standard content width for all sections (set to match testimonials frame)
- TaglineSection background uses a hard two-color split (not gradient): `linear-gradient(to right, #CCFFCC 3.5%, #F2FFF2 3.5%)`
- TestimonialsSection background uses two-layer system: CSS hard-stop gradient (white → `#00cc85` at 78%) + absolute `<img>` pattern at `zIndex: 1`, content at `z-10`
- Stars in testimonial cards = 5 full gold stars; stars in rating pills = half-star-aware (fractional support via SVG `linearGradient`)
- `type` field was removed from `storeRatings` — icon URL is the single source of truth
- `usePandaiCount` uses `users` for student count and `questions` for questions count in the testimonials heading
- Favicon uses `src/app/icon.svg` (Pandai icon mark only, extracted from `logo-normal.svg` paths 1–12); Next.js App Router picks it up automatically — no config needed
- Floating mascot in TestimonialsSection must be a sibling of the `overflow-hidden` frame div (not inside it) so it can visually overflow the left border
- Store rating pills use `<motion.a>` with `target="_blank" rel="noopener noreferrer"` — each `href` lives in `home.ts` for easy updates

---

_Maintained by: Rai @ Pandai · azrai@pandai.org_
