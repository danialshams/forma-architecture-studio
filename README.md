# FORMA — استودیو معماری فرما

An immersive Persian RTL architectural portfolio built with Next.js, GSAP, Lenis and CSS 3D/parallax — no Three.js required.

## Run

```bash
npm install
npm run dev
npm run build
```

Features: architectural line-drawing intro, blueprint-inspired mobile menu icon, smoothly animated full-screen navigation, interactive depth hero, asymmetrical case study gallery, project filters and interactive project details, staged studio process, responsive layouts, demo inquiry form, accessible keyboard controls and reduced-motion support.

## Demo disclaimer

All project titles/content are showcase samples; the inquiry form does **not** send or persist information. Link it to CRM/email when the site goes live for a real client.

## Deployment

Vercel: import GitHub repository, framework Next.js, Node 22, production branch main. Use stable project production domain, not the per-deployment URL. No environment variables are required.

Eight sample images are downloaded server-side during build and served from `/media/` on the project domain; builds fail rather than publish missing assets. Replace stock photos with properly licensed client content before handoff.

## November 2026 fixes
- Every image now uses a local first-party URL. The production build caches eight real JPEGs and fails if any download fails.
- The mobile menu icon is on the right side in both layouts.
