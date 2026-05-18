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
public/images/         Placeholder app screenshots (SVG)
```

## Waitlist

The waitlist form (`components/landing/waitlist-form.tsx`) POSTs to
`/api/waitlist`, handled by the Cloudflare Pages Function in
`functions/api/waitlist.ts`. It stores emails in a KV namespace.

**Setup required before production** — see the TODO block at the top of
`functions/api/waitlist.ts` (create a KV namespace and bind it as `WAITLIST`).
Note: the function does **not** run under local `pnpm dev`; test it on a
Cloudflare Pages preview deploy.

## TODOs before launch

- [ ] Replace placeholder SVG screenshots in `public/images/` with real App
      Store screenshots (keep the ~320×694 aspect ratio).
- [ ] Create the Cloudflare KV namespace and `WAITLIST` binding.
- [ ] Confirm legal entity name, contact email, and governing law in
      `app/privacy/page.tsx` and `app/terms/page.tsx` (currently placeholders).
- [ ] Confirm the `hello@smartertraining.ai` address / domain is live.
