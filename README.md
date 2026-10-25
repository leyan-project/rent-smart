# Rent Smart — Protect Yourself as a Tenant

A React + TypeScript + Vite learning simulation. All student-facing text is English. No backend, accounts, paid services, runtime AI, remote fonts or photo searches.

## Run

Use Node.js 22.12+ (validated with Node 24).

```sh
cd /workspace/rent-smart
npm install
npm run dev
```

Vite prints the development address. For a production build: `npm run build`; serve it with `npm run preview`. To reproduce locked dependencies, use `npm ci` instead of `npm install`.

## This release

- Page01: proposed S$570 deduction notice, with no determination of responsibility or confirmed refund.
- Page02: four initial judgments, explicit submission, no answer reveal, immutable first responses after submission.
- Page03: seven indexed clauses and Appendix A; three interactive clause-and-purpose connections with feedback.
- Page04: independent S$110 lock exercise, receipt understanding check, optional Q1–Q4 with fixed replies, simulated signing. Only questions actually asked create messages; repeated sends are disabled.
- Shared shell, chapter/page navigation, Back / Continue, rental file, keyboard focus and modal focus containment, mobile layout, local persistence with schema version and unique run ID, explicit replay confirmation.
- Page05–14 are clearly labelled **not yet playable**. Visiting these previews creates no evidence, locks no history and marks nothing complete.

The three clause tasks must be completed for the guided Continue action. Signing requires the two understanding checks, but no landlord question is mandatory. The sidebar permits revisiting and previewing pages without inventing completion.

## State and extension boundaries

`src/state.ts` defines inspection actions, independent draft/saved records, immutable attachment snapshots and submission batches, receipt versus fact confirmation, locked history, three case analyses, first/latest attempts, response invalidation, perspective reflection, post-assessment and replay isolation. Component contracts for report editing, submission and analysis are included. These are extension interfaces, **not implemented Page05–14 workflows**. Implement archive confirmation and enforce reducer-level history guards when those workflows are added. Do not interpret the current preview as archived history.

Story content is in `src/content.ts`. Contract terms are fictional, not universal legal requirements. The room reference is not used as evidence. Final room imagery, later interactions, official-reference review and a full 45-minute learner trial remain outstanding. No free-text scoring is claimed.

## Checks

```sh
npm run build
# Chromium must be installed, or run npx playwright install chromium first.
CHROMIUM_PATH=/usr/bin/chromium node checks/smoke.cjs
```

The smoke test expects the dev server on port 5173. It checks actual browser interactions, selective Q1 storage followed by all four questions, refresh restoration, contract connections, signing, placeholder navigation, mobile horizontal overflow, dialog Escape and new-run isolation. Chromium was available locally; browser download access is not required in this environment. For another browser installation, set `CHROMIUM_PATH` accordingly.

Local progress is specific to this browser and origin under `rent-smart.run`; it is not cloud-synced. Clearing site storage removes it. Unsupported or unreadable saved data starts a new run with a warning. A storage-write failure displays a warning.

## Online preview (GitHub Pages)

The first release is published as static files on the `gh-pages` branch. In repository **Settings → Pages**, select **Deploy from a branch**, branch **gh-pages**, folder **/ (root)**, then **Save**. The expected site address is https://leyan-project.github.io/rent-smart/ once GitHub finishes publishing.

The Vite base is `/rent-smart/`, so assets load correctly at that project address. The static branch is a snapshot, not an automatic deployment pipeline; future source updates require rebuilding and publishing it again. The source branch remains `feat/rent-smart-pages-01-04`; `main` is not merged by this setup. GitHub Pages must be available for the repository’s visibility and account plan (public repositories support free Pages). The onboarding environment cannot enable the GitHub Pages setting through its blocked GitHub API.
