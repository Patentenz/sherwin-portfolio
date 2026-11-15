<!-- BEGIN:sveltekit-agent-rules -->

# SvelteKit starter template rules

Copy this repository when starting a new app.
SvelteKit 3 + Svelte 5 runes (forced in `vite.config.ts`) + TypeScript (strict) + custom CSS (`src/app.css`) + Vitest + `@sveltejs/adapter-auto` + `@lucide/svelte`.
Read `README.md` and project docs when relevant. Follow this project's conventions over generic Svelte examples. No legacy Svelte 4 / Kit 2 patterns.

# Working efficiently

- Read only the files the task needs. Prefer files named in the prompt; do not scan the whole repo.
- Use the Svelte MCP docs (list-sections → get-documentation) only when unsure about a Svelte/SvelteKit API.
- Run svelte-autofixer once on changed `.svelte` files at the end. Fix reported issues once, then stop.
- Run `npm run check` and ESLint on changed files once at the end, not after every edit.
- Keep reports short: changed files, one-line summary each, check results, and key snippets only when asked.
- Never generate a Svelte Playground link unless asked.

# Svelte 5

Use:
- `$state` (`$state.raw` for large replaced objects), `$derived` / `$derived.by`
- `$props` typed on the binding: `let { title, count = 0 }: Props = $props()`
- `onclick`, `oninput`, `onsubmit` event attributes
- `{#snippet}` / `{@render}`, `{@attach}`
- `PageProps` / `LayoutProps` from `./$types`
- `.svelte.ts` modules for shared reactive logic, `createContext` for subtree state
- keyed `{#each}` blocks

`$effect` is an escape hatch. Never use it to copy state into state; prefer event handlers, `{@attach}`, or `$derived`.

Never use: `export let`, `$$props`, `$$restProps`, `$:`, `on:` directives, `createEventDispatcher`, `<slot>`, `$$slots`, `<svelte:fragment>`, `<svelte:component>`, `<svelte:self>`, `use:action`, the `class:` directive, Svelte stores for new state, `$app/stores` (use `$app/state`), or other legacy APIs.

# Structure

```
src/
├── lib
│   ├── assets                     imported images/SVGs/fonts and per-section asset maps
│   ├── components
│   │   ├── shared                 app-wide components (header, footer, logo)
│   │   └── ui                     reusable UI (buttons, inputs, dialogs)
│   │       └── icons              custom/brand icons only (see Icons)
│   ├── constants                  app.ts, navigation.ts, routes.ts (no index.ts barrel)
│   ├── features
│   │   ├── admin
│   │   │   ├── components         admin shell and shared admin UI
│   │   │   └── <page>/            one folder per admin page (same pattern as public)
│   │   ├── auth
│   │   └── public
│   │       ├── components         shared public UI
│   │       ├── contact
│   │       └── homepage
│   │           ├── sections/      Hero.svelte, About.svelte, ...
│   │           ├── content.ts     only when the page has lists/repeated data (see rule)
│   │           ├── homepage.svelte.ts  only when state is shared by 2+ sections (see rule)
│   │           └── Homepage.svelte
│   ├── server                     server-only: auth, db, services
│   ├── types
│   └── utils
├── routes
│   ├── (admin)/admin              when the project has a dashboard
│   ├── (auth)
│   ├── (public)
│   │   ├── contact
│   │   └── +page.svelte
│   └── +layout.svelte
├── hooks.server.ts                when needed
├── app.css
├── app.d.ts
├── app.html
└── env.ts
static/                            img/, logo/, favicon.svg, robots.txt
```

- Routes are thin: they load data and compose feature components only. Public pages go in `routes/(public)`, auth in `routes/(auth)`, admin in `routes/(admin)/admin`.
- Every feature page uses the same pattern: `<Page>.svelte` + `sections/`, all in that page's folder. Admin pages follow the same pattern under `features/admin/<page>/`.
- `content.ts` rule: lists and repeated data (FAQ items, programs, testimonials, steps, cards, links) go in the page's `content.ts` and the section loops over them. Single headings and one-off sentences stay inline in the section component. Do not create `content.ts` for a page with no lists.
- `<page>.svelte.ts` rule: create it only when state is shared by two or more sections of that page (tabs, filters, selected item). State used by one component stays inside that component. Do not create empty or speculative files.
- Site-wide content (navigation, contact details, footer links) lives in `src/lib/constants`.
- `src/lib/assets` is only for imported images, SVGs, fonts, and asset path maps. Never put page text there; never invent other folders for content.
- `src/lib/server` or `*.server.ts` is server-only; never import it from client code.
- `src/hooks.server.ts` / `src/hooks.client.ts` sit in `src/`, not in `routes/`.
- Import with the `#lib` alias and a file extension: `import { x } from '#lib/utils/x.ts'`. `$lib` is not configured. Import modules directly; do not create barrel `index.ts` files.
- Tests sit next to the file they test: `contact.ts` → `contact.test.ts`.

# Routing and data

- Route files use the `+` prefix (`+page.svelte`, `+layout.svelte`, `+page.server.ts`, `+page.ts`, `+layout.server.ts`, `+layout.ts`, `+server.ts`, `+error.svelte`).
- Server `load` in `+page.server.ts` / `+layout.server.ts` (DB access, private env), typed `PageServerLoad` / `LayoutServerLoad`.
- Universal `load` in `+page.ts` / `+layout.ts`, typed `PageLoad` / `LayoutLoad`.
- Form mutations go in `actions` in `+page.server.ts`, typed `Actions`.
- Prefer `+page.server.ts` over `+server.ts` unless it is a public API. Return `Response.json()` / `new Response()`; `json()` and `text()` are deprecated.
- Remote functions are experimental and not enabled; do not add them unless asked (then enable `experimental.remoteFunctions` and `compilerOptions.experimental.async` on the `sveltekit()` plugin).
- No shared mutable state in server modules. No side effects inside `load`.

# Styling

- `src/app.css` is the global stylesheet (imported once in the root `+layout.svelte`). Shared tokens (colors, type, radius, shadows, z-index) and base resets live there as CSS variables. Use them via `var(--name)` in scoped `<style>` blocks. No hardcoded colors when a token exists.
- Pass dynamic values with the `style:` directive. Never use the `style` attribute.
- Short scoped class names (`hr`, `hr-w`, `ft-nav`, `cta-btn`), never verbose ones (`homepage-hero-section`).
- Prefer CSS over JavaScript.

# Icons

- Always use `@lucide/svelte` for icons. Import one icon per file for tree-shaking: `import Inbox from '@lucide/svelte/icons/inbox'`.
- Render with `aria-hidden="true"` (unless the icon is the only label), `strokeWidth={2}`, and a `size` that fits the layout. Icon-only buttons need an `aria-label`.
- Do not install other icon packages or inline raw SVG icons in components.
- `@lucide/svelte` is listed in `vite.config.ts` under `ssr.noExternal`.

## Custom icons

Use a custom icon only for brand logos (WhatsApp, Telegram, Facebook, etc.) or an icon Lucide does not have, and only when the task explicitly asks for it.

- Location: `src/lib/components/ui/icons/`, one component per icon.
- Naming: PascalCase with an `Icon` suffix, for example `WhatsappIcon.svelte`, `TelegramIcon.svelte`.
- Import: `import WhatsappIcon from '#lib/components/ui/icons/WhatsappIcon.svelte'`.
- Each icon component:
  - accepts typed props `size` (number, default 20) and an optional `title` string;
  - renders one `<svg>` with a fixed `viewBox`, `width` and `height` from `size`, and `fill="currentColor"` (or `stroke="currentColor"` for outline icons) so it inherits text color, unless the brand requires its official colors;
  - uses `aria-hidden="true"` when there is no `title`; with a `title`, uses `role="img"` and renders `<title>`;
  - has no external requests, no `style` attribute, and no scripts beyond props.
- Reserved icons: icons listed below are part of the project. Do not delete, rename, replace them with Lucide, or change their markup or behavior unless the user explicitly asks. Add a row when a new custom icon is created.

| File | Use |
| --- | --- |
| `FacebookIcon.svelte` | Facebook social link in the footer |
| `GithubIcon.svelte` | GitHub social link in the footer |
| `InstagramIcon.svelte` | Instagram social link in the footer |

# TypeScript

Strict mode. Never use `any` or `@ts-ignore`. Exported functions have explicit return types. `interface` for object shapes, `type` for unions and utilities.

# Environment variables

- Declare every variable in `src/env.ts` with `defineEnvVars` (private by default; `public: true` for browser-safe values; `static: true` only for build-time inlining).
- Import from `$app/env/private` (server only) or `$app/env/public`. Never use `$env/*` modules.
- Never hardcode secrets or commit `.env` files. Set the same names in the hosting dashboard.

# Deployment

SvelteKit config goes in the `sveltekit()` plugin in `vite.config.ts` (`svelte.config.js` is not supported). `adapter-auto` picks the platform at deploy time. Use `@sveltejs/adapter-vercel` only when a Vercel-specific option is required. Prefer the Node.js runtime; Edge only when a route requires it.

# Code output

- Clean, production-ready code. No comments, no placeholders, no mock code.
- Surgical changes only. Do not refactor unrelated code.

<!-- END:sveltekit-agent-rules -->