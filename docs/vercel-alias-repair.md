# Vercel alias repair: `smart-link-mu.vercel.app`

Status: NOT FIXED. This note is the manual repair runbook for the broken vanity alias.

## Honest public URL right now

Use `https://smart-link-app-swart.vercel.app/`.

## Broken vanity URL

Do not use `https://smart-link-mu.vercel.app/` right now. It returns 404 because it is attached to the wrong Vercel project/deployment.

## Evidence from deploy verification

From task `t_8a872aa3`:

- Deploying from repo root targeted Vercel project `smart-link` (`/opt/data/autonomous/smart-link/.vercel/project.json`), not the app project.
- That wrong deployment was `https://smart-link-ou4irqh6x-ihorbohdanov-5540s-projects.vercel.app` and `https://smart-link-mu.vercel.app/` returned HTTP 404 after it was aliased there.
- Deploying from `/opt/data/autonomous/smart-link/smart-link-app` targeted Vercel project `smart-link-app` (`/opt/data/autonomous/smart-link/smart-link-app/.vercel/project.json`).
- The working deployment was `https://smart-link-f0l04qt1m-ihorbohdanov-5540s-projects.vercel.app` and Vercel auto-assigned `https://smart-link-app-swart.vercel.app/`.
- Smoke check on `https://smart-link-app-swart.vercel.app/` returned HTTP 200 and showed the homepage CTA `Request Your Free Pilot` with the expected mailto target.

Local linked project proof:

- repo root `.vercel/project.json` -> projectName `smart-link`
- app dir `.vercel/project.json` -> projectName `smart-link-app`

## Safest manual repair path in Vercel dashboard

Preferred path: fix this in the Vercel dashboard, not in an automated worker.

1. Open the Vercel dashboard for team `ihorbohdanov-5540s-projects`.
2. Open project `smart-link`.
3. Go to Settings -> Domains (or the project Domains screen).
4. Find alias/domain `smart-link-mu.vercel.app`.
5. Remove that alias from project `smart-link` if it is still attached there.
6. Open project `smart-link-app`.
7. Go to Settings -> Domains.
8. Add or assign `smart-link-mu.vercel.app` to the current production deployment for `smart-link-app`.
9. If Vercel asks you to pick a deployment, choose the production deployment that already serves the working app URL (`smart-link-app-swart.vercel.app`), not the repo-root `smart-link` deployment.

## Safest CLI form if a human runs it manually

Vercel CLI help confirms the schemeless form is the intended syntax:

`vercel alias set <deployment-hostname> <alias-hostname>`

Example for this repair:

`vercel alias set smart-link-f0l04qt1m-ihorbohdanov-5540s-projects.vercel.app smart-link-mu.vercel.app`

Why this was not executed here:

- The worker previously hit command-safety approval when trying the schemeless `.vercel.app` form.
- Retrying with `https://...` was wrong for Vercel alias input and was rejected as an invalid alias hostname.
- So the dashboard path is the honest, lowest-drama repair path for now.

## Post-repair smoke checks

After the alias move, verify all of this:

1. `https://smart-link-mu.vercel.app/` returns HTTP 200.
2. The homepage visibly includes `Request Your Free Pilot`.
3. The pilot CTA link is present.
4. The CTA href still points to:

`mailto:gerritseninstagram@gmail.com?subject=Smart%20Link%20Pilot%20Inquiry&body=Hi%20-%20I%20landed%20on%20your%20homepage%20and%20am%20interested%20in%20the%20free%2030-day%20pilot.%20Please%20share%20a%20discovery%20call%20link.`

## What is still unknown

This run did not inspect the live Vercel dashboard, so one fact remains unverified locally: whether `smart-link-mu.vercel.app` is still attached exactly to the same wrong deployment hostname right now, or only to the wrong project more generally. The dashboard should make that obvious before removal/reassignment.

Do not mark the alias fixed until those smoke checks pass on `https://smart-link-mu.vercel.app/` itself.
