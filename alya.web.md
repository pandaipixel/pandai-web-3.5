# alya.web.md — Pandai Web 3.5 Session Reference
> Maintained by: Alya (ulwan@pandai.org) · Last updated: 2026-05-08
> Read this file at the start of every new Claude session for instant context.

---

## ⚡ ON FILE READ — Claude Must Do This First

When Alya asks Claude to read this file, immediately run these steps **without asking**:

### 1. Check Framer MCP Connection
```bash
curl -s -X POST "https://framer-mcp-relay.orange-lamp-studio.workers.dev/mcp?userId=f355240a47ad9d8da33c3ddb3909680b86618f667fb2d8216d855ce03161058d" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"selection_get","arguments":{}}}' | head -c 300
```
Report: **connected ✓** or the error message. If "Plugin is not connected" — ask Alya to open Framer and reconnect the Design Bridge MCP plugin.
> Note: The correct userId is the hash above — NOT the email address.

### 2. Start Dev Server
```bash
cd "c:/Users/alyaa/OneDrive/Desktop/my.pandai.org" && npm run dev
```
Wait ~5s then confirm it's running on `http://localhost:3000`. If port 3000 is taken, Next.js will use 3001 — report whichever port it binds to.

### 3. Pages to Review
| Route | Status |
|---|---|
| `http://localhost:3000` | Home page ✓ built |
| `http://localhost:3000/parents` | Parents page ✓ fully built (5 sections) |
| `http://localhost:3000/students` | Students page ✓ partially built (3 sections — more to add) |

### 4. BM Localisation Check
The language toggle is in the Navbar. Confirm all three routes render correctly in both **EN** and **BM (ms)**. Flag any raw translation key strings appearing in the UI (e.g. `"pricing.table.children"` as literal text = missing key).

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
POST https://framer-mcp-relay.orange-lamp-studio.workers.dev/mcp?userId=f355240a47ad9d8da33c3ddb3909680b86618f667fb2d8216d855ce03161058d
Content-Type: application/json
```

**Protocol:** JSON-RPC 2.0

**Supported methods:**
| Method | What it does |
|---|---|
| `selection_get` | Get currently selected node(s) in Framer canvas |
| `nodes_getNode` | Get a single node's properties by ID |
| `nodes_getChildren` | Get child nodes of a node |
| `nodes_getParent` | Get parent node of a node |
| `codeFiles_list` | List all code files in the project |
| `codeFiles_get` | Get source code of a specific file by ID |

**NOT supported:** `nodes_getComponentProps`, `canvas_getCode`, `get_node_children`, `get_node_properties`

> **Critical limitation:** `ComponentInstanceNode` props (link URLs, overrides) CANNOT be read via MCP. If Alya selects a button and asks for its link — ask her to paste the URL directly.

**Call format:**
```bash
curl -s -X POST "https://framer-mcp-relay.orange-lamp-studio.workers.dev/mcp?userId=f355240a47ad9d8da33c3ddb3909680b86618f667fb2d8216d855ce03161058d" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"selection_get","arguments":{}}}'
```

**Known Framer node IDs:**
- Parents page root: `WEky7K79T`
- Parents / Find Out More Section: `S1k5dKQ4B`
- Parents / Plan Table 2026: `Ir5zVcTrL`
- Parents / Plan Table Mobile root: `Spk9GSenp` (310×371px)

---

## Colour Tokens

| Name | Hex / RGB | Usage |
|---|---|---|
| Green1 (Brand green) | `#00CC85` / `rgb(0, 204, 133)` | Primary CTA bg, active tab, animated button default |
| Green2 (Dark green) | `rgb(11, 88, 81)` / `#0B5851` | Button border, text on green, pressed button bg |
| Green3 (Mid green) | `rgb(140, 235, 139)` | Button hover bg, pressed arrow badge bg |
| Green4 (Light green) | `rgb(204, 255, 204)` | Monthly tab bg, arrow badge bg, button2 section bg |
| Brand yellow | `#FFD000` / `rgb(255, 208, 0)` | Row separators, borders, heading accent, star icons, arch |
| Yellow2 | `rgb(255, 242, 0)` | Auto Debit badge bg |
| Deep yellow panel | `rgb(255, 225, 89)` | Pricing left illustration panel bg |
| Pale yellow | `rgb(255, 240, 173)` | Pricing description area bg |
| CTA card bg | `rgb(251, 240, 202)` | CTA section card background |
| CTA button area bg | `rgb(242, 255, 242)` | CTA section button row background |
| Testimonial card border | `rgb(252, 213, 83)` | Testimonial card outer border |
| Testimonial yellow | `rgb(255, 207, 48)` | Avatar selector ring, testimonial name text |
| Avatar bg green | `rgb(140, 235, 139)` | Main testimonial avatar circle background |
| Dark text | `#434955` | Body text, secondary headings |
| Arrow orange | `rgb(255, 185, 0)` | Row chevron arrow in pricing table |

---

## The Canonical Pandai Button

**Every button or CTA built in this project MUST follow this exact design. No exceptions unless explicitly told otherwise.**

### Visual spec
- Shape: pill (`borderRadius: "30px"`)
- Height: `57px`
- Default bg: `rgb(0, 204, 133)` — Green1
- Border: `1px solid #0B5851`
- Label: Poppins · **20px** · weight 600 · `lineHeight: "1em"`
- Arrow badge: `rgb(204, 255, 204)` circle, right side, contains dark green chevron SVG

### Three states — all via `useState` (NOT Framer Motion whileHover)

| State | Button bg | Label color | Badge bg |
|---|---|---|---|
| Default | `rgb(0, 204, 133)` | `#ffffff` | `rgb(204, 255, 204)` |
| Hover | `rgb(140, 235, 139)` | `rgb(11, 88, 81)` | `rgb(204, 255, 204)` |
| Pressed | `rgb(11, 88, 81)` | `rgb(204, 255, 204)` | `rgb(140, 235, 139)` |

### Hover animation
```
padding: hovered ? "7px" : "10px"          transition: "padding 0.2s ease"
badge width:  hovered ? "42px" : "38px"    transition: "width 0.2s ease, height 0.2s ease"
badge height: hovered ? "42px" : "38px"
bg: transition: "background-color 0.15s ease"
```

### Looping CTA animation (primary action button only)
```tsx
// Add animated?: boolean prop to PandaiButton
// Wrap inner Link with motion.div when animated = true
<motion.div
  animate={{ scale: [1, 1.06, 1] }}
  transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
  style={{ display: "inline-flex" }}
>
  {inner}
</motion.div>
```
Current speed: `duration: 0.5`. Only applied to the Sign Up / primary CTA button — not secondary buttons.

### Arrow SVG inside badge
```tsx
<svg viewBox="0 0 24 24" style={{ width: "24px", height: "24px", display: "block" }} role="presentation">
  <path
    d="M 0 0 L 3.5 3.25 L 0 6.5"
    fill="transparent"
    stroke="#0B5851"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    transform="translate(10.75 8.75)"
  />
</svg>
```

### Full PandaiButton component template
```tsx
function PandaiButton({
  href, label, variant = "primary", animated = false,
}: {
  href: string; label: string; variant?: "primary" | "secondary"; animated?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const isPrimary = variant === "primary";

  const inner = (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className="inline-flex items-center h-[57px] cursor-pointer"
      style={{
        backgroundColor: pressed ? "rgb(11, 88, 81)" : hovered ? "rgb(140, 235, 139)" : isPrimary ? "rgb(0, 204, 133)" : "rgb(204, 255, 204)",
        border: "1px solid #0B5851",
        borderRadius: "30px",
        padding: hovered ? "7px" : "10px",
        gap: "10px",
        textDecoration: "none",
        transition: "padding 0.2s ease, background-color 0.15s ease",
      }}
    >
      <span className="flex-1 px-2 text-center" style={{
        color: pressed ? "rgb(204, 255, 204)" : hovered ? "rgb(11, 88, 81)" : isPrimary ? "#ffffff" : "rgb(11, 88, 81)",
        fontFamily: "Poppins, sans-serif", fontSize: "20px", fontWeight: 600, lineHeight: "1em",
      }}>
        {label}
      </span>
      <span className="flex items-center justify-center flex-none rounded-full" style={{
        backgroundColor: pressed ? "rgb(140, 235, 139)" : "rgb(204, 255, 204)",
        width: hovered ? "42px" : "38px",
        height: hovered ? "42px" : "38px",
        transition: "width 0.2s ease, height 0.2s ease, background-color 0.15s ease",
      }}>
        {/* arrow SVG */}
      </span>
    </Link>
  );

  if (animated) {
    return (
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
        style={{ display: "inline-flex" }}
      >
        {inner}
      </motion.div>
    );
  }
  return inner;
}
```

### Navbar CTA buttons (smaller, no arrow badge)
```tsx
// Sign In — outlined
style={{ borderColor: '#00cc85', color: '#00cc85' }}
className="inline-flex items-center px-5 py-2 rounded-full border text-sm font-semibold transition-all duration-150 hover:bg-surface-secondary"

// Sign Up — filled
style={{ backgroundColor: '#00cc85' }}
className="inline-flex items-center px-5 py-2 rounded-full text-white text-sm font-semibold transition-colors duration-150"
```

---

## Spacing & Padding Conventions

| Context | Value |
|---|---|
| Page section outer wrapper | `max-w-[1200px] mx-auto px-4 sm:px-[50px] py-4 sm:py-[50px] w-full` |
| Inner content max-width | `max-w-[1100px] mx-auto` |
| CTA section outer | `pb-8 sm:pb-[40px]` (no top — flows from section above) |
| CTA Row 1 padding | `px-6 sm:px-[50px] pt-8 sm:pt-[40px] pb-6 sm:pb-8` |
| CTA button row | `padding: "30px 20px"`, `gap: "15px"` |
| Features section outer | `px-4 sm:px-[50px] py-4 sm:py-[30px]` |
| Features card container | `px-4 py-4 sm:px-[30px] sm:py-[30px]` |
| Pricing description area | `px-[25px] py-[25px]` |
| Pricing right panel | `p-4 sm:p-10` |
| Plan table tab bar | `h-[43px] gap-5 sm:gap-[33px] px-5 sm:px-[25px]` |
| Plan table data row cell | `padding: "8px 10px"` |
| Framer panel gap | `gap: "2px"` (yellow shows through as separator) |
| Testimonial card header | `padding: "24px 30px"` |
| Testimonial card body | `padding: "24px 30px"` |

---

## Typography Scale

| Element | Mobile | Tablet (`sm`) | Desktop (`lg`) | Weight | Colour |
|---|---|---|---|---|---|
| Hero H1 | `34px` | — | `57px` | 700 | `#FFD000` |
| Hero H3 | — | — | `32px` | 700 | `#434955` |
| Section heading | `28px` | `36px` | `42px` | 700 | Yellow + `#434955` |
| CTA H2 | `28px` | `35px` | `41px` | 700 | `rgb(11, 88, 81)` |
| CTA H3 | `23px` | `28px` | `32px` | 700 | `rgb(11, 88, 81)` |
| CTA stat | `16px` | `16px` | `16px` | 400 | `rgb(11, 88, 81)` |
| Button label | `20px` | `20px` | `20px` | 600 | state-dependent |
| Plan tab label | `13px` | — | `17px` | 600 | white / `rgb(11,88,81)` |
| Plan header label | `12px` | — | `16px` | 700 | white / `rgb(11,88,81)` |
| Plan monthly price | `16px` | — | `22px` | 700 | `rgb(0,0,0)` |
| Plan yearly price | `clamp(12px,3.5vw,18px)` | — | — | 700 | `rgb(0,0,0)` |
| Testimonial name | `18px` | — | `18px` | 700 | `rgb(255, 207, 48)` |
| Testimonial quote | `16px` | — | `16px` | 400 | `#434955` |

---

## Localisation System

**Hook:** `useT(dict)` from `@/context/LanguageContext`
**Languages:** `en` (default) · `ms` (Bahasa Malaysia)
**Toggle:** in Navbar — `LanguageProvider`
**Fallback:** missing `ms` key → falls back to `en` → then raw key string (visible bug)

### Translation files status
| File | Page | Status |
|---|---|---|
| `src/content/translations/home.ts` | Home | ✓ EN + BM complete |
| `src/content/translations/parents.ts` | Parents | ✓ EN + BM complete (hero, features, pricing, testimonials, CTA) |
| `src/content/translations/students.ts` | Students | ✓ EN + BM complete (hero, academicContents, learnSection) |

### Testimonial quote rule
Keep authentic user quotes in their original language. Translate naturally for the other locale. Never use identical text in both `en:` and `ms:` blocks.

---

## Pages Built

### Home `/`
**File:** `src/app/(marketing)/page.tsx`
1. `HeroSection` — yellow H1, trust badges, student visual
2. `TaglineSection` — paragraph tagline
3. `TestimonialsSection` — student quotes + stat counter
4. `FeatureCardsSection` — 2 cards
5. `AsFeaturedInSection` — media logo ticker
6. `CompetitionSection` — competition CTA

### Parents `/parents`
**File:** `src/app/(marketing)/parents/page.tsx`
1. `HeroSection` — yellow H1, gray H3, canonical CTA button
2. `FeaturesSection` — 3 feature cards; mobile: stacked full-width; illustration above heading on mobile/tablet
3. `FindOutMoreSection` — Plan Table 2026 family pricing
4. `TestimonialSection` — interactive 6-person carousel
5. `CTASection` — pale yellow card, arch illustration, Sign Up (animated) + Talk To Our Team buttons

### Students `/students`
**File:** `src/app/(marketing)/students/page.tsx` — **partially built**
1. `HeroSection`
2. `AcademicContentsSection`
3. `LearnSection`

---

## CTASection — Parents Page

**File:** `src/components/sections/parents/CTASection.tsx`

### Card
- bg: `rgb(251, 240, 202)` · border: `1px solid rgb(255, 208, 0)` · `borderRadius: 25px` · `overflow: hidden`
- max-width: `1100px`

### Mobile content flow (below `sm`)
Character image → H2 → H3 → Stat text → Illustration/arch → CTA buttons

### Desktop content flow (`sm`+)
[Character image + H2/H3 side-by-side] → Stat text → Illustration/arch → CTA buttons

### Critical rule for mobile layout
**Never put H2/H3 inside a `hidden sm:flex flex-row` and expect clean mobile hiding.** Always use three separate blocks:
1. `<div className="hidden sm:flex ...">` — desktop char + H2/H3
2. `<div className="flex sm:hidden ...">` — mobile char only
3. `<div className="flex sm:hidden ...">` — placed AFTER illustration, mobile H2/H3

### Illustration + arch
- Illustration: 735×395px, `max-w-[735px] mx-auto w-full`, `z-10`
- Arch: `position: absolute, bottom: 0`, `height: 83.3%`, `maxHeight: 350px`, `rgb(255,208,0)`, `borderRadius: 1000px 1000px 0 0`, `z-0`

### CTA button row
- bg: `rgb(242, 255, 242)` · `borderTop: 1px solid rgb(255,208,0)` · `padding: 30px 20px`
- Sign Up: `PandaiButton animated` (looping pulse)
- Talk To Our Team: `PandaiButton` (static)

### Content (`src/content/parents.ts → cta`)
```ts
button:  { href: 'https://app.pandai.org/app/signup?account=parent' }
button2: { href: 'https://my.pandai.org/about/contact' }
```

---

## FeaturesSection — Mobile Layout

- **Section illustration:** `order-first lg:order-last` — above heading on mobile/tablet, right on desktop
- **Cards:** `flex flex-col sm:flex-row sm:flex-wrap` / card width `w-full sm:flex-1`
- **Outer padding:** `px-4 sm:px-[50px] py-4 sm:py-[30px]`

---

## Plan Table 2026 — FindOutMoreSection

### Tab colours — ALWAYS FIXED
- **Monthly:** always `rgb(204, 255, 204)` bg · `rgb(11, 88, 81)` text
- **Yearly:** always `rgb(0, 204, 133)` bg · `#ffffff` text
- Active state = chevron direction only (↓ active, ↑ inactive with bounce animation)

### Data rows
- White bg, yellow `1.5px` separator between rows (not after last)
- Left col: icon images only — **NO text labels ever**
- Arrow: own sibling flex item, `rgb(255,185,0)`, `width: 20px`
- Monthly: `RM 96` | Yearly: `17% OFF = RM 960`

---

## Testimonial Section

- Avatar size: `86×103px`, `borderRadius: 9999px`
- Selected border: `20px solid rgb(255, 207, 48)` | Unselected: `3px solid rgb(255, 207, 48)`
- Press: `whileTap={{ scale: 0.93 }}` + border thickens on `onPointerDown`
- Switching: `AnimatePresence mode="wait"`, fade + y-slide, 0.2s

---

## Animations

### Scroll-triggered
```tsx
<motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
```

### Variants (`src/lib/animations.ts`)
`fadeInUp` · `fadeIn` · `staggerContainer` · `slideInLeft` · `slideInRight` · `scaleIn`

### Button rules
- Hover/pressed: CSS `transition` via `useState` — **never** `whileHover`
- Looping CTA: `animate={{ scale: [1, 1.06, 1] }}` `duration: 0.5` `repeat: Infinity`

---

## File Structure

```
src/
  app/(marketing)/
    layout.tsx             ← Navbar + Footer
    page.tsx               ← Home
    parents/page.tsx       ← Parents (5 sections)
    students/page.tsx      ← Students (3 sections, partial)
  components/
    layout/Navbar.tsx · Footer.tsx
    sections/
      home/                ← 6 sections
      parents/             ← HeroSection · FeaturesSection · FindOutMoreSection · TestimonialSection · CTASection
      students/            ← HeroSection · AcademicContentsSection · LearnSection
  content/
    home.ts · parents.ts · students.ts · nav.ts
    translations/home.ts · parents.ts · students.ts
  context/LanguageContext.tsx
  lib/animations.ts · utils.ts
  styles/tokens.css
```

---

## Navbar Notes

- Shape: pill, fixed top, `z-50`, border `1px solid #00cc85`
- Nav links: Students, Teachers, Parents, Blog
- Language toggle: EN / BM
- Logo: `/public/images/logo-normal.svg`
- Mobile: animated hamburger, `AnimatePresence` drawer

---

## Lessons Learned — DO This

- **Always `selection_get` before building any Framer component.** Confirm the node structure first.
- **Use `useState` for all button hover/pressed states** — `whileHover` conflicts with inline `style`.
- **Separate mobile and desktop layout into completely separate DOM blocks** when content order differs. Use `hidden sm:flex` and `flex sm:hidden`. Never try to re-order inside a shared flex-row.
- **Use `order-first lg:order-last`** when an element must appear first on mobile but last on desktop within a responsive flex container.
- **Confirm color scheme before changing.** If a screenshot looks different, verify against the code first — don't rewrite colors based on assumption.
- **Ask for URLs directly** — `ComponentInstanceNode` hrefs are not accessible via MCP.
- **Fixed-colour tabs** — Pandai plan tabs are always the same color regardless of active state.
- **Arrow as own flex sibling** in table rows — never nested inside left column.
- **Full `borderRadius` + `overflow: hidden`** on all table/card containers.
- **Yearly price format:** `17% OFF = RM 960` — not plain price, not "per child" suffix.
- **Testimonial `id` must match translation key** exactly.
- **Use Bash tool** for all shell operations on this Windows machine.

## Lessons Learned — DON'T Do This

- **Don't build without confirming the Framer node** — built wrong section once, required full rework.
- **Don't change color scheme based on misreading a screenshot** — changed CTA card to green based on a mobile screenshot; it was wrong; had to revert immediately. Always check the code first.
- **Don't put H2/H3 inside a `hidden sm:flex flex-row`** expecting clean mobile hide — use fully separate DOM blocks.
- **Don't apply responsive bg colors via inline `style`** — use Tailwind arbitrary value classes (`bg-[rgb(...)] sm:bg-[rgb(...)]`) for responsive backgrounds.
- **Don't use unsupported MCP method names** — only listed methods work.
- **Don't toggle tab background colours** — always fixed per tab.
- **Don't put text labels in icon column** of pricing table — icons only.
- **Don't use only top border-radius on table body** — always full radius + overflow hidden.
- **Don't ask "want me to commit?"** — Alya manages commits herself; run non-destructive commands automatically.
- **Don't use PowerShell tool** — always Bash tool.

---

_Last major updates this session (2026-05-08): CTASection complete (arch + animated Sign Up + mobile layout fix + Talk To Our Team linked to my.pandai.org/about/contact), FeaturesSection mobile responsiveness (full-width stacked cards, illustration above heading), Students page confirmed partially built with EN+BM translations, Framer MCP ComponentInstanceNode prop limitation documented, canonical PandaiButton pressed state fully documented._
