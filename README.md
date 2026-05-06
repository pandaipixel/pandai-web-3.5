# Pandai Web 3.5

Marketing site for [my.pandai.org](https://my.pandai.org) — built with Next.js 14, Tailwind CSS, and Framer Motion. Deployed on Cloudflare Pages.

---

## Getting Started

**Requirements:** Node.js v18+, npm

```bash
# Install dependencies
npm install

# Start dev server → http://localhost:3000
npm run dev

# Production build
npm run build

# Lint
npm run lint
```

---

## Project Structure

```
src/
├── app/
│   ├── (marketing)/
│   │   ├── layout.tsx       # Wraps all pages with Navbar + Footer
│   │   └── page.tsx         # Homepage
│   ├── globals.css
│   └── layout.tsx           # Root HTML layout + metadata
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   └── home/            # Homepage sections (one file per section)
│   └── ui/                  # Reusable UI primitives
│
├── content/                 # ← EDIT CONTENT HERE
│   ├── nav.ts               # Navbar links, footer links, legal text
│   ├── home.ts              # All homepage text, images, data
│   ├── students.ts          # Students page content
│   ├── parents.ts           # Parents page content
│   ├── teachers.ts          # Teachers page content
│   └── about.ts             # About page content
│
├── lib/
│   ├── animations.ts        # Framer Motion variants
│   └── utils.ts             # cn() class merge helper
│
└── styles/
    └── tokens.css           # Design system CSS variables (DS 1.5)

public/
└── images/                  # All static images and SVG assets
```

---

## Editing Content

All page copy, image paths, and data live in `src/content/`. You should **never need to touch component files** just to update text or swap an image.

| File | What to edit |
|------|-------------|
| `src/content/nav.ts` | Nav links, Sign In/Sign Up URLs, footer links, legal text |
| `src/content/home.ts` | Hero, stats, features, testimonials, FAQ, app download |
| `src/content/students.ts` | Students page |
| `src/content/parents.ts` | Parents page |
| `src/content/teachers.ts` | Teachers page |
| `src/content/about.ts` | About page |

---

## Images

All images live in `public/images/`. Reference them in content files as `/images/filename.ext`.

| File | Used for |
|------|---------|
| `logo-normal.svg` | Navbar logo |
| `logo-white.svg` | Footer logo |
| `hero-student.png` | Hero section |
| `app-mockup.png` | App download section |
| `avatar-*.png` | Testimonial avatars |
| `bg-left.png` / `bg-right.png` | Hero background decoration |
| `badge-moe.png` | Ministry of Education badge |
| `badge-finland.png` | Finland education badge |
| `badge-personalized.png` | Personalized learning badge |
| `badge-1.svg` / `badge-2.svg` | App Store / Play Store badges |
| `asset-1/2/3.svg` | Feature section icons |

---

## Git Workflow

```bash
# Pull latest before starting work
git pull origin main

# Create a feature branch
git checkout -b feat/your-feature-name

# Stage and commit
git add .
git commit -m "feat: describe your change"

# Push and open a PR
git push origin feat/your-feature-name
```

**Commit message convention:**
- `feat:` — new section or feature
- `fix:` — bug fix or visual correction
- `style:` — CSS/visual-only change
- `content:` — text, image, or copy update

---

## Design Reference

- **Figma DS 1.5:** `TLVKe3bgJTdVvuPAzgDq2f`
- **Live site (Framer):** [my.pandai.org](https://my.pandai.org)
- **Design tokens:** `src/styles/tokens.css`
