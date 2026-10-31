# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — dev server (Turbopack) at http://localhost:3000
- `npm run build` / `npm run start` — production build / serve
- `npm run lint` — ESLint 9 flat config (`eslint-config-next` core-web-vitals + typescript)
- Type-check: `npx tsc --noEmit`

No test runner is configured.

## Stack notes

- **Next.js 16.4 / React 19.3, App Router only** (`app/`). Per AGENTS.md, this Next version differs from training data — check `node_modules/next/dist/docs/` (`01-app/`, `03-architecture/`) before using Next APIs.
- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `experimental.agentFeedback`. With Cache Components on, dynamic data access must be wrapped in `<Suspense>` or opted into caching with `"use cache"` — read the docs before fetching data in pages/layouts.
- Route props use the global generated types (e.g. `LayoutProps<"/">`, `PageProps<"/path">`) rather than hand-written prop types.
- Tailwind CSS v4 is CSS-first: there is no `tailwind.config`. Tailwind is wired through a Turbopack loader rule (`@tailwindcss/turbopack`) in `next.config.ts`, not PostCSS.
- Path alias `@/*` → repo root.
- This is the client half of the project; the API lives in the sibling repo `../ph-assignment-8-server`.

## UI / styling architecture

- **shadcn/ui, `base-nova` style, built on `@base-ui/react`** (not Radix). Add components with `npx shadcn add <name>`; they land in `components/ui/`. Icons: `lucide-react`.
- `cn` comes from the `cn` npm package — `lib/utils.ts` just re-exports it. Generated components may import from `"cn"` directly.
- **`app/globals.css` is the design system ("Beacon")**:
  - `:root` / `.dark` define raw color tokens (coral primary `#ff8559`, plus extra `--danger` / `--danger-bg` beyond shadcn's set); `@theme inline` maps them to Tailwind utilities. Dark mode is class-based (`.dark` ancestor).
  - Custom radii: `--radius-field`, `--radius-card`, `--radius-panel`, `--radius-hero`, `--radius-band`.
  - `@layer components` provides ready-made classes — `container-page`, headings `h-hero` / `h-page` / `h-section` / `h-card`, `eyebrow`, `lead`, `field-label`, `btn` + `btn-primary` / `btn-outline` / `btn-danger`, `field` / `field-error` / `error-text`, `skeleton`, and the decorative `beacon-rings` (mark up `aria-hidden`). Prefer these over re-deriving the same styles with utilities.
- Fonts are loaded via `next/font` in `app/layout.tsx`: Bricolage Grotesque (`--font-bricolage` → `font-heading`) and DM Sans (`--font-dm-sans` → `font-sans`). `font-mono` uses the system monospace stack; no mono web font is loaded.
