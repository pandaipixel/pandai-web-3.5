# alya.web.md — Pandai Web 3.5 Session Reference
> Maintained by: Alya (ulwan@pandai.org) · Last updated: 2026-05-07
> Read this file at the start of every new Claude session for instant context.

---

## ⚡ ON FILE READ — Claude Must Do This First

When Alya asks Claude to read this file, immediately run these steps **without asking**:

### 1. Check Framer MCP Connection
```bash
curl -s -X POST "https://framer-mcp-relay.orange-lamp-studio.workers.dev/mcp?userId=f355240a47ad9d8da33c3ddb3909680b86618f667fb2d8216d855ce03161058d" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"selection_get","params":{}}' | head -c 300
```
Report: connected ✓ or the error message.

### 2. Start Dev Server
```bash
cd "c:\Users\alyaa\OneDrive\Desktop\my.pandai.org" && npm run dev
```
Wait ~5s then confirm it's running on `http://localhost:3000`.

### 3. Pages to Review (open these routes)
| Route | Status |
|---|---|
| `http://localhost:3000` | Home page ✓ built |
| `http://localhost:3000/parents` | Parents page ✓ built |
| `http://localhost:3000/students` | **Not built yet** — flag to Alya |

### 4. BM Localisation Check
The language toggle lives in the Navbar. Confirm all three pages render correctly in both **EN** and **BM (ms)**. Flag any missing translation keys (they fall back to the key string itself, e.g. `"pricing.table.children"` appearing as raw text = missing key).

---

## Project Overview

| Item | Value |
|---|---|
| Site | `my.pandai.org` |
| Stack | Next.js 14 App Router · TypeScript · Tailwind CSS v3 · Framer Motion v11 |
| Hosting | Cloudflare Pages |
| Design source | Framer (live site) + Figma DS 1.5 (`TLVKe3bgJTdVvuPAzgDq2f`) |
| Images CDN | Cloudflare Images — `https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/<id>/<variant>` |
| Repo | `https://github.com/pandaipixel/pandai-web-3.5` |
| Working dir | `c:\Users\alyaa\OneDrive\Desktop\my.pandai.org` |
| Shell | PowerShell (Windows 11) — but use Bash tool for all shell ops |

---

## Framer MCP

**Relay URL:**
```
https://framer-mcp-relay.orange-lamp-studio.workers.dev/mcp?userId=f355240a47ad9d8da33c3ddb3909680b86618f667fb2d8216d855ce03161058d
```

**Protocol:** JSON-RPC 2.0 via curl POST

**Supported methods (ONLY these work — do not guess others):**
- `selection_get` — get currently selected node(s) in Framer
- `nodes_getNode` — get a single node by ID
- `nodes_getChildren` — get children of a node
- `nodes_getParent` — get parent of a node

**NOT supported (will error):** `get_node_children`, `get_node_properties`, `nodes_getById`, `nodes_getByName`

**Known Framer page IDs:**
- Parents page: `WEky7K79T`
- Parents / Find Out More Section node: `S1k5dKQ4B`
- Parents / Pricing Variable (Plan Table 2026): `Ir5zVcTrL`

**Workflow when Alya selects a node in Framer:**
1. Run `selection_get` to get the selected node ID
2. Run `nodes_getNode` with that ID to read properties
3. Run `nodes_getChildren` to inspect sub-nodes
4. If MCP data is incomplete, **scrape the live site** (`https://my.pandai.org/<page>`) and grep the saved HTML for exact CSS values — this is the most reliable fallback

---

## Colour Tokens (Framer DS → Code)

| Name | Hex / RGB | Framer token | Usage |
|---|---|---|---|
| Brand green | `#00CC85` / `rgb(0, 204, 133)` | `--token-eb0954d0` | Active tab, primary CTA bg, navbar border |
| Light green | `rgb(204, 255, 204)` | `--token-876073ea` | Inactive tab bg, table header bg (monthly), arrow badge |
| Dark green text | `rgb(11, 88, 81)` | `--token-40612798` | Green text, button border, table header text |
| Brand yellow | `#FFD000` / `rgb(255, 208, 0)` | `--token-2ada4bf8` | Row separators, outer pricing frame, heading accent |
| Deep yellow panel | `rgb(255, 225, 89)` | — | Pricing left illustration panel |
| Pale yellow | `rgb(255, 240, 173)` | — | Pricing description area |
| Dark text | `#434955` | — | Body text, secondary headings |
| White | `#ffffff` | — | Active tab text, table body bg |
| Arrow orange | `rgb(255, 185, 0)` | — | Row chevron arrow colour |

---

## The Canonical Pandai Button

Every button built in this project must follow this design from `src/components/sections/parents/HeroSection.tsx`.

### Visual spec
- Shape: pill (`borderRadius: "30px"`)
- Height: `57px`
- Background: `#00CC85`
- Border: `1px solid #0B5851`
- Label text: white, Poppins, 20px, weight 600, `lineHeight: "1em"`
- Arrow badge: `#CCFFCC` (light green) circle, positioned right inside the pill

### Hover animation (state-driven with `useState`)
```tsx
// outer container padding shrinks on hover (pushes badge bigger visually)
padding: btnHovered ? "7px" : "10px"  // transition: "padding 0.2s ease"

// arrow badge grows
width:  btnHovered ? "42px" : "38px"  // transition: "width 0.2s ease, height 0.2s ease"
height: btnHovered ? "42px" : "38px"
```

### Arrow icon inside badge
```tsx
<svg viewBox="0 0 24 24" style={{ width: "24px", height: "24px" }}>
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

### Full button JSX pattern
```tsx
const [btnHovered, setBtnHovered] = useState(false);

<Link
  href={cta.href}
  target="_blank"
  rel="noopener noreferrer"
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
    className="flex-1 px-2 text-center whitespace-pre"
    style={{ color: "#ffffff", fontFamily: "Poppins, sans-serif", fontSize: "20px", fontWeight: 600, lineHeight: "1em" }}
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
// Sign In — outlined
className="inline-flex items-center px-5 py-2 rounded-full border text-sm font-semibold transition-all duration-150 hover:bg-surface-secondary"
style={{ borderColor: '#00cc85', color: '#00cc85' }}

// Sign Up — filled
className="inline-flex items-center px-5 py-2 rounded-full text-white text-sm font-semibold transition-colors duration-150"
style={{ backgroundColor: '#00cc85' }}
```

---

## Spacing & Padding Conventions

These values are used consistently across every page. Never deviate without a Framer reference.

| Context | Value |
|---|---|
| Page section outer wrapper | `max-w-[1200px] mx-auto px-[50px] py-[50px] w-full` |
| Inner content max-width (parents hero) | `max-w-[1100px] mx-auto` |
| Home page section wrapper | `max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8` |
| Section top padding (below fixed navbar) | `pt-24` |
| Pricing description area | `px-[25px] py-[25px]` |
| Pricing right panel (plan table) | `padding: "40px"` |
| Plan table header cell | `padding: "16px 12px"` |
| Plan table data row cell | `padding: "14px 20px"` |
| Hero left stack gap | `gap-[47px]` |
| Hero headline gap | `gap-[20px]` |
| Hero headline left indent | `pl-[25px]` (desktop only) |
| Framer gap between sections/panels | `gap: "2px"` (yellow shows through as visual separator) |

---

## Typography Scale (parents page)

| Element | Size | Weight | Color |
|---|---|---|---|
| Hero H1 | `34px / 44px / 57px` (mobile/tablet/desktop) | 700 | `#FFD000` |
| Hero H3 | `32px` | 700 | `#434955` |
| Section heading | `36px / 42px` | 700 | Split: yellow + `#434955` |
| Description text | `17px / 19px` | 700 | `#434955` |
| Plan table header | `18px` | 700 | white (yearly) / `rgb(11,88,81)` (monthly) |
| Tab label | `17px` | 600 | white (yearly tab) / `rgb(11,88,81)` (monthly tab) |
| Price text | `22px` | 700 | `rgb(0,0,0)` |

---

## Localisation System

**Hook:** `useT(dict)` from `@/context/LanguageContext`
**Languages:** `en` (default) · `ms` (Bahasa Malaysia)
**Fallback:** if key missing in `ms`, falls back to `en`, then to the raw key string

### How to add translations for a new page
1. Create `src/content/translations/<page>.ts` exporting a `TranslationDict`
2. Import and use `useT(pageTranslations)` in each section component
3. Mark the component `"use client"` — `useT` is client-side

### Translation files built
| File | Page | Keys |
|---|---|---|
| `src/content/translations/home.ts` | Home | tagline, hero, testimonials, featureCards, asFeaturedIn, competition |
| `src/content/translations/parents.ts` | Parents | hero, features, pricing |

### No students translation file yet
When building the students page, create `src/content/translations/students.ts` following the same pattern.

---

## Pages Built

### Home `/`
**File:** `src/app/(marketing)/page.tsx`
**Sections:**
1. `HeroSection` — headline (3 lines, `#00cc85`), trust badges, student visual
2. `TaglineSection` — single paragraph tagline
3. `TestimonialsSection` — student quotes + stat counter heading
4. `FeatureCardsSection` — 2 cards (testimonials CTA, PBot CTA)
5. `AsFeaturedInSection` — media logo ticker
6. `CompetitionSection` — academic competition CTA

### Parents `/parents`
**File:** `src/app/(marketing)/parents/page.tsx`
**Sections:**
1. `HeroSection` — yellow H1, gray H3, CTA button with animated arrow badge
2. `FeaturesSection` — 3 feature cards (activity tracking, goals, performance)
3. `FindOutMoreSection` — Plan Table 2026 family pricing

### Students `/students`
**Status: NOT BUILT** — No page file, no content file, no translation file exists yet.

---

## Plan Table 2026 — FindOutMoreSection Reference

This is the most complex component. Key design rules:

### Tab colour — FIXED (not toggling)
- **Monthly tab:** always `rgb(204, 255, 204)` bg · `rgb(11, 88, 81)` text — regardless of active state
- **Yearly tab:** always `rgb(0, 204, 133)` bg · `#ffffff` text — regardless of active state
- Active state shown by **chevron direction only**: ↓ (active) · ↑ (inactive)

### Header row
- Background follows active tab: `rgb(0,204,133)` when yearly, `rgb(204,255,204)` when monthly
- Text follows: white when yearly, `rgb(11,88,81)` when monthly
- Column divider: `rgba(255,255,255,0.5)` when yearly, `1.5px solid rgb(11,88,81)` when monthly
- "Auto Debit" badge: yellow `rgb(255,208,0)` bg, dark green text — appears in yearly header only

### Data rows
- White bg `rgb(255,255,255)`
- Yellow row separator: `1.5px solid rgb(255,208,0)` (not on last row)
- Left col: child icons (50×46px), centred with `justify-center`
- Arrow: own flex item between cols, colour `rgb(255,185,0)`, chevron right SVG
- Right col: price text 22px bold black, centred with `justify-center`
- **Price format:** just the price — `RM 96` / `RM 960` etc. No "X% OFF" in the row

### Table body container
- `borderRadius: "20px"` (ALL corners — full radius so last row clips correctly)
- `overflow: "hidden"` — required for corner clipping

### Pricing data (`src/content/parents.ts`)
| Row | Icons | Monthly | Yearly |
|---|---|---|---|
| 1 child | 1 icon | RM 96 | RM 960 |
| 2 children | 2 icons | RM 88 | RM 880 |
| 3+ children | 4 icons | RM 80 | RM 800 |

---

## Animations

All scroll animations use `whileInView` with `once: true`:
```tsx
<motion.div
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
>
```

**Available variants** (`src/lib/animations.ts`):
- `fadeInUp` — opacity 0→1, y 24→0
- `fadeIn` — opacity only
- `staggerContainer` — wraps staggered children (0.1s stagger)
- `slideInLeft` / `slideInRight` — x offset
- `scaleIn` — scale 0.92→1

Always wrap page entry animations in `staggerContainer` → children use `fadeInUp`.

---

## Lessons Learned (Rights & Wrongs)

### ✅ DO
- **Always read the selected Framer node before building.** Run `selection_get` first to confirm the exact node, then `nodes_getNode` for its ID.
- **Scrape the live site HTML when MCP data is ambiguous.** Save the HTML to a temp file and grep specific Framer scope classes (e.g., `framer-hPgFe`) to extract exact CSS values.
- **Use `useState` for hover animations** — Framer Motion's `whileHover` conflicts with inline `style` objects. Use `onMouseEnter`/`onMouseLeave` + state.
- **Fixed-color tabs** — Pandai tabs use FIXED background colours per tab position, not active/inactive toggling. Active state is communicated by chevron direction only.
- **Arrow as own flex item** — place the row separator arrow as its own `<div>` between left and right columns, not inside either column. This ensures it stays truly centred.
- **Full `borderRadius` on table containers** — use `borderRadius: "20px"` (not just top corners) combined with `overflow: "hidden"` so the last row's bottom corners clip correctly.
- **`justify-center` on all table columns** — both header and data row cells need `justify-center` for content to be centred within their column section.
- **Add `yearlyDiscount` to content data** — even if not shown in the row, keep it in the data object (`src/content/parents.ts`) for potential future use.
- **Run `npx tsc --noEmit` after every edit.** Never report a task done without a clean TypeScript check.
- **Use Bash tool** (not PowerShell) for all shell operations on this machine.

### ❌ DON'T
- **Don't build the wrong Framer component.** Always confirm the node via `selection_get` before coding. The wrong section was built once (green feature cards instead of the pricing table) — cost significant rework.
- **Don't use unsupported MCP methods.** Only `selection_get`, `nodes_getNode`, `nodes_getChildren`, `nodes_getParent` work. `nodes_getById`, `get_node_children`, `get_node_properties` will error.
- **Don't toggle tab background colours.** Monthly is always light green, Yearly is always dark green — toggling them is wrong.
- **Don't show "X% OFF = RM YYY" format in data rows.** The Framer design shows only the price value (e.g., "RM 960"). Keep discount data in the content file but don't display it in the row.
- **Don't put per-child suffixes** ("per child / month") in the table rows — Framer design has no such suffix.
- **Don't put text labels in icon-only rows** — the icon column shows ONLY child avatar images, no "One Child" / "Two Children" text.
- **Don't use check circle icons in tabs** — Framer uses chevron arrows (↓/↑), not check circles.
- **Don't nest the separator arrow inside the left column** — it loses its centred position between columns.
- **Don't use only top border-radius on the table body** — the last row's bottom corners stay square. Always use full `borderRadius` + `overflow: hidden`.
- **Don't hardcode the wrong monthly prices.** Original content had RM 12.90 / 11.90 / 10.90 — these were wrong. Correct values from Framer are RM 96 / 88 / 80.
- **Don't ask "should I run this?"** — CLAUDE.md rule: run all non-destructive commands automatically.
- **Don't ask "want me to commit?"** — Alya manages her own commits.

---

## File Structure Quick Reference

```
src/
  app/
    (marketing)/
      layout.tsx              ← Navbar + Footer wrapper
      page.tsx                ← Home page
      parents/page.tsx        ← Parents page
      [students — missing]
  components/
    layout/
      Navbar.tsx              ← Fixed pill navbar, EN/BM toggle, animated hamburger
      Footer.tsx
    sections/
      home/                   ← HeroSection, TaglineSection, TestimonialsSection,
      │                          FeatureCardsSection, AsFeaturedInSection, CompetitionSection
      parents/                ← HeroSection, FeaturesSection, FindOutMoreSection
      [students — missing]
  content/
    home.ts                   ← Home images/data
    parents.ts                ← Parents images/data (hero, features, pricing rows)
    nav.ts                    ← Navbar links and CTA hrefs
    translations/
      home.ts                 ← EN + BM strings for home
      parents.ts              ← EN + BM strings for parents
      [students — missing]
  context/
    LanguageContext.tsx        ← Lang state (en/ms), LanguageProvider, useT hook
  lib/
    animations.ts             ← Framer Motion variants
    utils.ts                  ← cn() class merge helper
  styles/
    tokens.css                ← DS 1.5 CSS custom properties
```

---

## Navbar Notes

- **Shape:** pill container, fixed top, `z-50`
- **Border:** `1px solid #00cc85`
- **Nav links:** hover reveals coloured pill bg (per-link colour set in `src/content/nav.ts`)
- **Language toggle:** implemented in Navbar — switches `lang` in `LanguageProvider`
- **Mobile:** animated hamburger (Framer Motion bars), drawer slides down with `AnimatePresence`
- **Logo:** `/public/images/logo-normal.svg`

---

_Alya — update this file after each session with major new sections, design decisions, or corrected values._
