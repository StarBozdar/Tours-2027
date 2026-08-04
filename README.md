# 2027.tours

Concert and tour update tracker for 2027. Built with Next.js (App Router), Tailwind CSS, and MDX.

## Structure

- `app/page.tsx` — homepage, lists all tours
- `app/tours/[slug]/page.tsx` — individual tour page template
- `content/tours/*.mdx` — one file per artist/tour, frontmatter holds structured data (dates, status), body holds the write-up
- `lib/tours.ts` — reads and parses tour MDX files
- `components/TourCard.tsx` — homepage card component

## Adding a new tour post

Create a new file in `content/tours/` following the frontmatter schema in `content/tours/example-artist-2027-tour.mdx`.

## Development

```bash
npm install
npm run dev
```

## Deploy

Connect this repo to Vercel; it will build automatically on push to `main`.
