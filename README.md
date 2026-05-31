# Smart Link

Smart business link platform for local companies — booking, CRM, and AI-indexable profiles.

## Repo layout

- `smart-link-app/` — Next.js application
- `docs/` — operator-facing product and rollout docs
- `templates/` — copy/templates for distribution surfaces
- `plan.md` — project roadmap and operating rules
- `logs/` — autonomous execution notes and reconciler logs

## App quick start

```bash
cd smart-link-app
npm install
npm run dev
```

Open http://localhost:3000

## Deployment

Vercel is configured from the repo root via `.vercel.json`, with the Next.js app living in `smart-link-app/`.

## Autonomous process notes

- `plan.md` is the operating-rules source of truth for Smart Link board work.
- QA work must be dispatched as tiny cards: HTTP-only checks, one route-group at a time, or docs-only handoff updates.
- Do not create broad all-in-one smoke tasks that try to verify routes, APIs, metadata, and docs in one swing. Split first, then fan results into a parent QA card if you need a bigger milestone verdict.
