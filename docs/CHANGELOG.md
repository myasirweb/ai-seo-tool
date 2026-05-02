# Changelog

## [1.0.0] — 2026-05-01

### Phase 0 — Project Planning
- Defined 6-phase build plan for AI SEO Tool
- Chose Next.js 14 App Router, OpenAI GPT-4o-mini, MongoDB/Mongoose, Tailwind CSS

### Phase 1 — UI Prototype
- Built all reusable UI components: Button, Input, Textarea, Card, Badge, Spinner, CopyButton
- Built layout components: Sidebar, Topbar, MobileNav
- Built dashboard layout with responsive sidebar

### Phase 2 — Foundation Files
- Set up MongoDB connection with global singleton pattern (`lib/mongodb.ts`)
- Set up OpenAI client with `callOpenAI()` and `parseJSON()` helpers (`lib/openai.ts`)
- Built Flesch-Kincaid readability engine (`lib/readability.ts`)
- Defined all TypeScript types: keyword, meta, contentScore, readability
- Defined all Mongoose models: KeywordResult, MetaResult, ContentScoreResult, ReadabilityResult
- Wrote all 4 system prompts (`constants/prompts.ts`)

### Phase 3 — API Routes
- `POST /api/keywords` — AI keyword generation + MongoDB save
- `POST /api/meta` — AI meta tag generation + MongoDB save
- `POST /api/content-score` — AI content scoring + MongoDB save
- `POST /api/readability` — Flesch-Kincaid + AI suggestions + MongoDB save
- `GET /api/history` — Fetches last 20 records per tool

### Phase 4 — Dashboard Pages
- Built all 4 tool pages with hooks: useKeywords, useMeta, useContentScore, useReadability
- Added useToast hook and ToastContext for cross-component notifications
- Built feature components: KeywordInput, KeywordTable, MetaForm, MetaPreview,
  ContentInput, ScoreGauge, ScoreBreakdown, ReadabilityInput, ReadabilityScore

### Phase 5 — Landing Page
- Built full landing page: Navbar, HeroSection, StatsSection, FeaturesSection,
  HowItWorksSection, ToolPreviewSection, CTASection, Footer

### Phase 6 — Polish & Production Readiness
- Added skeleton loaders (Skeleton.tsx) for all loading states
- Added ErrorBox.tsx, error.tsx boundary, and loading.tsx for dashboard
- Added EmptyState.tsx replacing all inline empty state blocks
- Added Toast notification system (Toast.tsx, useToast.ts, ToastContext)
- Added MobileNav bottom bar for mobile; hid desktop Sidebar on mobile
- Fixed mobile responsiveness across all pages and landing sections
- Added 404 pages: app/not-found.tsx and app/dashboard/not-found.tsx
- Added per-page metadata (server component pattern with *View.tsx)
- Added robots.txt and sitemap.ts
- Configured next.config.mjs: poweredByHeader: false
- Added smooth scroll to globals.css
- Fixed ESLint errors in lib/mongodb.ts
- All TypeScript checks, ESLint, and production build passing clean
