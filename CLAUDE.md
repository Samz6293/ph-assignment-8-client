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
- Current date/time (`new Date()`) breaks the prerender. All date logic goes through `lib/date.ts` (`getToday`, `getTomorrow`, `getCurrentYear`, `isAfterToday`, `formatDate`). In a server component, use it inside a `"use cache"` + `cacheLife(...)` scope (see `Footer`); a client component that uses it must be wrapped in `<Suspense>` by its page (see `app/create-event/page.tsx`).
- Same for `searchParams` (e.g. `/upcoming-events?type=health`, see `components/events/EventsBrowser.tsx`).
- Dynamic routes (`[id]`): the page must NOT `await params` itself. It passes the `params` promise to child components that await it inside `<Suspense>` (see `app/upcoming-events/[id]/page.tsx`); otherwise Cache Components errors with "runtime data during prerendering". Never turn `cacheComponents` off to work around this.
- Route props use the global generated types (e.g. `LayoutProps<"/">`, `PageProps<"/path">`) rather than hand-written prop types.
- Tailwind CSS v4 is CSS-first: there is no `tailwind.config`. Tailwind is wired through a Turbopack loader rule (`@tailwindcss/turbopack`) in `next.config.ts`, not PostCSS.
- Path alias `@/*` → repo root.
- Routes are flat: `/upcoming-events`, `/create-event`, `/manage-events`, `/joined-events` (not the `/events/...` paths in the design README). All nav/footer links come from `lib/navlinks.ts`.
- This is the client half of the project; the API lives in the sibling repo `../ph-assignment-8-server`.

## Code style (match the user's own style)

The user is a beginner — keep code simple and readable; no clever abstractions. Style is taken from their previous project (`../../ph-assignment-7`):

- All components live in the single root `components/` folder, grouped by where they're used: `navbar/`, `footer/`, `auth/` (login/register forms), `shared/` (used on several pages, e.g. `NextUpCard`), and `ui/` (shadcn). Add a new folder for a new area (e.g. `home/`, `events/`). Import with `@/components/<folder>/<Name>`. There is no `app/components/`.
- One component per file, PascalCase filename, `export default function Name() {}` (not arrow functions).
- Props typed inline: `({ className, links }: { className?: string, links: NavLink[] })`. Shared data shapes go in a `types.ts` as `interface`s.
- Split UI into a few meaningful pieces (e.g. `Navbar`, `NavLinks`, `AuthButtons`), but don't over-abstract: a list and its items stay in one component (render the `.map()` inline rather than a separate `...Item` file). Accept an optional `className` prop so the parent controls layout/visibility (`hidden lg:flex`).
- Server components by default (async when fetching); put `"use client"` only on the small leaf that needs hooks (`usePathname`, session, etc.).
- Tailwind classes written directly in JSX, plus project utility classes (e.g. `container-page`, `btn-primary`). Conditional classes via template literals: ``className={`... ${active && "bg-primary"}`}``.
- **Class order** inside `className` (use a template literal when it spans lines):
  1. Line 1: layout/content-box class → display (flex/grid + alignment/gap) → color (bg/text/border) → margin → padding → font
  2. Line 2: breakpoint variants (`sm:` `md:` `lg:` …)
  3. Line 3: state effects (`hover:` `active:` `focus:` …)
  Omit a line if it has nothing. Example:
  ```tsx
  <div className={`container-page flex items-center justify-between bg-card text-foreground py-4 font-medium
      md:py-6 lg:gap-8
      hover:bg-muted`}>
  ```
- Short JSX section comments like `{/* logo + buttons */}`; few other comments.
- Constants/helpers in a small separate file; fetch helpers as plain `async function`s with `try/catch`.
- 4-space indentation, double quotes.

## UI / styling architecture

- **shadcn/ui, `base-nova` style, built on `@base-ui/react`** (not Radix). Add components with `npx shadcn add <name>`; they land in `components/ui/`. Icons: `lucide-react`.
- **Always use a shadcn component when one fits** (add with `npx shadcn add <name>`; answer "no" to overwrite prompts so the customized files aren't replaced). Customized to the Beacon look in `components/ui/`: `Input`, `InputGroup`, `Select` trigger and `Textarea` (52px / `rounded-field` / coral focus ring — use `InputGroup` for inputs with icons or a show-password button), `Label` (bold), `Button size="lg"` (48px coral pill). Don't re-add those styles per form. Use `aria-invalid` on inputs for the error state.
- Form structure: `<form>` → `FieldGroup` → `Field` (`FieldLabel` + `InputGroup` + optional `FieldError`), `FieldSeparator` for "or" dividers. `components/auth/LoginForm.tsx` / `RegisterForm.tsx` are the reference examples.
- Events: types (value, label, tint class) live in `lib/eventTypes.ts`; `components/shared/EventCard.tsx` is the one event card (create-event live preview now, events grid/home later); the date picker is shadcn `Popover` + `Calendar` with `disabled={{ before: getTomorrow() }}`. Event tint colors (`bg-tint-*`) are theme-aware CSS variables.
- Data fetching helpers live in `lib/fetch.ts` (server at `http://localhost:8080`). Upcoming events come from the server route `GET /events/upcoming?limit=N` (future dates only, soonest first, MongoDB `.limit()`), never filtered on the client. Server components that fetch are wrapped in `<Suspense>` with `skeleton` fallbacks (see `components/home/UpcomingEvents.tsx`). Empty lists show `components/shared/NoEvents.tsx`.
- Home page sections live in `components/home/` and are listed in order in `app/page.tsx`. Every section title uses `components/shared/SectionHeading.tsx` (eyebrow → `h-section` → lead) — the assignment requires identical heading styles. shadcn `Card` is customized to the Beacon card (`rounded-card`, `border-line`, 20px padding).
- Toasts: sonner via `components/ui/sonner.tsx` (styled to the Beacon toast: white card, round tinted icon — green success, coral info, red error). Every toast has a title AND a `description` line: `toast.success("Event updated", { description: "..." })`. Server actions live in `lib/fetch.ts` / `lib/user.ts` as `try/catch` helpers that toast and return `true`/`false`; the component then closes/redirects/`router.refresh()`es. Never use `alert()`.
- Decorative rings are inline SVG `<circle>`s with `vectorEffect="non-scaling-stroke"` (the CSS `beacon-rings` gradient looks pixelated — don't use it).
- `cn` comes from the `cn` npm package — `lib/utils.ts` just re-exports it. Generated components may import from `"cn"` directly.
- **`app/globals.css` is the design system ("Beacon")**:
  - `:root` / `.dark` define raw color tokens (coral primary `#ff8559`, plus extra `--danger` / `--danger-bg` beyond shadcn's set); `@theme inline` maps them to Tailwind utilities. Dark mode is class-based (`.dark` ancestor).
  - Custom radii: `--radius-field`, `--radius-card`, `--radius-panel`, `--radius-hero`, `--radius-band`.
  - `@layer components` provides ready-made classes — `container-page`, headings `h-hero` / `h-page` / `h-section` / `h-card`, `eyebrow`, `lead`, `field-label`, `btn` + `btn-primary` / `btn-outline` / `btn-danger`, `field` / `field-error` / `error-text`, `skeleton`, and the decorative `beacon-rings` (mark up `aria-hidden`). Prefer these over re-deriving the same styles with utilities.
- Fonts are loaded via `next/font` in `app/layout.tsx`: Bricolage Grotesque (`--font-bricolage` → `font-heading`) and DM Sans (`--font-dm-sans` → `font-sans`). `font-mono` uses the system monospace stack; no mono web font is loaded.
