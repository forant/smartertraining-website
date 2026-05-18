# SmarterTraining — Launch Website

Marketing / waitlist site for **SmarterTraining**, an adaptive training coach
for people with real lives. Built as a static Next.js site for App Store
submission and early access.

Modeled on the SmarterEats website (same stack, layout, and component
structure).

## Stack

- Next.js 16 (App Router, `output: 'export'` — static)
- React 19
- Tailwind CSS 4
- TypeScript
- pnpm

## Develop

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # static export → ./out
```

## Structure

```
app/
  layout.tsx          Root layout, fonts, metadata, <Header/>
  page.tsx            Landing page (composes the sections below)
  globals.css         Design tokens (navy/indigo/amber brand)
  privacy/page.tsx    Privacy Policy
  terms/page.tsx      Terms of Service
  robots.ts           robots.txt
  sitemap.ts          sitemap.xml
components/landing/    Header, Hero, HowItWorks, Screenshots,
                       WhyDifferent, CTA, Footer, WaitlistForm
functions/api/         Cloudflare Pages Function for the waitlist
public/images/         App screenshots (PNG)
```

## Waitlist

The waitlist form (`components/landing/waitlist-form.tsx`) POSTs to
`/api/waitlist`, handled by the Cloudflare Pages Function in
`functions/api/waitlist.ts`. It stores emails in a KV namespace.

The `WAITLIST` KV namespace is created and bound to the Pages project, so the
form works in production. Note: the function does **not** run under local
`pnpm dev`; test it on a Cloudflare Pages deploy.

## Updating screenshots

App screenshots live in `public/images/` (`screen-*.png`) and are referenced
by `components/landing/hero.tsx` and `components/landing/screenshots.tsx`. To
swap one, resize the new image to ~820px wide (`sips --resampleWidth 820 …`)
and keep the same filename, or update the `src` / `width` / `height` in those
components.
