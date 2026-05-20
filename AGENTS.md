## Project Configuration

- **Language**: TypeScript
- **Package Manager**: bun
- **Add-ons**: sveltekit-adapter, drizzle, better-auth, mcp

---

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available Svelte MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.

<!--VITE PLUS END-->

# Ultracite Code Standards

This project uses **Ultracite**, a zero-config preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `bun x ultracite fix`
- **Check for issues**: `bun x ultracite check`
- **Diagnose setup**: `bun x ultracite doctor`

Biome (the underlying engine) provides robust linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags

### Framework-Specific Guidance

**Next.js:**

- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components

**React 19+:**

- Use ref as a prop instead of `React.forwardRef`

**Solid/Svelte/Vue/Qwik:**

- Use `class` and `for` attributes (not `className` or `htmlFor`)

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Biome Can't Help

Biome's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Biome can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Biome. Run `bun x ultracite fix` before committing to ensure compliance.

---

# Codebase Reference

> **Agent Maintenance Rule:** After implementing changes, fixes, or new features, read this section, then update the relevant entries below to keep the documentation in sync with the code. Add new sections when introducing new domains, and remove or edit obsolete ones.

## Project Overview

**Taberna** is a shopping list web application built with SvelteKit 5 and deployed to Cloudflare Workers. It supports anonymous list viewing and toggling via public URLs, while authenticated users can create, edit, and manage lists via Google OAuth. The UI is styled with UnoCSS and uses Indonesian (`id`) as the primary locale via `svelte-i18n`.

## Tech Stack

| Layer         | Technology                                                    |
| ------------- | ------------------------------------------------------------- |
| Framework     | SvelteKit 2 + Svelte 5 (runes mode enforced)                  |
| Adapter       | `@sveltejs/adapter-cloudflare`                                |
| Database      | Cloudflare D1 (production) / better-sqlite3 (local dev)       |
| ORM/Query     | Drizzle ORM (schema) + Kysely (runtime queries)               |
| Auth          | Better Auth (minimal) with Kysely adapter — Google OAuth only |
| Styling       | UnoCSS + `@unocss/reset/tailwind-v4.css`                      |
| UI Primitives | bits-ui, vaul-svelte                                          |
| Forms         | `@tanstack/svelte-form` + Zod validation                      |
| Icons         | `@iconify-svelte/tabler/*`                                    |
| i18n          | svelte-i18n (fallback: `id`)                                  |
| Tooling       | Vite+, Ultracite (Biome), TypeScript 6                        |

## Directory Structure

```
src/
├── app.d.ts                    # Global App types (Locals, Platform, Session, User)
├── app.html                    # HTML template
├── hooks.server.ts             # Better Auth session handler + D1 binding guard
├── lib/
│   ├── client/
│   │   ├── api.ts              # Fetch wrapper + withToast utility
│   │   └── auth-client.ts      # Better Auth Svelte client
│   ├── components/
│   │   ├── action/
│   │   │   ├── list-delete.svelte
│   │   │   ├── list-rename.svelte
│   │   │   └── list-share.svelte
│   │   ├── item/
│   │   │   └── item-checkbox.svelte
│   │   ├── layout/
│   │   │   ├── layout-header.svelte
│   │   │   └── layout-hero.svelte
│   │   ├── list/
│   │   │   ├── list-action.svelte
│   │   │   ├── list-card.svelte
│   │   │   ├── list-container.svelte
│   │   │   ├── list-empty.svelte
│   │   │   └── list-new.svelte
│   │   ├── user/
│   │   │   ├── user-button.svelte
│   │   │   ├── user-menu.svelte
│   │   │   └── user-profile.svelte
│   │   └── wrapper/
│   │       ├── wrapper-dialog.svelte
│   │       ├── wrapper-drawer.svelte
│   │       ├── wrapper-note.svelte
│   │       └── wrapper-popover.svelte
│   ├── i18n/
│   │   ├── index.ts            # svelte-i18n init (locale: id)
│   │   └── id.json             # Indonesian translation strings
│   ├── server/
│   │   ├── auth.ts             # Better Auth factory (createAuth)
│   │   ├── db/
│   │   │   ├── index.ts        # getKysely factory (D1 / SQLite)
│   │   │   ├── query.ts        # ListQueries + ItemQueries (Kysely)
│   │   │   └── schema/
│   │   │       ├── auth.ts     # Better Auth tables (user, session, account, verification)
│   │   │       ├── item.ts     # Item table schema
│   │   │       └── list.ts     # List table schema
│   │   ├── helpers.ts          # getDb, getUserId, unauthorized, notFound
│   │   └── serializers.ts      # DB row → app type converters
│   ├── actions/
│   │   ├── auth.ts             # signInWithGoogle, signOut
│   │   ├── item.ts             # addItems, toggleItem, editItem, deleteItem, resetItems
│   │   └── list.ts             # shareList, renameList, deleteList
│   ├── types.ts                # Item, List, ListWithStats interfaces
│   ├── validators/
│   │   └── list.ts             # Zod schema for list creation
│   └── utils/
│       ├── id.ts               # CUID2 generators (6-char item, 8-char list)
│       └── parse.ts            # parseInput, titleCase
└── routes/
    ├── +layout.svelte          # Root layout (ModeWatcher for dark/light)
    ├── +page.server.ts         # Redirect authed users → /app
    ├── +error.svelte           # Empty error page (stub)
    ├── auth/
    │   ├── +layout.svelte
    │   ├── +page.svelte        # Google OAuth sign-in
    │   └── +page.server.ts     # Redirect authed users → /app
    ├── app/
    │   ├── +layout.svelte      # App shell (Toaster, LayoutHeader)
    │   ├── +page.server.ts     # Redirect unauthed → /auth
    │   ├── +page.ts            # Load user lists from /api/lists
    │   ├── +page.svelte        # Dashboard (LayoutHero + ListContainer)
    │   ├── list/
    │   │   └── [id]/
    │   │       ├── +page.ts    # Load list + items
    │   │       └── +page.svelte # List detail (tabs, search, add drawer)
    │   └── setting/
    │       └── +page.svelte    # Empty settings page (stub)
    └── api/
        ├── lists/
        │   └── +server.ts      # GET  /api/lists
        ├── list/
        │   ├── +server.ts      # POST /api/list
        │   └── [id]/
        │       └── +server.ts  # GET / PATCH / DELETE /api/list/:id
        └── item/
            ├── +server.ts      # POST /api/item
            └── [id]/
                └── +server.ts  # PATCH / DELETE /api/item/:id
```

## Database Schema

### Application Tables

**`list`**

- `id` (text, PK, CUID2 8 chars)
- `user_id` (text, FK → user.id, nullable)
- `name` (text)
- `created_at` / `updated_at` (integer, timestamp_ms)

**`item`**

- `id` (text, PK, CUID2 6 chars)
- `list_id` (text, FK → list.id, cascade delete)
- `name` (text)
- `checked` (integer boolean, default 0)
- `created_at` / `updated_at` (integer, timestamp_ms)

### Auth Tables (Better Auth)

**`user`**, **`session`**, **`account`**, **`verification`** — standard Better Auth schema with SQLite integer timestamps.

## API Endpoints

| Method | Path            | Auth    | Description                                      |
| ------ | --------------- | ------- | ------------------------------------------------ |
| GET    | `/api/lists`    | Yes     | Get all lists for current user (with item stats) |
| POST   | `/api/list`     | Yes     | Create a new list (default name: "Daftar Baru")  |
| GET    | `/api/list/:id` | No      | Get list + items (public, sorted by createdAt)   |
| PATCH  | `/api/list/:id` | Yes     | Rename list (owner only)                         |
| DELETE | `/api/list/:id` | Yes     | Delete list (owner only, cascade-deletes items)  |
| POST   | `/api/item`     | Yes     | Add item to list (any authenticated user)        |
| PATCH  | `/api/item/:id` | Partial | Toggle checked (anon OK); edit name (owner only) |
| DELETE | `/api/item/:id` | Yes     | Delete item (owner only)                         |

## Auth Flow

1. **Server hook** (`hooks.server.ts`) checks for D1 binding, creates `auth` instance, resolves session from request headers, and attaches `locals.auth`, `locals.session`, `locals.user`.
2. **Client** uses `authClient` from `better-auth/svelte` for `useSession`, `signIn.social`, `signOut`. Components call `authClient.useSession()` directly where needed.
3. **Auth guards**: `/app/*` redirects unauthenticated to `/auth`; `/auth` redirects authenticated to `/app`.

## Component Hierarchy

```
+layout.svelte (root)
├── ModeWatcher
└── routes/+layout.svelte
    └── app/+layout.svelte
        ├── LayoutHeader
        │   ├── back nav / title (list name or user greeting)
        │   ├── ListAction (detail page, owner only)
        │   └── UserButton (dashboard or non-owner detail)
        ├── Toaster
        └── +page.svelte (dashboard)
            ├── LayoutHero
            ├── ListContainer
            │   ├── ListCard (grid, tappable → detail)
            │   └── ListNew (drawer form)
            └── list/[id]/+page.svelte
                ├── Tabs (active / completed)
                ├── ItemCheckbox (edit/delete icons: owner only)
                └── WrapperNote (add item drawer: auth only)
```

## Action Patterns

All client actions (item + list mutations) use `withToast` from `api.ts` for consistent UX feedback:

- **Loading**: `"Memuat..."`
- **Success**: i18n key per action (e.g., `"toast.item.add_success"`)
- **Error**: Generic Indonesian `"Terjadi kesalahan"` (never exposes English API error messages)

Sequential operations (loops) are wrapped in async IIFEs so `withToast` shows one toast per batch.

## i18n

- Single locale: `id` (Indonesian)
- Fallback: `id`
- All copy lives in `src/lib/i18n/id.json`
- No English fallback
- Components read via `$_('key')` or `get(_)('key')` in `.ts` files

## Key Architectural Decisions

- **No client stores** — State is server-driven via `+page.ts` loads. Mutations call `invalidateAll()` to refresh data.
- **No offline/PWA support** — App requires network. No service worker, no IndexedDB, no sync architecture.
- **No email/password auth** — Google OAuth only for simplicity.
- **No auth context wrapper** — Components call `authClient.useSession()` directly where needed.
- **Owner checks on client** — `isOwner` derived from `$session.data?.user?.id === data.list?.userId`. Server API enforces ownership on mutations.
- **Anonymous access** — Anyone with a list URL can view and toggle items. Edit/delete/add require authentication (add: any auth user; edit/delete: owner only).
- **Batch operations** — `addItems` parses comma/newline-separated strings. `resetItems` unchecks multiple items. Both use single `withToast` per batch.

## Empty / Stub Files

- `src/routes/+error.svelte` — completely empty; needs error handling UI
- `src/routes/app/setting/+page.svelte` — completely empty; settings page not implemented
- `src/lib/index.ts` — placeholder only

## Testing

### Running Tests

```bash
# Vitest (unit + integration, excludes Playwright)
vp test run               # all vitest tests
vp test run --watch       # watch mode

# Playwright E2E
bunx playwright test      # requires vp dev running, or auto-starts it
```

### Test Architecture

**Vitest (89 tests, 10 files)** — configured in `vite.config.ts` via `test` block. Uses `happy-dom` for component tests, default node environment for server tests. `src/test/setup.ts` adds `@testing-library/jest-dom` matchers.

**Test DB** — `src/test/db.ts` creates an in-memory SQLite via `sql.js` (pure JS, no native deps). Provides a `Kysely<DB>` instance wrapped with `CamelCasePlugin`. Schema is created via raw SQL matching the Drizzle definitions. Helper functions seed test user, lists, and items.

**API handler tests** — `src/test/api-utils.ts` uses `vi.mock` to mock `getDb` and `getUserId` helpers. Each handler receives a constructed `RequestEvent` with mocked platform/locals. Auth bypassed by setting `getUserIdMock` return value.

### Test File Locations

| File                                      | Type        | Tests                                    |
| ----------------------------------------- | ----------- | ---------------------------------------- |
| `src/lib/utils/id.test.ts`                | Unit        | CUID2 ID generation                      |
| `src/lib/utils/parse.test.ts`             | Unit        | Input parsing + titleCase                |
| `src/lib/server/serializers.test.ts`      | Unit        | DB row → app type conversion             |
| `src/lib/server/db/query.test.ts`         | Integration | ListQueries + ItemQueries against sql.js |
| `src/lib/client/api.test.ts`              | Unit        | Fetch wrapper + ApiError                 |
| `src/routes/api/lists/server.test.ts`     | Integration | GET /api/lists                           |
| `src/routes/api/list/server.test.ts`      | Integration | POST /api/list                           |
| `src/routes/api/list/[id]/server.test.ts` | Integration | GET/PATCH/DELETE /api/list/:id           |
| `src/routes/api/item/server.test.ts`      | Integration | POST /api/item                           |
| `src/routes/api/item/[id]/server.test.ts` | Integration | PATCH/DELETE /api/item/:id               |
| `tests/public-list.spec.ts`               | E2E         | Public list viewing, item toggling       |
| `tests/auth-redirects.spec.ts`            | E2E         | Auth redirect guards                     |

### Component Tests

Component tests with `@testing-library/svelte` are not currently committed due to Svelte 5 SSR/client resolution conflicts with `vite-plus`'s bundled Node runtime. E2E Playwright tests cover component behavior in real browsers instead. When vite-plus-test runtime catches up, component tests can be added using `// @vitest-environment happy-dom`.

### E2E Auth Strategy

E2E tests cover public (unauthenticated) flows only: list viewing, item toggling, and redirect guards. Auth-gated features (create list, delete, rename, add items) are covered by vitest API integration tests where auth is mocked via `getUserId`. The dev server requires `NODE_ENV=development` for local SQLite fallback when D1 binding is unavailable. `hooks.server.ts` and `auth.ts` were updated to accept `null` D1 database in dev mode.

### Bug Fixed

- `ListQueries.update` (query.ts) had a bug: `execute()` with WHERE filter silently no-ops when user doesn't own list, but subsequent `SELECT` still returned the row. Fixed by checking `executeTakeFirst().numUpdatedRows` before the SELECT. This bug was discovered by the test suite.

## Maintenance Log

- _2026-05-18_ — Added comprehensive test suite: 89 Vitest tests (utils, serializers, DB queries, all 7 API endpoint handlers, client API wrapper) + 7 Playwright E2E tests (public list viewing, item toggling, auth redirects). Created test infrastructure: `src/test/db.ts` with pure-JS `sql.js` in-memory SQLite, `src/test/api-utils.ts` for handler mocking. Fixed `ListQueries.update` bug where non-owner updates silently succeeded. Made `hooks.server.ts` tolerant of missing D1 binding in dev mode.
- _2026-05-17_ — Added search functionality in completed items tab with empty state. Implemented auth-gated UI: edit/delete icons in `ItemCheckbox` and `ListAction` in header only visible to list owners. Add-item drawer gated to authenticated users only. Unified all action error handling via `withToast` with i18n messages and generic Indonesian error fallback. Refactored `item.ts` and `list.ts` to use `withToast` consistently.
- _2026-05-05_ — Replaced root page auto-redirect with a list dashboard showing all user lists (date, item count). Added rich item stats to `GET /api/lists`, removed the 1-list limit, added `DELETE /api/list/:id` endpoint, and added list deletion with confirmation dialog.
