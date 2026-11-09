# Dueloro — Marketing Site

Corporate website for Dueloro and product site for Money Match.

## Stack

- React 19 + TypeScript + Vite
- `@shadergradient/react` + `@react-three/fiber` + `three` (code-split, lazy-mounted)
- Plain CSS mapped to the app's design tokens
- Vercel Function for the real-money launch waitlist
- Postgres storage through a Vercel Marketplace integration

## Run

```bash
npm install
npm run dev
npm run build
npm run check
npm run preview
```

## Waitlist setup

This repository is linked to the Neon `production` branch. Neon writes the
pooled application URL and direct migration URL to the ignored `.env.local`.
The waitlist schema in [`database/waitlist.sql`](database/waitlist.sql) has
been applied.

Before deploying the website, add `DATABASE_URL` to the Vercel project
environment. Use `DATABASE_URL_UNPOOLED` only for schema migrations and
administrative work. Then deploy and submit a test signup and survey.

The API lives at `api/waitlist.ts`. It stores consent separately from the
optional customer-discovery survey. Do not point the form at browser storage.

## Current product position

Money Match is chess-only and points-based. Deposits, withdrawals, and
real-money contests are not enabled. The waitlist is for future launch updates,
not a guarantee of access or eligibility.
