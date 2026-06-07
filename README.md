# Vakarų kemperiai — website

Modern multilingual site for camper & minibus rental (Klaipėda). Built with Next.js 16 (App Router), TypeScript, Tailwind v4, next-intl (LT/RU/LV/EN), a reactive 3D camper hero (react-three-fiber), Framer Motion, and a Mercedes-inspired charcoal + champagne design.

## Run locally
Requires Node 20+.

```bash
npm install
npm run dev      # http://localhost:3000  (redirects to /lt)
```

Production:
```bash
npm run build
npm start
```

## Project layout
- `src/app/[locale]/` — localized pages: home, kemperiai, mikroautobusai, vehicle detail, patarimai, duk, nuomos-salygos, kontaktai
- `src/components/` — header, footer, 3D hero, loader, cookie consent, vehicle card/detail, etc.
- `src/data/vehicles.ts` — seed dataset (23 vehicles). Replaced by Supabase in a later phase.
- `messages/{lt,ru,lv,en}.json` — translations. **LT and EN are complete; RU and LV currently hold Lithuanian placeholder text for you to translate.**
- `public/models/camper.glb` — optimized 3D camper (swap to update the hero).
- `public/logo.svg` — brand mark (used in nav + loader).

## Notes
- Prices are not shown (price on request). Inquiries go via email/phone links (no form backend), as requested.
- `next/font` fetches Manrope at build time (needs internet during build; fine on Vercel).
- Images currently load from the old site URLs; they will be swapped for your downloaded photos + Supabase storage in a later phase.

## Deploy (Vercel)
1. Push to GitHub.
2. Import the repo in Vercel; set the project root to this `website` folder.
3. Add env vars from `.env.example` when the admin/Supabase phase lands.

## Next phases
- Supabase schema + admin login + vehicle CRUD with photo upload
- Swap seed data + remote images for Supabase
- RU/LV translations, analytics + consent wiring, Lighthouse pass
