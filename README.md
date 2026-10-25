# Rent Smart — Protect Yourself as a Tenant

A React + TypeScript + Vite single-repository learning simulation. Pages **01–07** are playable; Pages **08–14** remain explicitly labelled placeholders. All learner text is English. No backend, accounts, runtime AI, remote fonts or online image search.

## Run

Use Node.js 22.12+ (validated with Node 24).

```sh
cd /workspace/rent-smart
npm ci
npm run dev
```

Vite prints the development address. Build with `npm run build`; serve the production build with `npm run preview`. The project base is `/rent-smart/` for GitHub Pages.

## Playable scope

- Page01–04: interactive deduction notice, single-question initial assessment (including partial/zero-response saving), seven-clause agreement with Appendix A and three clause-link tasks, optional Q1–Q4, independent S$110 lock exercise and simulated signing. Existing content and assessment logic are retained.
- Page05: five normalized-coordinate room hotspots and equivalent keyboard/touch item buttons. Viewing the desk does not test the right-hand drawer. The mattress must be uncovered. Window/wardrobe actions and drawer testing visibly change the room illustration. No action automatically saves evidence.
- Page06: item list, simulated image choices, objective observation tags and optional personal notes. Available records depend on actual checks. Drafts persist but are not sendable. Save one item or all eligible drafts, with stable record IDs and incrementing revisions. Unsaved edits leave earlier saved versions intact. Navigation offers save, discard changes, or keep editing. Notes alone cannot create an observation record and are never scored as facts.
- Page07: preview and send only selected saved records, including batch submissions. Immutable attachment snapshots keep earlier messages tied to the version actually sent. Exact duplicate batches are blocked. A receipt acknowledges only that batch. Functional drawer reports receive a limited further-inspection reply. Floor pre-existence is confirmed only after an explicit follow-up on a submitted snapshot with close-up, context image and objective location/scratch descriptions. Missing requirements are listed together. No known fact or final financial responsibility is invented.

All move-in events use **2027-01-01**, with sequence numbers rather than device dates. Saved but unsent records remain personal. Empty/partial evidence paths are permitted. The first navigation into the later placeholders asks whether to archive existing move-in history; archive makes inspection, editing, sending and follow-up read-only. It does not implement the dispute pages or mark the course complete. Cancel that prompt to keep working on Pages05–07.

## Temporary visual assets

`src/MoveInVisual.tsx` is a replaceable SVG scene with consistent crops defined in `src/moveInModel.ts`. The room and close-up views are explicitly labelled simulated illustrations, **not real photographs or finalized evidence assets**. The scratch, desk drawer, bed and wardrobe use the same geometry across views. The original Page01 illustration is unchanged. Final photorealistic room assets and later move-out/curtain assets remain outstanding.

## State

`src/state.ts` retains schema version 1 and unique run IDs with additive fields so prior first-release saves load without losing answers or messages. `src/moveInModel.ts` contains guarded state transitions for inspection, drafts, save, submit, follow-up and archive. Historical snapshots copy arrays and notes; they do not point at editable entry arrays. Receipt, fact confirmation and responsibility discussion are separate communication types. The rental file shows personal saved versions, exact submitted revisions and actual move-in messages. Restart creates a new isolated run.

Progress is specific to the browser/origin under `rent-smart.run`; it is not cloud-synced. Clearing site storage removes it. Unreadable saves and failed storage writes display warnings.

## Browser checks

With the dev server on port 5173 and Chromium installed:

```sh
npm run build
node checks/smoke.cjs
node checks/move-in.cjs
```

Both scripts use Playwright and default to `/usr/bin/chromium`. `checks/smoke.cjs` accepts `CHROMIUM_PATH` for another executable. To exercise a running production preview instead:

```sh
TEST_URL=http://localhost:4173/rent-smart/ node checks/move-in.cjs
```

The first suite covers the original Page01–04 interactions, persistence, partial/zero initial answers, signing, migration and replay. The second covers complete/partial/zero/draft-only move-in paths, physical action gates, batch saving/sending, immutable A/B snapshot histories, incomplete and complete fact-check requests, duplicate sends, refresh, archive guards, rental file and mobile overflow. Later dispute workflows and course effectiveness are not claimed as tested.

## Online preview

Static build files are published on `gh-pages`. In repository **Settings → Pages**, select **Deploy from a branch → gh-pages → / (root) → Save** if not already configured. Expected address: https://leyan-project.github.io/rent-smart/ . The static branch is a snapshot, not an automatic deployment pipeline; future source changes must be rebuilt and republished. Source remains on `feat/rent-smart-pages-01-04`; no merge to main is implied.

## Page05 visual update

Page05 now uses semi-realistic local room artwork, with image crops and selectively composited inspection states from the same room. All five areas remain interactive; drawer testing, uncovered mattress, window and wardrobe have visible image changes. Close-ups can be enlarged and closed with Escape. Inspection still creates no saved report or submission automatically. This presentation-only update keeps Page06–07's existing simulated report assets and all state/evidence rules unchanged.

Additional visual/action check: `node checks/page05-visual.cjs` (accepts `TEST_URL`, as above). This checks the five areas, actual before/after detail imagery, image loading, zoom dialogs, persistent inspection state, touch/keyboard actions and mobile overflow.

## Page06 visual update

Page06 uses the same semi-realistic Page05 image pair for selectable evidence cards, separate image previews and a live report panel. Stable photo IDs and existing evidence rules remain unchanged. The live panel explicitly distinguishes draft choices from saved revisions and keeps the prior saved version available while editing. Drawer stills remain closed/static; the uncovered mattress view is offered only after the existing inspection gate. No new learning tasks or state fields were added. Page07's layout and older simulated thumbnail renderer remain unchanged in this page-specific increment.

Run `node checks/page06-visual.cjs` against a preview server (or supply `TEST_URL`) to check asset consistency, preview without selection, live draft updates, saved-version separation, persistent choices/notes, uninspected gating, transfer to Page07 and mobile layout.
