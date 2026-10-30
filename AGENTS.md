# AGENTS.md — hb-enzebat (سامانه حضور و غیاب)

Instructions for any agent (or human) working in this repository. Read this before your first tool call.

**Non-negotiable rule: this repo is graph-first.**
Every question about the code is answered from the local codebase-memory graph (project `hb-enzebat`) **before**
any file is opened. `read` and `grep` are the last step, used only for the exact line range the graph handed you —
never for exploration.

Why: opening one whole file costs thousands of tokens; a `search_graph` row or a `get_code_snippet` call costs
tens. Same answer, roughly 10–50× less context, so less cost and less latency — and the graph stays in sync with
the repo instead of drifting like a stale doc.

Tool names below are the cbm server's tools; in this harness they are exposed as `mcp__cbm__*`
(`mcp__cbm__search_graph`, `mcp__cbm__get_code_snippet`, …).

---

## 1. Graph-first workflow (mandatory)

Order of operations for **any** task:

1. `index_status(project="hb-enzebat")` — once per session. Confirms the graph is `ready` and shows coverage gaps.
   Do **not** re-index blindly at the start of every turn.
2. `search_graph` — find the symbol/concept you need. You get `qn` (qualified name), `file`, `lines`, fan-in/out.
   Use `name_pattern`/`qn_pattern` to refine instead of repeating paraphrased queries.
3. `get_file_outline(file_path=…)` — "what is in this file?" without reading it. Beats `read` for orientation.
4. `get_code_snippet(qualified_name=…)` — the body of one symbol. `source_mode="outline"` first, then
   `start_line`/`max_lines` for just the slice you need; `include_neighbors=true` only when call context matters.
5. `trace_path` / `detect_changes` / `query_graph` — callers, callees, impact of your edit, multi-hop questions.
6. `get_architecture` — project shape: layers, hotspots, entry points, clusters. Use it instead of `ls -R` +
   opening 20 files.
7. **Only now** use `read` on the specific `file:line` range, or `grep` for a literal string that is not a symbol
   (a Persian UI string, a CSS class, an env var name).

If the tools are unavailable, say so and ask before falling back to brute-force reading — do not silently burn
context reading files.

## 2. Question → tool

| You need | Call |
| --- | --- |
| Where is `X` defined / what matches this concept | `search_graph(query="X")` |
| What is in file `F` | `get_file_outline(file_path="F")` |
| The code of `X` (and only that) | `get_code_snippet(qualified_name="…")` |
| Who calls `X` / what does `X` call | `trace_path(function_name="X", direction="inbound"/"outbound")` |
| What will my current diff break | `detect_changes(project="hb-enzebat")` |
| Multi-hop / aggregation ("which hooks are used from more than 5 pages") | `query_graph(cypher)` |
| Layers, hotspots, entry points, cluster of a feature | `get_architecture(aspects=[…])` |
| Is the graph fresh, what was not indexed | `index_status`, `check_index_coverage` |
| Refresh after a big refactor | `index_repository(mode="moderate")` |

## 3. Token discipline

- **One question, one call.** Don't fire `search_graph` four times with reworded queries; refine the same call.
- Keep `limit` small (≤10 for `search_graph`, ≤50 for `trace_path`) and page only if the first page missed.
- `get_code_snippet` before `read`. Never request a 600-line container to use 30 lines of it.
- Reuse `qn`s and `file:line` you already learned instead of re-searching; a second lookup is a wasted call.
- Unexplored is not "open a folder": `get_architecture` answers shape questions in one call.
- Never read `node_modules/`, `.next/`, `app/generated/prisma/`, `public/assets` — excluded on purpose.
- Persian copy, Tailwind classes and JSX markup are noise for reasoning. Ask for the symbol, not the file.
- Big task? Get outline → map the change → touch the smallest symbol set. Don't paste whole files into context.

## 4. Keeping the index useful

- Project name: **`hb-enzebat`**, root `D:/projects/hb/hb-enzebat`, mode `moderate` (semantic edges included) is plenty.
- Re-index **only** when the graph is demonstrably stale: you added/renamed/deleted files, a symbol you know exists
  is missing, or you finished a large refactor. Then `index_repository(repo_path="D:/projects/hb/hb-enzebat", mode="moderate")`.
- This repo is not the MCP session's watched project, so **nothing auto-refreshes** — that is expected, not an error.
- Files reported by `check_index_coverage`/`parse_partial` (e.g. `app/globals.css`) may be partial → use `grep` there.
- `.cbmignore` (repo root) is authoritative for what enters the graph: it drops `app/generated/` (the Prisma client),
  `.next/`, lockfiles and `tsconfig.tsbuildinfo`. That is why the graph stays ~1.6k nodes instead of ~2.4k. Every new
  generated/vendored tree goes there, not only into `.gitignore` — then re-index once.

## 5. What this project is

Persian (RTL) attendance-management app. Next.js 16 App Router (no `src/`, `@/*` → repo root), React 19, TypeScript
strict, Tailwind v4, Prisma 7 + `@prisma/adapter-pg` (client generated into `app/generated/prisma`, gitignored),
TanStack Query v5, react-hook-form, react-multi-date-picker, react-toastify, axios.
Roles: `ADMIN`, `CITY_ADMIN` (scoped to their city), `TEACHER`, `STUDENT`.

## 6. Layout

| Path | Content |
| --- | --- |
| `app/` | App Router pages; panels `admin-panel`, `teacher-panel`, `student-panel`, `auth` |
| `app/api/**/route.ts` | the whole backend (route handlers, Prisma, JWT) |
| `app/call-api/` | secondary admin UI whose only job is to exercise the API endpoints by hand |
| `components/Form/` | form primitives + RHF wrappers: Input, Select, DatePicker, Button, CheckBox, FilterSection, FormLayout |
| `components/others/` | Card, Modal, PageTitle, RenderLogic, ScrollPagination, Skeleton, Tooltip, DropDown, Chips, KeyValue |
| `components/layouts/` | AdminLayout, PanelLayout, LoginLayout, TopBar, BottomNavigation |
| `components/pages/<panel>/` | one folder per page: components, `hooks/use<Page>Page.ts`, `*.types`, `*.constances` |
| `components/svg/` | hand-written icon components |
| `constances/` | shared constants: `routerLinks`, colors, zIndexes, regexes, formPatterns, cookie/localStorage keys, panels |
| `hooks/` | cross-page client hooks (modal, query params, outside click, delayed call…) |
| `lib/prisma.ts` | the single PrismaClient singleton (pg adapter + dev global cache) |
| `request/` | `axiosInstance`, `constances/apies.ts`, `useFetchData`, `useMutateData`, response/error helpers |
| `utils/backend/` | server-only: `auth/` (handleAuth, withAuth, withRoleAuth, verifyToken), `response/` |
| `utils/` (rest) | `authentication/` (token/JWT/crypto), `inputOperations/`, `separator/`, `promises/`, small helpers |
| `prisma/` | `schema.prisma`, `migrations/` (+ `prisma.config.ts` at root: reads `DATABASE_URL`) |
| `types/` | shared TS helper types |

## 7. Conventions

**Server (`app/api/**/route.ts`)**
- Export `GET/POST/PATCH/DELETE` wrapped by `withRoleAuth([...roles], async (req, user) => …)` or `withAuth(…)`
  from `@/utils/backend/auth/*`. Never read the JWT by hand.
- Respond only via `NextSuccessResponse({ data })` (`{ success: true, …data }`) and
  `NextErrorResponse({ error, status = 400 })` (`{ error }`). User-facing messages are Persian.
- Validate input manually (`await req.json()`, `new URL(req.url).searchParams`). There is no zod layer — don't add one.
- Use the singleton `import prisma from "@/lib/prisma"`; every `CITY_ADMIN` path must be scoped by `user.cityId`.
- Keep handlers thin; shared logic belongs in `utils/backend/*`.

**Client**
- Route pages stay thin: `'use client'` page → content component + `use<Page>Page` hook that owns fetching,
  filtering, derived lists and navigation.
- All HTTP goes through `useFetchData` / `useMutateData` with an `APIES.*` value. New endpoint → add to
  `request/constances/apies.ts`; new page path → add to `constances/routerLinks.ts`. Never inline a URL or route.
- Loading / error / empty states render through `RenderLogic`. Toasts: `toastPromise().then((toast) => toast.success('…'))`
  — the helper lazily imports react-toastify, so never import `toast` directly; calls usually sit in a mutation's `onSuccess`.
- Forms: react-hook-form + the `*Form` wrappers (`InputForm`, `SelectForm`, `DatePickerForm`), field names pulled
  from a `*.constances` file; filters use `FilterSection` + `useFilter`. List pages fetch once and filter/paginate
  client-side (`ScrollPagination`).
- A hook that reads `useSearchParams` must be wrapped in `SuspenseLoading`.
- Styling: Tailwind utilities with the project's semantic tokens (`text-primary`, `bg-…`), Persian RTL copy.

**Data layer**
- Models: `User` (`mobile` unique, `firstName/lastName`, `cityId`), `UserRole` (`role` enum), `Class`
  (`teacher` + `students` m2m + optional `city`), `Attendance` (`date`, `presents[]`, `excusedAbsences[]`), `City`.
- `prisma/schema.prisma` has **no `url`** in `datasource`: `prisma.config.ts` injects `env("DATABASE_URL")` and
  `lib/prisma.ts` builds the pg adapter. Nothing else may construct a PrismaClient.
- Schema change = edit `schema.prisma` + `npx prisma migrate dev --name <snake_case>` + `npx prisma generate`.
  Never edit an applied migration, never edit `app/generated/prisma/**`.

## 8. Commands

`package-lock.json` is present → use **npm**.

```bash
npm run dev          # next dev
npm run build        # next build (this is also the type check)
npm run lint         # eslint flat config (no-explicit-any is intentionally off)
npm run db:studio    # prisma studio
npx prisma generate  # regenerate app/generated/prisma
npx prisma migrate dev --name <snake_case_name>
```

There is no test runner, and `npm run db:test` points at a missing `scripts/test-database.ts` — don't trust it and
don't add a framework unless asked.

## 9. Don'ts

- Don't open files "to get oriented" — `get_architecture` / `search_graph` first.
- Don't re-index every turn; it is the expensive call. Once per big task, or when results are provably stale.
- Don't hand-edit `app/generated/prisma/**`, `.next/**`, `package-lock.json`, or applied migrations.
- Don't rewrite existing UI primitives — extend the existing component/hook. Most needs already exist (≈1.6k nodes).
- Don't switch package managers, reformat unrelated files, or add a dependency the stack already covers.
- Don't invent endpoints: request URL = axios `baseURL` `/api/` + `APIES` value.
- Don't read or print secrets. Env var names only: `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV`.

## 10. MCP wiring (maintenance)

- Server name **`cbm`** → tools `mcp__cbm__*`. Keep this name everywhere; every example above assumes it.
- Command **`codebase-memory-mcp`**, resolved from `PATH` (installed to
  `%LOCALAPPDATA%\Programs\codebase-memory-mcp\codebase-memory-mcp.exe`). If a machine has it elsewhere, change
  `command` locally — never commit a machine-specific absolute path.
- **Committed with the repo** (this is what makes the graph available to anyone who opens the project):
  - `.mcp.json` — project scope for Claude Code and any client reading `mcpServers`
  - `.vscode/mcp.json` — VS Code workspace config (VS Code uses the `servers` key, not `mcpServers`)
  - Cursor: copy the `.mcp.json` object into `.cursor/mcp.json`. JetBrains AI/ACP clients have to be configured by
    hand in the IDE; there is no project file for them.
- **Per-user, not in the repo:** DSH loads MCP servers from its profile patch
  `~/.dsh/profiles/<profile>/cordis.patch.yml` (no repo-level config), and
  `codebase-memory-mcp install --clients=…` wires other clients user-wide (e.g. `%APPDATA%\Code\User\mcp.json`).
  So the two files above are additive, not a replacement for that install step.
- First run on a new machine: `codebase-memory-mcp install --clients=claude,vscode` once, then index this repo once.
- Indexed project name **`hb-enzebat`**; renaming the project means updating this file and re-indexing.
