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
