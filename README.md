# Abdul Aziz Rantizi — Portfolio

Playful, soft-toned portfolio for a CS student focused on data analysis and software development.
Built with **Vite + React + Tailwind CSS v4 + Framer Motion**.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. Import the repo in Vercel — it auto-detects Vite.
3. Build command: `npm run build` · Output directory: `dist` (the defaults).

No extra config is needed; the site is fully static.

## Editing your content

All text lives in **`src/data/content.js`** — projects, experience, achievements,
skills, facts, email, and social links. Update that one file and the page updates.
Colors and fonts are defined as design tokens in **`src/index.css`** (`@theme` block).

## Project structure

```
src/
  App.jsx                  page assembly + Konami/console easter eggs
  index.css                Tailwind v4 tokens + ambient keyframes
  data/content.js          ALL editable content
  lib/confetti.js          confetti burst helper
  hooks/
    useKonami.js           Konami code listener
    useActiveSection.js    nav highlight via IntersectionObserver
  components/
    ui/                    Toast, Reveal, SectionHeading, Buttons
    Cursor.jsx             custom cursor (dot + spring ring)
    ScrollProgress.jsx     top progress bar
    BackgroundBlobs.jsx    ambient blobs + scroll parallax
    Navbar.jsx             sticky nav + logo easter egg + mobile menu
    Hero.jsx               staggered intro, word rotator, avatar boop egg
    Marquee.jsx            skills tape
    About / Skills / Projects / Experience / Achievements / Contact / Footer
```

## Easter eggs

- Click the avatar 5× (and 10×)
- Click the `rantizi.dev` logo 3×
- Konami code: ↑↑↓↓←→←→BA
- Open the browser console 👀
