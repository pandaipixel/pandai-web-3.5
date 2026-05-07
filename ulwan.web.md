# ulwan.web.md — Pandai Web 3.5 Development Reference

> Full context document for Claude Code sessions on `my.pandai.org`.
> When this file is read, Claude must: (1) check Framer MCP connection, (2) start the dev server, (3) verify all 3 pages (home, parents, students) load correctly, (4) confirm Bahasa Malaysia localization is working across all pages.

---

## Project Stack

- **Framework:** Next.js 14, App Router, TypeScript strict mode
- **Styling:** Tailwind CSS v3 + inline styles for precise control
- **Animation:** Framer Motion v11
- **Hosting:** Cloudflare Pages
- **Images:** Cloudflare Images CDN (`imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/...`)
- **Design source:** Framer (design-bridge MCP for inspection)
- **Repo:** `pandaipixel/pandai-web-3.5`

---

## Pages to Develop

| Route | Page file | Status |
|---|---|---|
| `/` | `src/app/(marketing)/page.tsx` | In progress |
| `/students` | `src/app/(marketing)/students/page.tsx` | In progress |
| `/parents` | `src/app/(marketing)/parents/page.tsx` | Pending |

---

## Pandai Design System Colors

Always use these exact hex values. Never hardcode other greens.

| Token | Hex | Usage |
|---|---|---|
| Green 1 | `#00cc85` | Primary brand, borders, CTA bg, blob 3 |
| Green 2 | `#0b5851` | Dark green, button borders, arrow strokes |
| Green 4 | `#ccffcc` | Light mint, blob 1, CTA arrow circle bg |
| Green 5 | `#f2fff2` | Very light green, subtle card backgrounds |
| Green Mid | `#8CEB8B` | Medium green, blob 2 only |
| Grey | `#434955` | Body text, descriptions |
| Dark | `#1a1a1a` | Subtitle text |
| Title | `#0b5851` | Section headings |

---

## Button Design — ALWAYS Use This Pattern

Every CTA button across the entire site must use this exact design. No exceptions.

```tsx
<Link
  href={...}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full text-white font-bold text-sm transition-transform duration-200 hover:scale-[1.02]"
  style={{
    backgroundColor: '#00cc85',
    border: '1px solid #0b5851',
  }}
>
  <span>{label}</span>
  <span
    className="flex items-center justify-center"
    style={{ width: 36, height: 36, borderRadius: 9999, backgroundColor: '#ccffcc' }}
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="#0b5851" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
</Link>
```

**Rules:**
- Shape: pill (`rounded-full`)
- Left padding `pl-6`, right padding `pr-2` (arrow circle sits flush right)
- Arrow circle: `#ccffcc` bg, `#0b5851` stroke
- Hover: `hover:scale-[1.02]` scale animation, `transition-transform duration-200`
- Text: white, bold, `text-sm`

---

## Section Structure — Standard Pattern

Every marketing section follows this wrapper pattern:

```tsx
<section style={{ padding: '0 30px 50px 30px' }}>
  <div className="max-w-5xl mx-auto">
    <div
      className="flex flex-col gap-0 rounded-3xl bg-white"
      style={{ border: '1px solid #00cc85', padding: '0 30px 30px 30px' }}
    >
      {/* section content */}
    </div>
  </div>
</section>
```

**Padding rules:**
- Section outer: `padding: '0 30px 50px 30px'` (0 top, 30px sides, 50px bottom)
- Inner white frame: `padding: '0 30px 30px 30px'` (0 top, 30px all others)
- For sections with a title bar (e.g. LearnSection): add `overflow-hidden` to the frame div so the title bar clips at the rounded corners

**AcademicContentsSection upper stack specific padding:**
- `paddingLeft: '30px', paddingTop: '30px', paddingBottom: '30px'` on the motion.div

---

## Feature Card 2025 Design

Used in: AcademicContentsSection, LearnSection (9-card grid)

### Card container
```tsx
<div
  className="relative flex flex-col items-center text-center flex-1 bg-white rounded-3xl overflow-hidden"
  style={{ border: '1px solid #00cc85', alignSelf: 'stretch' }}
>
```

### 3 Decorative blobs (EXACT positions and colors — do not change)
```tsx
{/* Blob 1 */}
<div style={{ position: 'absolute', top: -30, left: 44, width: 66, height: 66, borderRadius: '50%', backgroundColor: '#ccffcc' }} />
{/* Blob 2 */}
<div style={{ position: 'absolute', top: 130, left: -60, width: 114, height: 114, borderRadius: '50%', backgroundColor: '#8CEB8B' }} />
{/* Blob 3 */}
<div style={{ position: 'absolute', top: 160, left: 200, width: 165, height: 165, borderRadius: '50%', backgroundColor: '#00CC85' }} />
```
- All blobs are 100% opacity (no rgba transparency)
- Colors are each different: `#ccffcc`, `#8CEB8B`, `#00CC85`

### Upper illustration area
```tsx
<div className="relative z-10 flex flex-1 items-center justify-center w-full">
  <Image src={card.image} alt={...} width={160} height={180} className="w-[160px] h-[180px] object-contain" />
</div>
```

### Lower text stack
```tsx
<div
  className="relative z-10 flex flex-col items-center gap-3 px-5 py-5 w-full flex-1"
  style={{
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderTop: '1px solid #00cc85',
    borderRight: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRadius: 0,
    width: '100%',
    height: 'fit-content',
    alignSelf: 'stretch',
  }}
>
  <h3 className="font-bold text-[20px]" style={{ color: '#00cc85' }}>{title}</h3>
  <p className="text-[13px] leading-relaxed text-center" style={{ color: '#434955' }}>{desc}</p>
</div>
```

**Rules:**
- Lower stack background: `rgba(255, 255, 255, 0.3)` — NOT solid white
- Border: top only (`borderTop: '1px solid #00cc85'`), all other sides `none`
- `borderRadius: 0` — no corner radius on the lower stack
- `alignSelf: 'stretch'` to fill card width even when parent uses `items-center`

---

## LearnSection Title Bar Pattern

For sections with a heading bar at the top:

```tsx
<div className="flex items-center justify-center py-4" style={{ backgroundColor: '#00cc85' }}>
  <h2 className="font-bold text-[41px] text-white tracking-tight">
    {t('sectionTitle')}
  </h2>
</div>
```
- Font size: `41px`
- Outer frame must have `overflow-hidden` for the bar to clip at the rounded corners

---

## LearnSection Featured Card Pattern

```tsx
<div
  className="flex flex-row items-stretch rounded-2xl overflow-hidden"
  style={{ border: '1px solid #00cc85', backgroundColor: '#ffffff', height: 'fit-content' }}
>
  {/* Left image stack — equal width, white bg, blobs, image from top */}
  <div className="relative flex-1 flex items-start justify-center overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
    {/* 3 blobs */}
    {/* Image: scale(1.3) translateY(15%), transformOrigin: 'top center' */}
  </div>

  {/* Right text stack — equal width, 40px padding all sides */}
  <div className="flex flex-col gap-4 flex-1" style={{ padding: '40px', margin: 0 }}>
    {/* Title, bullet points with green checkmark SVGs, CTA button */}
  </div>
</div>
```

**Bullet point list:**
```tsx
<ul className="flex flex-col gap-2 list-none p-0 m-0">
  <li className="flex items-start gap-2 p-0 m-0">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#00cc85" />
      <path d="M7 12l3.5 3.5L17 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span className="text-[14px]" style={{ color: '#434955' }}>{text}</span>
  </li>
</ul>
```
- `list-none p-0 m-0` on `<ul>` removes default browser padding-left
- `p-0 m-0` on `<li>` removes default browser margins
- No `mt-*` on the SVG icon

---

## Content Architecture — CRITICAL RULE

**Every students page section MUST update BOTH files:**

| File | Contains |
|---|---|
| `src/content/translations/students.ts` | ALL user-visible text, EN + MS (Bahasa Malaysia) |
| `src/content/students.ts` | Image URLs, hrefs, static config (no text) |

Same pattern applies for all pages (`home.ts`, `parents.ts`, etc.).

**Translation hook usage:**
```tsx
const t = useT(studentsTranslations)
// Usage: t('section.key')
```

**TranslationDict structure:**
```ts
export const studentsTranslations: TranslationDict = {
  en: { 'key': 'English text' },
  ms: { 'key': 'Teks Bahasa Malaysia' },
}
```

---

## Localization

- Language codes: `en` (English), `ms` (Bahasa Malaysia)
- Every key in `en` must have an equivalent key in `ms`
- BM translations are provided for all sections in `translations/students.ts`
- Language context: `src/context/LanguageContext.tsx`

---

## Image Guidelines

- CDN: `https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/<uuid>/<variant>`
- Variants: `512px`, `1024px` — use `512px` for card images, `1024px` for large visuals
- For images with baked-in whitespace: use `object-cover` + `overflow-hidden` on container, or `transform: scale()` to zoom in
- Always set explicit `width` and `height` props on Next.js `<Image>` components

---

## Known Pitfalls — Do NOT Repeat

1. **Duplicate `style` props** — Never write two `style={{}}` on the same JSX element. Merge them into one.
2. **Unused imports** — When removing a component (e.g. `<Link>`), also remove its import statement.
3. **`items-center` on unequal-height 2-col grids** — When one column has a taller image, `items-center` creates apparent top whitespace on the shorter column. Use `items-start` on the grid + `self-center` on individual columns instead.
4. **`rgba` vs solid for lower card stack** — The lower stack background is `rgba(255, 255, 255, 0.3)`, NOT solid white or `#ffffff`.
5. **Lower stack border** — Top side only. Setting `border: '1px solid ...'` on all sides is wrong. Use `borderTop` + `borderRight/Bottom/Left: 'none'`.
6. **Blob opacity** — Blobs are 100% opacity. Do not use `rgba` or `opacity` on blobs.
7. **Card height** — Feature cards use `alignSelf: 'stretch'` to match row height, not a fixed pixel height.
8. **Section padding conflicts** — Do not mix Tailwind padding classes (`p-8`, `pt-6`) with inline `style={{ padding }}` on the same element. Pick one.
9. **`list-none` on `<ul>`** — Default browser `<ul>` has `padding-left: 40px`. Always add `list-none p-0 m-0` to reset it.
10. **`mt-0.5` on SVG icons in list items** — Adds unwanted top offset. Remove it.

---

## What Works Well — Repeat These Patterns

1. `flex-1` on both stacks in a 2-col layout for equal-width columns
2. `self-center` on individual grid children for independent vertical centering
3. `overflow-hidden` on card/container to clip decorative blobs at edges
4. `paddingLeft: '30px'` on the upper content stack for horizontal centering within the green-bordered frame
5. Using `fit-content` height on containers that should wrap their content
6. `alignSelf: 'stretch'` on lower card stack to fill full card width
7. `transform: 'scale(x) translateY(y%)'` for image positioning within a constrained container

---

## Dev Commands

```bash
npm run dev      # Start local dev server at http://localhost:3000
npm run build    # Production build + type check
npm run lint     # ESLint
```

---

## MCP Setup

**Framer design-bridge MCP:**
```
claude mcp add --transport http "design-bridge" <relay-url>
```
Use `mcp__design-bridge__selection_get` to inspect currently selected Framer node.

---

## Pages Currently Live in Dev

- `/students` — HeroSection, AcademicContentsSection, LearnSection
- `/` — (home) — in progress
- `/parents` — pending

---

_Last updated: May 2026 | my.pandai.org | ulwan@pandai.org_
