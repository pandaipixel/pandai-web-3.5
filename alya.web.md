# alya.web.md — Pandai Web 3.5 Session Reference
> Maintained by: Alya (ulwan@pandai.org) · Last updated: 2026-05-07
> Read this file at the start of every new Claude session for instant context.

---

## ⚡ ON FILE READ — Claude Must Do This First

When Alya asks Claude to read this file, immediately run these steps **without asking**:

### 1. Check Framer MCP Connection
```bash
curl -s -X POST "https://framer-mcp-relay.orange-lamp-studio.workers.dev/mcp?userId=ulwan@pandai.org" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"selection_get","arguments":{}}}' | head -c 300
```
Report: **connected ✓** or the error message. If "Plugin is not connected" — ask Alya to open Framer and reconnect the Design Bridge MCP plugin.

### 2. Start Dev Server
```bash
cd "c:/Users/alyaa/OneDrive/Desktop/my.pandai.org" && npm run dev
```
Wait ~5s then confirm it's running on `http://localhost:3000`. If port 3000 is taken, Next.js will use 3001 — report whichever port it binds to.

### 3. Pages to Review
| Route | Status |
|---|---|
| `http://localhost:3000` | Home page ✓ built |
| `http://localhost:3000/parents` | Parents page ✓ built |
| `http://localhost:3000/students` | **NOT BUILT** — flag to Alya |

### 4. BM Localisation Check
The language toggle is in the Navbar. Confirm `/` and `/parents` render correctly in both **EN** and **BM (ms)**. Flag any raw translation key strings appearing in the UI (e.g. `"pricing.table.children"` as literal text = missing key).

---

## Project Overview

| Item | Value |
|---|---|
| Site | `my.pandai.org` |
| Stack | Next.js 14 App Router · TypeScript · Tailwind CSS v3 · Framer Motion v11 |
| Hosting | Cloudflare Pages |
| Design source | Framer (live: `my.pandai.org`) + Figma DS 1.5 (`TLVKe3bgJTdVvuPAzgDq2f`) |
| Images CDN | Cloudflare Images — `https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/<uuid>/<variant>` |
| Repo | `https://github.com/pandaipixel/pandai-web-3.5` |
| Working dir | `c:\Users\alyaa\OneDrive\Desktop\my.pandai.org` |
| Shell | PowerShell (Windows 11) — always use **Bash tool** for all shell ops, never PowerShell tool |
| Branch | `parents-staging` → merges to `staging` → merges to `main` |

---

## Framer MCP

**Relay endpoint:**
```
POST https://framer-mcp-relay.orange-lamp-studio.workers.dev/mcp?userId=ulwan@pandai.org
Content-Type: application/json
```

**Protocol:** JSON-RPC 2.0

**Supported methods — ONLY these four work:**
| Method | What it does |
|---|---|
| `selection_get` | Get currently selected node(s) in Framer canvas |
| `nodes_getNode` | Get a single node's properties by ID |
| `nodes_getChildren` | Get child nodes of a node |
| `nodes_getParent` | Get parent node of a node |

**NOT supported (will return error):** `get_node_children`, `get_node_properties`, `nodes_getById`, `nodes_getByName`

**Call format:**
```bash
curl -s -X POST "https://framer-mcp-relay.orange-lamp-studio.workers.dev/mcp?userId=ulwan@pandai.org" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"selection_get","arguments":{}}}'
```

**Fallback when MCP is offline:** scrape the live site and grep for CSS values:
```bash
curl -s "https://my.pandai.org/parents" | node -e "
const c=[]; process.stdin.on('data',d=>c.push(d)); process.stdin.on('end',()=>{
  const h=Buffer.concat(c).toString();
  // grep for specific text or CSS patterns
  console.log(h.slice(h.indexOf('SEARCH_TERM')-200, h.indexOf('SEARCH_TERM')+500));
});"
```

**Known Framer node IDs:**
- Parents page: `WEky7K79T`
- Parents / Find Out More Section: `S1k5dKQ4B`
- Parents / Plan Table 2026: `Ir5zVcTrL`
- Parents / Plan Table Mobile root: `Spk9GSenp` (310×371px)

---

## Colour Tokens

| Name | Hex / RGB | Usage |
|---|---|---|
| Brand green | `#00CC85` / `rgb(0, 204, 133)` | Primary CTA bg, active tab, avatar selector active ring |
| Light green | `rgb(204, 255, 204)` | Monthly tab bg, CTA arrow badge bg |
| Dark green text | `rgb(11, 88, 81)` / `#0B5851` | Button border, green text, table text (monthly) |
| Brand yellow | `#FFD000` / `rgb(255, 208, 0)` | Row separators, outer pricing frame, heading accent, star icons |
| Testimonial yellow | `rgb(255, 207, 48)` | Avatar selector ring, testimonial name text, testimonial card border |
| Deep yellow panel | `rgb(255, 225, 89)` | Pricing left illustration panel bg |
| Pale yellow | `rgb(255, 240, 173)` | Pricing description area bg |
| Testimonial header bg | `rgb(251, 240, 202)` | Testimonial card header area |
| Testimonial card border | `rgb(252, 213, 83)` | Testimonial card outer border |
| Avatar bg green | `rgb(140, 235, 139)` | Main testimonial avatar circle background |
| Dark text | `#434955` | Body text, secondary headings, role text |
| Arrow orange | `rgb(255, 185, 0)` | Row chevron arrow colour in pricing table |
| White | `#ffffff` | Active tab text, table body bg |

---

## The Canonical Pandai Button

**Every button or CTA built in this project must follow this exact design.** No exceptions unless explicitly told otherwise.

### Visual spec
- Shape: pill (`borderRadius: "30px"`)
- Height: `57px`
- Background: `#00CC85`
- Border: `1px solid #0B5851`
- Label: white · Poppins · 16px (section CTAs) · weight 600 · `lineHeight: "1em"`
- Arrow badge: `#CCFFCC` circle, right side inside pill, contains dark green chevron SVG

### Hover animation — `useState` pattern (NOT Framer Motion whileHover)
```tsx
const [btnHovered, setBtnHovered] = useState(false);

// Outer padding shrinks → badge appears to grow
padding: btnHovered ? "7px" : "10px"   // transition: "padding 0.2s ease"

// Badge size grows
width:  btnHovered ? "42px" : "38px"   // transition: "width 0.2s ease, height 0.2s ease"
height: btnHovered ? "42px" : "38px"
```

### Arrow SVG inside badge
```tsx
<svg viewBox="0 0 24 24" style={{ width: "24px", height: "24px", display: "block" }} role="presentation">
  <path
    d="M 0 0 L 3.5 3.25 L 0 6.5"
    fill="transparent"
    stroke="#0B5851"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    transform="translate(10.75 8.75)"
  />
</svg>
```

### Full button JSX template
```tsx
<Link
  href={cta.href}
  onMouseEnter={() => setBtnHovered(true)}
  onMouseLeave={() => setBtnHovered(false)}
  className="inline-flex items-center h-[57px] cursor-pointer"
  style={{
    backgroundColor: "#00CC85",
    border: "1px solid #0B5851",
    borderRadius: "30px",
    padding: btnHovered ? "7px" : "10px",
    gap: "10px",
    textDecoration: "none",
    transition: "padding 0.2s ease",
  }}
>
  <span
    className="flex-1 px-2 text-center"
    style={{ color: "#ffffff", fontFamily: "Poppins, sans-serif", fontSize: "16px", fontWeight: 600, lineHeight: "1em" }}
  >
    {label}
  </span>
  <span
    className="flex items-center justify-center flex-none rounded-full"
    style={{
      backgroundColor: "#CCFFCC",
      width: btnHovered ? "42px" : "38px",
      height: btnHovered ? "42px" : "38px",
      transition: "width 0.2s ease, height 0.2s ease",
    }}
  >
    {/* arrow SVG above */}
  </span>
</Link>
```

### Navbar CTA buttons (smaller, no arrow badge)
```tsx
// Sign In — outlined green
style={{ borderColor: '#00cc85', color: '#00cc85' }}
className="inline-flex items-center px-5 py-2 rounded-full border text-sm font-semibold transition-all duration-150 hover:bg-surface-secondary"

// Sign Up — filled green
style={{ backgroundColor: '#00cc85' }}
className="inline-flex items-center px-5 py-2 rounded-full text-white text-sm font-semibold transition-colors duration-150"
```

---

## Spacing & Padding Conventions

| Context | Value |
|---|---|
| Page section outer wrapper (desktop) | `max-w-[1200px] mx-auto px-[50px] py-[50px] w-full` |
| Page section outer wrapper (mobile) | `px-4 py-8` — use `px-4 sm:px-[50px] py-8 sm:py-[50px]` |
| Inner content max-width (parents hero) | `max-w-[1100px] mx-auto` |
| Pricing description area | `px-[25px] py-[25px]` |
| Pricing right panel (plan table) | `p-4 sm:p-10` |
| Plan table tab bar | `h-[43px] gap-5 sm:gap-[33px] px-5 sm:px-[25px]` |
| Plan table header cell | `padding: "10px 8px"` |
| Plan table data row cell | `padding: "8px 10px"` |
| Framer gap between panels | `gap: "2px"` (yellow shows through as visual separator) |
| Hero left stack gap | `gap-[47px]` |
| Hero headline gap | `gap-[20px]` |
| Hero headline left indent | `pl-[25px]` (desktop only) |
| Testimonial card header | `padding: "24px 30px"` |
| Testimonial card body | `padding: "24px 30px"` |

---

## Typography Scale

| Element | Mobile | Desktop | Weight | Colour |
|---|---|---|---|---|
| Hero H1 | `34px` | `57px` | 700 | `#FFD000` |
| Hero H3 | — | `32px` | 700 | `#434955` |
| Section heading | `28px` | `42px` | 700 | Split yellow + `#434955` |
| Description text | `15px` | `19px` | 700 | `#434955` |
| Plan table tab label | `13px` | `17px` | 600 | white / `rgb(11,88,81)` |
| Plan table header label | `12px` | `16px` | 700 | white / `rgb(11,88,81)` |
| Plan monthly price | `16px` | `22px` | 700 | `rgb(0,0,0)` |
| Plan yearly price | `clamp(12px,3.5vw,18px)` | — | 700 | `rgb(0,0,0)` |
| Testimonial name | `18px` | `18px` | 700 | `rgb(255, 207, 48)` |
| Testimonial role | `14px` | `14px` | 700 | `#434955` |
| Testimonial quote | `16px` | `16px` | 400 | `#434955` |

---

## Localisation System

**Hook:** `useT(dict)` from `@/context/LanguageContext`
**Languages:** `en` (default) · `ms` (Bahasa Malaysia)
**Toggle:** in Navbar — switches `lang` in `LanguageProvider`
**Fallback:** missing `ms` key → falls back to `en` → raw key string

### Rules for testimonial quotes
Testimonial quotes are authentic user quotes — keep them in their original language exactly as submitted. Provide a natural translation for the other locale.
- BM quotes (En Hadi, En Najah, En Rayyan, Pn Halizah, SheryInna) → translated to EN in `en:` block
- EN quote (Ms Leela) → translated to BM in `ms:` block
- Never use identical text in both locales for testimonials

### Translation files built
| File | Page | Status |
|---|---|---|
| `src/content/translations/home.ts` | Home | ✓ EN + BM |
| `src/content/translations/parents.ts` | Parents | ✓ EN + BM (hero, features, pricing, testimonials) |
| `src/content/translations/students.ts` | Students | **NOT BUILT** |

---

## Pages Built

### Home `/`
**File:** `src/app/(marketing)/page.tsx`
**Sections (in order):**
1. `HeroSection` — yellow H1 (3 lines), trust badges, student visual
2. `TaglineSection` — single paragraph tagline
3. `TestimonialsSection` — student quotes + stat counter heading
4. `FeatureCardsSection` — 2 cards (testimonials CTA, PBot CTA)
5. `AsFeaturedInSection` — media logo ticker (auto-scrolling)
6. `CompetitionSection` — academic competition CTA

---

### Parents `/parents`
**File:** `src/app/(marketing)/parents/page.tsx`
**Sections (in order):**
1. `HeroSection` — yellow H1, gray H3, canonical Pandai CTA button
2. `FeaturesSection` — 3 feature cards (activity tracking, goals, performance)
3. `FindOutMoreSection` — Plan Table 2026 family pricing (mobile responsive)
4. `TestimonialSection` — interactive 6-person testimonial carousel

---

### Students `/students`
**Status: NOT BUILT** — no page file, no content file, no translation file.

---

## Plan Table 2026 — FindOutMoreSection

### Tab colour — ALWAYS FIXED (never toggles)
- **Monthly tab:** always `rgb(204, 255, 204)` bg · `rgb(11, 88, 81)` text
- **Yearly tab:** always `rgb(0, 204, 133)` bg · `#ffffff` text
- Active state shown by **chevron direction only**: ↓ (down = active) · ↑ (up = inactive)

### Header row (follows active tab)
- Yearly active: `rgb(0,204,133)` bg · white text · `rgba(255,255,255,0.5)` divider · "Auto Debit" yellow badge
- Monthly active: `rgb(204,255,204)` bg · `rgb(11,88,81)` text · `1.5px solid rgb(11,88,81)` divider · no badge

### Data rows
- White bg, yellow separator `1.5px solid rgb(255,208,0)` between rows (not after last row)
- Left col: child icon images only — NO text labels
- Arrow: own flex item (not inside left col), `rgb(255,185,0)`, chevron right SVG, `width: 20px`
- Right col: price value centred
- **Monthly price format:** `RM 96` (plain price only)
- **Yearly price format:** `17% OFF = RM 960` (discount + price — `{row.yearlyDiscount} = {row.yearlyPrice}`)

### Table body
- `borderRadius: "15px 15px 20px 20px"` mobile / `"20px"` desktop with `overflow: hidden`
- Required for bottom corners to clip correctly on last row

### Mobile responsiveness (min 310px)
- Illustration panel: `hidden lg:flex` (hidden on mobile)
- Tab labels: `text-[13px] sm:text-[17px]`
- Header labels: `text-[12px] sm:text-[16px]`, `maxWidth: "90px"`
- Icons: `w-8 h-[30px] sm:w-[50px] sm:h-[46px]`
- Yearly price: `fontSize: "clamp(12px, 3.5vw, 18px)"`

### Pricing data (`src/content/parents.ts` → `pricing.rows`)
| Row | Monthly | Yearly discount | Yearly price |
|---|---|---|---|
| 1 child (1 icon) | RM 96 | 17% OFF | RM 960 |
| 2 children (2 icons) | RM 88 | 23% OFF | RM 880 |
| 3+ children (4 icons) | RM 80 | 30% OFF | RM 800 |

---

## Testimonial Section — TestimonialSection

**File:** `src/components/sections/parents/TestimonialSection.tsx`
**Data:** `src/content/parents.ts` → `testimonials.items`
**Translations:** `src/content/translations/parents.ts` → `testimonials.quote.*`

### Layout (two-column)
```
[  Testimonial Card   ] [ 3×2 Avatar Grid ]
[  max-w: 393px       ] [ max-w: 472px    ]
```
- Container: `flex flex-col lg:flex-row items-stretch justify-center gap-5`
- Left card: `w-full max-w-[393px]`
- Right grid wrapper: `w-full max-w-[472px] flex items-center justify-center`
- Right grid: `grid grid-cols-3 gap-4 w-full`
- On mobile: stacks vertically (card on top, grid below as flex-wrap row)

### Testimonial card (left)
- Outer: `border: 1px solid rgb(252, 213, 83)`, `borderRadius: 20px`
- Header bg: `rgb(251, 240, 202)`, padding `24px 30px`
- Main avatar: 90×90px circle, `border: 1.5px solid rgb(252, 213, 83)`, bg `rgb(140, 235, 139)`
- Name: `18px` bold, `rgb(255, 207, 48)` — uses `AnimatePresence` fade on switch
- Role: `14px` bold, `#434955`
- Body bg: white, padding `24px 30px`
- Quote: `16px`, `#434955` — uses `AnimatePresence` fade + y slide on switch
- Stars: SVG star path, `fill: rgb(255, 208, 0)`

### Avatar selector (right 3×2 grid)
- Size: `86px × 103px` for all avatars
- Shape: `borderRadius: "9999px"` (oval/pill)
- **Selected state:** thick yellow ring — `border: "20px solid rgb(255, 207, 48)"`
- **Unselected state:** thin yellow ring — `border: "3px solid rgb(255, 207, 48)"`
- **Press animation:** `motion.button` with `whileTap={{ scale: 0.93 }}` + border thickens to 20px on `onPointerDown` → snaps back on `onPointerUp`/`onPointerLeave`
- Pressing an unselected avatar previews the selected (thick) ring before release

### Testimonial data (`src/content/parents.ts` → `testimonials.items`)
Order matters — index 0 is default active on load.

| # | ID | Name | Avatar UUID |
|---|---|---|---|
| 0 | `en-hadi` | En Hadi | `f76569bc-75df-479a-26f7-276f8d445900` |
| 1 | `en-najah` | En Najah | `6ebacf11-ee24-4c6e-b4ca-782912805200` |
| 2 | `en-rayyan` | En Rayyan | `814ae333-102f-4d0d-7de6-23c33a3a8000` |
| 3 | `pn-halizah` | Pn Halizah | `c071ab73-833b-49f0-b8e8-351532d74e00` |
| 4 | `ms-leela` | Ms Leela | `29b14994-7b3d-48f2-8de8-5700a3bb1b00` |
| 5 | `sheryinna` | SheryInna | `712da819-e3dc-4784-3f4f-8523878f6800` |

All image URLs use `/256px` variant. The `id` field must match the translation key `testimonials.quote.<id>`.

---

## Animations

All scroll-triggered animations:
```tsx
<motion.div
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
>
```

**Available variants** (`src/lib/animations.ts`):
- `fadeInUp` — opacity 0→1, y 24→0, duration 0.5s
- `fadeIn` — opacity only, 0.4s
- `staggerContainer` — wraps staggered children, 0.1s stagger + 0.1s delay
- `slideInLeft` / `slideInRight` — x offset ±32px
- `scaleIn` — scale 0.92→1

**Interactive transitions:**
- Testimonial name/quote switching: `AnimatePresence mode="wait"` with fade + y-slide, 0.2–0.25s
- Avatar border on press: CSS `transition: "border 0.15s ease"` (not Framer Motion — faster response)
- Button hover: CSS `transition: "padding 0.2s ease"` via `useState`

---

## File Structure

```
src/
  app/
    (marketing)/
      layout.tsx                    ← Navbar + Footer wrapper
      page.tsx                      ← Home page
      parents/
        page.tsx                    ← Parents page
      [students/ — NOT BUILT]
  components/
    layout/
      Navbar.tsx                    ← Fixed pill, EN/BM toggle, animated hamburger
      Footer.tsx
    sections/
      home/                         ← HeroSection, TaglineSection, TestimonialsSection,
      │                                FeatureCardsSection, AsFeaturedInSection, CompetitionSection
      parents/
        HeroSection.tsx             ← Yellow H1, gray H3, CTA button
        FeaturesSection.tsx         ← 3 feature cards
        FindOutMoreSection.tsx      ← Plan Table 2026, monthly/yearly tabs, mobile responsive
        TestimonialSection.tsx      ← Interactive 6-person carousel, 3×2 avatar grid
      [students/ — NOT BUILT]
  content/
    home.ts                         ← Home images/data
    parents.ts                      ← Parents images/data (hero, features, pricing, testimonials)
    nav.ts                          ← Navbar links and CTA hrefs
    translations/
      home.ts                       ← EN + BM strings for home
      parents.ts                    ← EN + BM strings for parents (incl. all 6 testimonial quotes)
      [students.ts — NOT BUILT]
  context/
    LanguageContext.tsx             ← lang state (en/ms), LanguageProvider, useT hook
  lib/
    animations.ts                   ← Framer Motion variants
    utils.ts                        ← cn() class merge helper
  styles/
    tokens.css                      ← DS 1.5 CSS custom properties
```

---

## Navbar Notes

- **Shape:** pill container, fixed top, `z-50`
- **Border:** `1px solid #00cc85`
- **Nav links:** Students, Teachers, Parents, Blog
- **Language toggle:** EN / BM — implemented in Navbar, updates `LanguageProvider`
- **Mobile:** animated hamburger (Framer Motion), `AnimatePresence` drawer
- **Logo:** `/public/images/logo-normal.svg`

---

## Lessons Learned — DO This

- **Always `selection_get` before building any Framer component.** Confirm the exact node first.
- **Scrape the live site as fallback** when MCP is offline — pipe through Node.js (`grep` doesn't work well on large HTML).
- **Use `useState` for hover animations** — `whileHover` on Framer Motion conflicts with inline `style` objects. Use `onMouseEnter`/`onMouseLeave` + state instead.
- **Fixed-colour tabs** — Pandai tabs use FIXED background per tab position regardless of active state. Active = chevron direction only.
- **Arrow as own flex item** — the row separator arrow must be a sibling `<div>`, not nested inside the left column. Nesting breaks centering.
- **Full `borderRadius` + `overflow: hidden` on table containers** — `borderRadius: "20px"` on all corners, not just top. Without `overflow: hidden` the last row's bottom corners stay square.
- **`justify-center` on both table columns** — both header and data row cells must be `flex justify-center`.
- **Yearly price format:** `{row.yearlyDiscount} = {row.yearlyPrice}` (e.g. "17% OFF = RM 960") — NOT plain price only, NOT "per child" suffix.
- **Testimonial IDs must match translation keys** — `id: 'pn-halizah'` maps to `testimonials.quote.pn-halizah`. Mismatches show empty quotes.
- **Quotes in original language** — keep authentic user quotes exactly as submitted. Translate for the other locale separately.
- **Run `npx tsc --noEmit` after every edit.** Never report done without clean TypeScript.
- **Use Bash tool** for all shell operations — never PowerShell tool.
- **Check for duplicate IDs** when renaming testimonial entries — two entries with the same `id` will show the same quote for both avatars.

## Lessons Learned — DON'T Do This

- **Don't build without confirming the Framer node.** Built the wrong section once (green feature cards instead of pricing table) — required full rework.
- **Don't use unsupported MCP method names.** Only the 4 listed methods work. Others return "Method not found".
- **Don't toggle tab background colours.** Monthly always light green, Yearly always dark green — toggling is wrong.
- **Don't show plain price only in yearly column.** Format is `17% OFF = RM 960`, not just `RM 960`.
- **Don't add "per child / month" suffix to table rows.** Framer design has no such text.
- **Don't put text labels in the icon column** ("One Child", "Two Children") — icon column shows avatar images only.
- **Don't use check circles in tabs** — chevron arrows (↓/↑) only.
- **Don't use only top border-radius on the table body** — bottom corners stay sharp. Always full radius + overflow hidden.
- **Don't forget the closing quote** when manually editing `.ts` content files — a missing `'` is a silent syntax error that breaks the build.
- **Don't rename only the `name` field without also updating the `id`** — they must stay in sync because `id` is the translation key lookup.
- **Don't ask "want me to commit?" or "should I run this?"** — Alya manages commits herself; run non-destructive commands automatically.
- **Don't use PowerShell tool** — always use Bash tool on this Windows machine.

---

_Alya — update this file after each session. Last major updates this session: TestimonialSection (interactive 6-person carousel), FindOutMoreSection mobile responsiveness, testimonial data + translations cleanup._
