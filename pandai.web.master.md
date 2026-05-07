# Pandai Web 3.5 — Master Development Log

> **Project:** my.pandai.org homepage rebuild · Framer → Next.js 14  
> **Repo:** https://github.com/pandaipixel/pandai-web-3.5  
> **Deployment:** Cloudflare Pages (auto-deploy on push to `main`)  
> **Design source:** Figma DS 1.5 — file key `TLVKe3bgJTdVvuPAzgDq2f`  
> **Last updated:** 2026-05-08

---

## ⚡ On Session Start — Always Do This First

When this file is loaded at the start of a new session, **immediately and automatically**:

1. **Check Framer MCP connection:**
```bash
claude mcp list
```
If `design-bridge` shows ✗ Failed, re-add it:
```bash
claude mcp remove design-bridge
claude mcp add --transport http design-bridge "https://framer-mcp-relay.orange-lamp-studio.workers.dev/mcp?userId=f355240a47ad9d8da33c3ddb3909680b86618f667fb2d8216d855ce03161058d"
```

2. **Start the dev server:**
```bash
npm run dev
```
Confirm it's running at `http://localhost:3000`

3. **Pages to verify locally:**
   - `http://localhost:3000` → Home page (all sections)
   - `http://localhost:3000/parents` → Parents page
   - `http://localhost:3000/students` → Students page

4. **For each page, verify:**
   - All sections render correctly
   - Language toggle switches between **EN** and **BM (Bahasa Malaysia)** — all visible text must translate, nothing should fall back to English when BM is selected
   - No console errors

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
│   ├── globals.css                  # @import tokens.css + Tailwind + base resets + marquee keyframes
│   └── (marketing)/
│       ├── layout.tsx               # Marketing layout — Navbar + main + Footer
│       └── page.tsx                 # Homepage — imports all sections in order
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx               # Sticky navbar, colored pill hover, mobile drawer
│   │   └── Footer.tsx               # Dark footer, 5 link columns + social icons
│   ├── ui/
│   │   └── FeatureCard.tsx          # Reusable card — light / dark / student themes
│   └── sections/home/
│       ├── HeroSection.tsx
│       ├── TaglineSection.tsx
│       ├── TestimonialsSection.tsx
│       ├── FeatureCardsSection.tsx
│       ├── StudentFeaturesSection.tsx
│       ├── AsFeaturedInSection.tsx
│       ├── CompetitionSection.tsx
│       ├── LiveTuitionSection.tsx
│       └── DownloadSection.tsx
│
├── content/                         # ✏️ ALL editable copy lives here — never edit components directly
│   ├── home.ts                      # All homepage section data
│   ├── translations/
│   │   └── home.ts                  # EN + BM strings for every homepage section
│   ├── nav.ts                       # Navbar links + CTA + full footer content
│   ├── students.ts                  # Students page content
│   ├── parents.ts                   # Parents page content
│   ├── teachers.ts                  # (placeholder)
│   └── about.ts                     # (placeholder)
│
├── lib/
│   ├── animations.ts                # Framer Motion variants (fadeInUp, staggerContainer, scaleIn…)
│   ├── usePandaiCount.ts            # Hook — fetches live user/question counts
│   └── utils.ts                     # cn() helper (clsx + tailwind-merge)
│
└── styles/
    └── tokens.css                   # Pandai DS 1.5 CSS custom properties
```

---

## Design System Tokens (Key Colors)

All tokens are in `src/styles/tokens.css`. **Never hardcode hex values in components** — use these.

| Token | Hex | Usage |
|---|---|---|
| OG-Green/500 | `#00cc85` | Primary brand green — CTAs, highlights, borders |
| OG-Green/300 | `#66e0b6` | Tagline card border |
| OG-Green/200 | `#99ebce` | Borders, dividers |
| OG-Green/100 | `#ccffcc` / `#ccf5e7` | Arrow circle bg, card light tint |
| OG-Green/50 | `#e9fbf5` / `#e8faf0` | Section backgrounds, mint areas |
| Dark Teal | `#0b5851` | Button borders, chevron icon, title text on light cards |
| Deep Blue | `#2253e6` | Dark feature card background |
| Navy | `#0b1f3a` | Platform button name text |
| `#1a1a1a` | — | Body text (near-black) |
| `#374151` | — | Secondary text |
| `#6b7280` | — | Tertiary/label text |
| `#F5A623` | — | Star rating gold |
| `#FFD700` | — | "A+" highlight yellow in LiveTuitionSection |
| Purple bg | `#d1d4ff` | Decorative semi-circle in LiveTuitionSection |

---

## ─── BUTTON DESIGN STANDARD ─── (Apply to ALL buttons sitewide)

> **This is the single source of truth for all CTA/arrow-circle buttons. Every new button must use this exact pattern. Never deviate.**

### Visual spec
- Background: `#00cc85` (green)
- Border: `1px solid #0b5851`
- Border radius: `30px`
- Padding: `8px 8px 8px 20px` (more left padding, tight right for arrow circle)
- Label: white, `fontWeight: 700`, `fontSize: 14px` (or 15px for larger buttons), `whiteSpace: nowrap`
- Arrow circle: `34px × 34px` (or `38px` for larger), `backgroundColor: #ccffcc`, `borderRadius: 100%`
- Chevron SVG inside circle: `width=14 height=14`, `stroke="#0b5851"`, `strokeWidth="2.5"`

### Hover state (REQUIRED on all buttons)
- Button bg: `#00cc85` → `white`
- Label text: `white` → `#00cc85`
- Arrow circle: stays `#ccffcc` (no change)
- Transition: `200ms`

### Tailwind implementation (use `group` pattern)
```tsx
// Option A — group on the button/link itself (for standalone buttons)
<Link
  href={href}
  className="group inline-flex items-center gap-2 bg-[#00cc85] hover:bg-white transition-colors duration-200"
  style={{ border: '1px solid #0b5851', borderRadius: 30, padding: '8px 8px 8px 20px' }}
>
  <span className="text-white group-hover:text-[#00cc85] transition-colors duration-200"
    style={{ fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}>
    {label}
  </span>
  <span className="flex items-center justify-center shrink-0"
    style={{ width: 34, height: 34, backgroundColor: '#ccffcc', borderRadius: '100%' }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0b5851"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  </span>
</Link>

// Option B — group on parent card wrapper (e.g. FeatureCard student theme)
// Parent: className="group cursor-pointer"
// Button: className="inline-flex ... bg-[#00cc85] group-hover:bg-white ..."
// Label:  className="text-white group-hover:text-[#00cc85] ..."
```

### Scale animation on buttons (for standalone CTAs like CompetitionSection)
```tsx
<motion.a
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  className="group inline-flex ..."
>
```

---

## ─── SECTION PADDING & LAYOUT STANDARD ─── (Enforced across entire site)

> **Every section must use this exact wrapper. Never use different padding values.**

```tsx
// Standard section wrapper
<section className="w-full px-4 sm:px-6 lg:px-8" style={{ paddingTop: 25, paddingBottom: 25 }}>
  <div className="max-w-5xl mx-auto">
    {/* content */}
  </div>
</section>

// Alternative using Tailwind py (for sections without tight vertical spacing needs)
<section className="w-full px-4 sm:px-6 lg:px-8 py-8">
  <div className="max-w-5xl mx-auto">
    {/* content */}
  </div>
</section>
```

- **Max width:** `max-w-5xl` (1024px) — applies to ALL sections without exception
- **Horizontal padding:** `px-4 sm:px-6 lg:px-8` (16px / 24px / 32px responsive)
- **Vertical padding:** `paddingTop: 25, paddingBottom: 25` inline (or `py-8` Tailwind)
- **Never use** `max-w-7xl`, `max-w-6xl`, or `maxWidth: 1100` — these break symmetry with other sections
- Cards/inner containers can use `clamp(16px, 4vw, 50px)` for internal padding

---

## ─── FRAMER MOTION HOVER VARIANT PROPAGATION ───

> **Key pattern learned: `whileHover="hovered"` on a parent propagates the "hovered" variant name down to ALL child `motion.*` elements that define a matching `hovered` key in their `variants` prop. Plain HTML elements do NOT break the propagation chain.**

```tsx
// Parent — triggers propagation
<motion.div
  whileHover="hovered"
  variants={{
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hovered: { scale: 1.02, transition: { duration: 0.2 } },
  }}
>
  {/* Child — reacts to parent hover */}
  <motion.div
    variants={{ hovered: { x: -18, y: 14, transition: { duration: 1.1, ease: 'easeInOut' } } }}
  />
  <motion.img
    variants={{ hovered: { scale: 1.3, transition: { duration: 0.4, ease: 'easeOut' } } }}
  />
</motion.div>
```

Use this pattern for:
- Feature card decorative circles (animate outward on card hover)
- LiveTuitionSection images (side icons slide out, center image scales, semi-circle drops)
- Any card where background decoration should react to hover

---

## Sections Built — Full Detail

### ✅ Navbar (`src/components/layout/Navbar.tsx`)
- Sticky, transparent → white + shadow after 64px scroll
- Logo left, nav links center-left, Sign In + Sign Up CTAs right
- Per-link colored hover pills: Students=green, Parents=yellow, Teachers=pink, About=green
- Mobile: hamburger → animated drawer
- Content: `src/content/nav.ts`

### ✅ Footer (`src/components/layout/Footer.tsx`)
- Dark background `#1a1a1a`, 5 content columns + brand column
- Link hover: gray → `#00cc85`
- Inline SVG social icons in green
- Content: `src/content/nav.ts`

### ✅ HeroSection (`src/components/sections/home/HeroSection.tsx`)
- `max-w-5xl`, `pt-24` for navbar offset
- Headline from `hero.headlineLines[]`, responsive 41px/50px/60px
- Trust badges row + student photo
- Content: `src/content/home.ts → hero`

### ✅ TaglineSection (`src/components/sections/home/TaglineSection.tsx`)
- Two-tone hard split: left 3.5% `#CCFFCC`, right `#F2FFF2`
- Border: `2px solid #66e0b6`, bookmark ribbon: `#00CC85`
- Content: `src/content/home.ts → tagline`

### ✅ TestimonialsSection (`src/components/sections/home/TestimonialsSection.tsx`)
- Two-layer bg: CSS gradient (`#ffffff` → `#00cc85` at 78%) + absolute `<img>` pattern
- Floating mascot: sibling div (NOT inside `overflow: hidden` frame), left edge, bob animation
- Dynamic heading: live counts from `https://pandai.org/count/` via `usePandaiCount` hook
- 2×2 testimonial cards + 3 store rating pills
- **CRITICAL:** Use `animate="visible"` (NOT `whileInView`) for elements inside `overflow: hidden` — Intersection Observer breaks inside clipped containers
- Content: `src/content/home.ts → testimonialsSection`

### ✅ FeatureCardsSection (`src/components/sections/home/FeatureCardsSection.tsx`)
- 2-col grid (`grid-cols-1 sm:grid-cols-2 gap-5`)
- Uses `FeatureCard` with `light` and `dark` themes
- Translation keys: `featureCard1.title`, `featureCard1.button`, `featureCard2.title`, `featureCard2.button`

### ✅ FeatureCard (`src/components/ui/FeatureCard.tsx`) — reusable
Three themes: `light`, `dark`, `student`

| Theme | Card bg | Content bg | Title color |
|---|---|---|---|
| light | `#ffffff` | `rgba(204,255,204,0.75)` | `#0b5851` |
| dark | `#2253e6` | `rgba(17,41,144,0.8)` | `#ffffff` |
| student | `#ffffff` | `rgba(255,255,255,0.5)` | `#0b5851` |

**3 decorative circles** (same positions all themes, all `motion.div` for hover animation):
| Color | Size | Position |
|---|---|---|
| `#8ceb8b` | 140×140 | `bottom:102, left:-70` → hover: `x:-18, y:14` |
| `#00cc85` | 210×210 | `top:70, right:-105` → hover: `x:22, y:-18` |
| `#ccffcc` | 84×84 | `top:28, left:34` → hover: `x:12, y:-16` |

**Button:** Follows the BUTTON DESIGN STANDARD above exactly (both `isStudent` and non-student paths).

### ✅ StudentFeaturesSection (`src/components/sections/home/StudentFeaturesSection.tsx`)
- Background: tiled pattern image (`220px` repeat)
- `paddingTop: 30px, paddingBottom: 70px`
- 3-col grid (`grid-cols-1 md:grid-cols-3 gap-5`), each card `height: 407px, minWidth: 300px`
- Cards use `whileHover="hovered"` — propagates to `FeatureCard`'s `motion.div` circles
- Translation key: `studentFeatures.heading`
- Content: `src/content/home.ts → studentFeatureCards`

### ✅ AsFeaturedInSection (`src/components/sections/home/AsFeaturedInSection.tsx`)
- White card, `1px solid #00cc85` border, `border-radius: 25px`
- Heading: 35px, `#00cc85`, 49px row height
- Infinite CSS marquee: `pandai-marquee-track` / `pandai-marquee-item` (defined in `globals.css`)
- 14 logos doubled for seamless loop, `animation: pandai-marquee 28s linear infinite`
- Logo default height: `44px`, override via optional `height` field on each logo object in `home.ts`
- Item padding: `0 5px` (tight — `0 16px` is too wide)
- Left/right fade edges: 60px gradient overlays
- **Per-logo height override:** Add `height: N` to a logo entry in `home.ts → asFeaturedIn.logos[]` and the renderer will apply it. Example: `{ name: 'Tech in Asia', src: '...', height: 28 }`
- Content: `src/content/home.ts → asFeaturedIn`

### ✅ CompetitionSection (`src/components/sections/home/CompetitionSection.tsx`)
- White card, horizontal padding `clamp(16px, 5vw, 50px)`
- Background image in-flow (not absolute/cover)
- Heading stack: `position: absolute; top: 0` in padded wrapper
- CTA button: `height: 62px`, follows BUTTON DESIGN STANDARD (with `group` on `motion.a`)
- Scale animation: `whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}`
- Content: `src/content/home.ts → competitionSection`

### ✅ LiveTuitionSection (`src/components/sections/home/LiveTuitionSection.tsx`)
- Purple upper section with tiled bg image, dark navy CTA strip below
- **Outer wrapper:** `motion.div` with `whileHover="hovered"` — propagates to all child motion elements
- **Decorative semi-circle:** `motion.div`, `720×720px`, `#d1d4ff`, `opacity: 0.3`, centered (`left:50%, translateX:-50%`), `bottom: -250` (clips bottom half via parent `overflow:hidden` = dome effect)
  - On hover: `y: 100` (drops further down, 0.4s easeOut)
- **Three images layout:** `display:flex, alignItems:flex-end, justifyContent:center`
  - Left icons (`motion.img`): `width: 21%` → hover: `x: -18`
  - Center tutors (`motion.img`): `width: 70%` → hover: `scale: 1.3`
  - Right icons (`motion.img`): `width: 21%` → hover: `x: 18`
- **CTA strip:** `rgba(47,59,128,0.9)` bg, `borderTop: 1.5px solid rgba(255,255,255,0.3)`
- **Buttons:** Follow BUTTON DESIGN STANDARD — uses Tailwind `group`/`group-hover:` on `<Link>`
- Content: `src/content/home.ts` (image URLs inline), translations: `liveTuition.*`

### ✅ DownloadSection (`src/components/sections/home/DownloadSection.tsx`)
- White card, `1px solid #00cc85` border, `border-radius: 25px`, `padding: 20px 20px 30px`
- **3 animated decorative blobs** (Framer Motion `animate` keyframe arrays, looping):
  - Large `#00cc85` (432×432): `left:-232, bottom:-229` — slow 12s drift
  - Medium `#ccffcc` (277×277): `right:-130, bottom:-119` — 10s drift, 1.5s delay
  - Small `#8ceb8b` (118×118): `right:60, top:30` — fast 8s drift, 0.8s delay
- **Heading:** "Download" + inline Pandai logo `<img>` (no background/capsule) + "App Now!"
- **Subtitle:** "Available on " + `<span style={{ color: '#00cc85' }}>All Platforms</span>`
  - Font size: `clamp(16px, 1.9vw, 21px)` (bumped 5% from base)
- **Platform buttons** (300px wide, `border-radius: 33px`, `1px solid #00cc85`):
  - Left section: `#cbffcc` bg, right divider, `36×36` icon
  - Right section: label (`11px, #555, 500`), name (`15px, #0b1f3a, 700`), arrow circle (`41×41, #8ceb8b`)
  - **NOTE: Download buttons intentionally have NO hover bg-swap** — they have a scale+shadow effect via inline `onMouseEnter`/`onMouseLeave`. Do NOT apply the standard green→white hover to these.
- Row 1: 3 buttons (Play Store, App Store, Huawei); Row 2: 1 button (Web)
- Content: inline in component + translations `download.*`

---

## Localization — BM (Bahasa Malaysia) Requirements

> **Every visible string must be translated. No section is done without BM keys.**

- Translation file: `src/content/translations/home.ts`
- Hook: `useT(homeTranslations)` — call in every section component
- Structure: `{ en: { ... }, ms: { ... } }` — both blocks must have identical keys
- Language toggle: handled by `LanguageContext` (`src/context/LanguageContext.tsx`)
- Static data (image URLs, hrefs, logo names) stays in `home.ts` — no translation key needed
- **Check:** When testing locally, toggle to BM and verify every section updates. If any text stays in English, a key is missing from the `ms` block.

---

## Framer Motion — Key Patterns

### Standard scroll-in animation
```tsx
<motion.div
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-60px' }}
>
```

### Stagger children
```tsx
<motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
  {items.map(item => <motion.div key={item.id} variants={fadeInUp} />)}
</motion.div>
```

### Looping ambient animation (blobs)
```tsx
<motion.div
  animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0] }}
  transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
/>
```

### Hover variant propagation (card + children)
See the FRAMER MOTION HOVER VARIANT PROPAGATION section above.

**CRITICAL:** Never use `whileInView` inside an `overflow: hidden` parent — Intersection Observer breaks. Use `animate="visible"` instead.

---

## API Integration

**Live count endpoint:** `https://pandai.org/count/`
```json
{ "users": 878501, "questions": 722682777, "quizzess": 86750, "teachers": 92610 }
```
Hook: `src/lib/usePandaiCount.ts` — falls back silently on CORS/network error.

---

## MCP Connections

| Server | Transport | Purpose |
|---|---|---|
| design-bridge | HTTP (Streamable) | Framer relay — design reference |
| claude.ai Figma | HTTPS | Figma DS 1.5 token inspection |

```bash
# Add Framer design-bridge
claude mcp add --transport http design-bridge "https://framer-mcp-relay.orange-lamp-studio.workers.dev/mcp?userId=f355240a47ad9d8da33c3ddb3909680b86618f667fb2d8216d855ce03161058d"

# Re-add if failing
claude mcp remove design-bridge && claude mcp add --transport http design-bridge "<url above>"
```

---

## Deployment

- Cloudflare Pages auto-deploys on push to `main`
- `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`
- Build: `npm run build` → `out/`

**Workflow:**
```bash
git checkout staging       # always develop on staging
# ... make changes ...
git add <files> && git commit -m "feat: ..."
git push origin staging

# Deploy: merge to main
git checkout main && git merge staging && git push origin main
git checkout staging
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

### Git
- **NEVER commit or push without explicit user approval.** Show changes and ask first.
- Always merge staging → main when deploying. Push both branches.

### Buttons
- ✅ Every button must follow the BUTTON DESIGN STANDARD above — green bg, dark teal border, `#ccffcc` arrow circle, hover bg-swap to white
- ✅ Use `group` + `group-hover:` Tailwind pattern — never use JS state for button hover colors
- ❌ Do NOT use `fontWeight: 800` (extrabold) on button labels — use `700` (bold)
- ❌ DownloadSection platform buttons are intentionally different — do NOT add the green→white hover swap to them

### Layout / Spacing
- ✅ `max-w-5xl mx-auto` is the universal content width — never use `max-w-7xl` or hardcoded `maxWidth: 1100`
- ✅ `overflow: hidden` on the outer `motion.div` wrapper (not the inner `max-w-5xl` div) — otherwise hover scale clips cards
- ❌ Never add `overflow: hidden` to the `max-w-5xl` container — this clips hover scale effects on cards

### FeatureCard
- ❌ Card 1 bg is NOT mint — it is **white `#ffffff`**
- ✅ Circle zIndex: `0`, image wrapper zIndex: `1`, content zIndex: `2` — always explicit
- ✅ Arrow circle: `#ccffcc` bg, chevron: `#0b5851` — never white circle, never green chevron

### Animations
- ❌ Never use `whileInView` inside `overflow: hidden` — elements stay invisible
- ✅ Use `animate="visible"` for elements inside clipped containers
- ✅ Floating mascots/decorative elements that visually overflow a card must be **siblings** of the `overflow: hidden` div, not children

### TestimonialsSection
- ✅ Background = CSS gradient + separate absolute `<img>` overlay, NOT `backgroundImage` CSS combo
- ✅ Floating mascot is a sibling div (outside `overflow: hidden`)

### CompetitionSection
- ✅ Background image is in-flow (`display: block; width: 100%`), NOT `background-image: cover`
- ✅ Heading text sits in padded space above image using `position: absolute; top: 0`
- ✅ Add `wordBreak: break-word` to heading container to prevent BM text overflow

### AsFeaturedInSection
- ✅ Item padding `0 5px` (tight) — `0 16px` creates excessive gaps between logos
- ✅ Per-logo height override: add `height: N` to logo entry in `home.ts`; renderer checks `logo.height ?? 44`
- ❌ Never force a fixed width on logos — natural aspect ratios must be preserved

### LiveTuitionSection semi-circle
- ✅ Semi-circle dome effect: large circle (`overflow: hidden` on parent clips bottom half), centered with `left:50%, translateX:-50%`, `bottom: -250`
- ✅ Use `translateX: '-50%'` in Framer Motion style object (not `transform: 'translateX(-50%)'`) so FM can compose additional transforms without conflict

### General
- ❌ Never use `object-fit: cover` on transparent PNG cutouts — use `object-contain`
- ✅ Cloudflare Images URLs used directly as `<img src>` (not Next.js `<Image>`) — no remote patterns config needed
- ✅ Always confirm Framer design values via Chrome DevTools — never guess circle sizes, positions, or colors
- ✅ When `.md file` says "update the .md file" — always means `pandai.web.master.md`, NEVER `CLAUDE.md`

---

## Known Decisions

- `max-w-5xl` is the universal section width (set to match testimonials frame)
- All images hosted on Cloudflare Images CDN
- `usePandaiCount` uses `users` for student count, `questions` for question count
- Favicon: `src/app/icon.svg` — Next.js App Router picks up automatically
- `pandai-marquee` keyframe and `.pandai-marquee-track` / `.pandai-marquee-item` classes live in `globals.css`
- Store rating pills in TestimonialsSection intentionally do NOT use the arrow-circle button style
- BM language code in translations = `ms` (not `bm`)

---

_Maintained by: Rai @ Pandai · azrai@pandai.org_
