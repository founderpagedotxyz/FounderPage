# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start dev server on port 8080
- `npm run build` — Production build
- `npm run build:dev` — Development build
- `npm run lint` — ESLint (flat config, TS only)
- `npm run preview` — Preview production build

## Architecture

**FounderPage** is a Linktree-style platform for startup founders. Each user gets a public profile at `/:username` showcasing their startups and revenue data.

### Stack
- React 18 + TypeScript + Vite (SWC)
- Tailwind CSS + shadcn/ui (Radix primitives) in `src/components/ui/`
- Supabase for auth, database, storage, and edge functions
- Stripe Connect for verified revenue tracking
- React Router DOM for client-side routing
- React Query (`@tanstack/react-query`) for server state
- Zod for validation (`src/lib/validation.ts`)
- react-helmet-async for per-page SEO meta tags

### Path alias
`@/` maps to `./src/` (configured in both tsconfig.json and vite.config.ts).

### Key directories
- `src/pages/` — Route-level components (Index, Auth, Dashboard, Profile, NewStartup, Leaderboards, Admin, ResetPassword)
- `src/components/` — Shared components (Hero, Header, Footer, ImageUpload, RevenueChart, StripeConnect, ThemeSelector, ChatBotWidget)
- `src/lib/` — Auth helpers (`supabase.ts`), validation schemas (`validation.ts`), utilities (`utils.ts`)
- `src/integrations/supabase/` — Auto-generated Supabase client and types (do not edit `types.ts` manually)
- `supabase/functions/` — Deno edge functions (stripe-connect, stripe-connect-callback, sync-revenue, sitemap, process-payment)
- `supabase/migrations/` — SQL migration files

### Routing
Routes are defined in `src/App.tsx`. The `/:username` catch-all route must stay last (before `*`) to avoid conflicts with static routes. Reserved usernames are enforced in `src/lib/validation.ts`.

### Database tables
- `profiles` — User profiles (username, bio, photo, favicon, theme, font, links)
- `startups` — User's startups (name, description, url, category, revenue, Stripe account)
- `revenue_history` — Monthly revenue snapshots per startup
- `user_roles` — Role-based access (admin, moderator, user); checked via `has_role` RPC

### Supabase client
Import from `@/integrations/supabase/client` (not `@/lib/supabase`). The `lib/supabase.ts` file is an auth helper layer only (signUp, signIn, signOut, resetPassword, updatePassword).

### Theming
Profiles support per-user themes and fonts, managed via `ThemeSelector` component. Theme/font values are stored in the `profiles` table and applied on the public profile page.

### Environment variables
All prefixed with `VITE_`: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`, `VITE_STRIPE_PUBLISHABLE_KEY`.

## TypeScript notes
- `strictNullChecks` is off; `noImplicitAny` is off
- Some profile fields (theme, font_family, favicon_url) use `as any` casts because the auto-generated types lag behind the actual schema
- `@typescript-eslint/no-unused-vars` is disabled

## Project origin
Originally scaffolded with [Lovable](https://lovable.dev). The `lovable-tagger` dev dependency adds component tagging in dev mode only.
