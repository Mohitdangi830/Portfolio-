# Mohit Dangi — AI Command Center Portfolio

A premium, futuristic, highly-animated personal portfolio for **Mohit Dangi** —
*Aspiring IT Professional & Developer* from Udaipur, Rajasthan.

Built with **React + Vite + Tailwind CSS v4 + Three.js (R3F) + Framer Motion**.

> **Edit almost everything from one file:** [`src/data/portfolio.ts`](src/data/portfolio.ts)

---

## 1. Adding my profile photo

1. Put a square photo (min 512×512px) at `public/images/profile.jpg`
2. Open `src/data/portfolio.ts` and set:
   ```ts
   profilePhoto: "/images/profile.jpg",
   ```
3. Until then, a holographic **"MD" monogram** is shown automatically.

## 2. Adding my resume

1. Export your resume as PDF named **exactly** `Mohit-Dangi-Resume.pdf`
2. Drop it in `public/` → `public/Mohit-Dangi-Resume.pdf`
3. The **DOWNLOAD RESUME** button uses `profile.resumeUrl` (`/Mohit-Dangi-Resume.pdf`).
4. If the PDF isn't found yet, the button auto-generates a clean text resume so it never breaks.

## 3. Adding GitHub URL

In `src/data/portfolio.ts`:
```ts
export const socials = {
  github: "https://github.com/YOUR-USERNAME",
  ...
}
```

## 4. Adding LinkedIn URL

```ts
export const socials = {
  linkedin: "https://www.linkedin.com/in/YOUR-USERNAME",
  ...
}
```

## 5. Adding project links

Each project in the `projects` array has three link fields:
```ts
{
  title: "My Project",
  github: "https://github.com/you/repo", // "#" = shows "Soon" state
  demo: "https://my-demo.vercel.app",
  case: "https://my-writeup-link",
}
```
Leave any as `"#"` and the button renders a tasteful **"Soon" placeholder** automatically.

## 6. Changing colors

All colors live as CSS variables in `src/index.css`:
```css
:root {            /* dark theme */
  --neon: #22d3ee;
  --pulse: #8b5cf6;
  --laser: #3b82f6;
  ...
}
.light { ... }     /* light theme */
```
Change these + the Tailwind `@theme` tokens at the top of the file and the whole site re-themes.

## 7. Adding new projects

Copy any object in the `projects` array in `src/data/portfolio.ts`, give it a new
`id` / `index` / `title`, and it appears in the **Project Universe** automatically.
Accents available: `"cyan" | "violet" | "blue" | "emerald"`.

## 8. Deploying on GitHub Pages

```bash
npm run build
```
Option A — **gh-pages branch**: push the `dist/` folder to a `gh-pages` branch,
then Settings → Pages → Deploy from branch → `gh-pages`.

Option B — **GitHub Actions**: use the official Vite + Pages workflow
(`actions/upload-pages-artifact` with `dist/` as the artifact path).

> If deploying to `username.github.io/repo-name/`, set `base: "/repo-name/"`
> in `vite.config.ts` before building.

## 9. Deploying on Netlify

- **Drag & drop:** run `npm run build`, drag the `dist/` folder into Netlify.
- **Git connect:** New site → import repo → Build command `npm run build` →
  Publish directory `dist`.

---

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |

## Notes

- No fake experience, certifications, stats or testimonials are included anywhere —
  unavailable items render as honest **placeholders**.
- Theme preference persists in `localStorage` (`md-theme`).
- Reduced-motion mode respects `prefers-reduced-motion` and adds a manual toggle
  in the navbar (`md-motion`).
- The 3D core lazy-loads, caps pixel ratio on mobile, and is replaced by a
  static gradient orb when reduced motion is active.
