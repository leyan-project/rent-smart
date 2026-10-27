# Rent Smart — Protect Yourself as a Tenant

A React + TypeScript + Vite single-repository learning simulation. Pages **01–14** are playable. All learner text is English. No backend, accounts, runtime AI, remote fonts or online image search.

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

All move-in events use **2027-01-01**, with sequence numbers rather than device dates. Saved but unsent records remain personal. Empty/partial evidence paths are permitted. The first navigation into Page08 asks whether to archive existing move-in history; archive makes inspection, editing, sending and follow-up read-only. Dispute analysis remains editable in its own separate state. Entering the dispute stage does not mark the course complete. Cancel that prompt to keep working on Pages05–07.

## Temporary visual assets

`src/MoveInVisual.tsx` is a replaceable SVG scene with consistent crops defined in `src/moveInModel.ts`. The room and close-up views are explicitly labelled simulated illustrations, **not real photographs or finalized evidence assets**. The scratch, desk drawer, bed and wardrobe use the same geometry across views. Page01 now reuses the Page05 handover-room image in a story opening. Pages05–06 use the newer semi-realistic room image pair; Page07 renders the same selected image IDs and crops as Page06, retaining legacy asset IDs for old records. Dispute visuals reuse the same room, with a reference-edited stained mattress at move-out. All are fictional course illustrations. The independent curtain challenge has its own paired simulated images; its relevant move-in hem is physically hidden by an oak chest. Final asset and official reference review remain separate editorial tasks.

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

The first suite covers the original Page01–04 interactions, persistence, partial/zero initial answers, signing, migration and replay. The second covers complete/partial/zero/draft-only move-in paths, physical action gates, batch saving/sending, immutable A/B snapshot histories, incomplete and complete fact-check requests, duplicate sends, refresh, archive guards, rental file and mobile overflow. The additional dispute suite described below exercises the implemented dispute workflows. Course effectiveness and the remaining Page13–14 workflows are not claimed as tested.

## Online preview

Static build files are published on `gh-pages`. In repository **Settings → Pages**, select **Deploy from a branch → gh-pages → / (root) → Save** if not already configured. Expected address: https://leyan-project.github.io/rent-smart/ . The static branch is a snapshot, not an automatic deployment pipeline; future source changes must be rebuilt and republished. Source remains on `feat/rent-smart-pages-01-04`; no merge to main is implied.

## Page05 visual update

Page05 now uses semi-realistic local room artwork, with image crops and selectively composited inspection states from the same room. All five areas remain interactive; drawer testing, uncovered mattress, window and wardrobe have visible image changes. Close-ups can be enlarged and closed with Escape. Inspection still creates no saved report or submission automatically. This presentation-only update keeps Page06–07's existing simulated report assets and all state/evidence rules unchanged.

Additional visual/action check: `node checks/page05-visual.cjs` (accepts `TEST_URL`, as above). This checks the five areas, actual before/after detail imagery, image loading, zoom dialogs, persistent inspection state, touch/keyboard actions and mobile overflow.

## Page06 visual update

Page06 uses the same semi-realistic Page05 image pair for selectable evidence cards, separate image previews and a live report panel. Stable photo IDs and existing evidence rules remain unchanged. The live panel explicitly distinguishes draft choices from saved revisions and keeps the prior saved version available while editing. Drawer stills remain closed/static; the uncovered mattress view is offered only after the existing inspection gate. No new learning tasks or state fields were added. Page07's layout and older simulated thumbnail renderer remain unchanged in this page-specific increment.

Run `node checks/page06-visual.cjs` against a preview server (or supply `TEST_URL`) to check asset consistency, preview without selection, live draft updates, saved-version separation, persistent choices/notes, uninspected gating, transfer to Page07 and mobile layout.

## Run lifecycle and read-only review

An existing archived run stays read-only when revisiting Pages01–07; it is never silently unlocked by navigating backward. The archive transition now enters Page08 and records `archivedAtPage: 8` atomically. Links to later placeholders must pass that boundary. Cancelling archive leaves the current run editable. Legacy archived saves retain their history and receive the explanatory archive marker when loaded.

Earlier pages show an explicit archived-run explanation and a restart action. Read-only review can use Continue even if the original tasks were incomplete, without modifying historical choices. New runs synchronously replace the local save with a new run ID and reset archive state, answers, signatures, inspections, drafts, reports, snapshots, messages and transient UI. A different run started in another tab is adopted by already-open tabs.

Incomplete clause checks now give actionable feedback rather than an unexplained disabled button. Signing and saving explain their prerequisites; empty or unchanged report saves state what actually happened. `node checks/run-lifecycle.cjs` verifies the full Page01→07 flow twice, including restart from an archive, read-only review, legacy archive restoration, later-page navigation and cross-tab reset.

## Page03 submission and feedback rules

Continue requires one non-empty submitted judgment per contract task, regardless of correctness. The third task accepts 2+4+6 with the records/supporting-materials purpose, and also retains the valid narrower 2+6 link. Wrong attempts receive task-specific feedback; the second incorrect attempt displays a more explicit hint. After any submission learners may request a hint or view the answer and explanation without rewriting their own answer.

Each `contractReview` entry stores immutable `firstAnswer`, `attemptCount`, `incorrectCount`, `hintUsed`, `answerRevealed`, `attempts` and the latest submitted `finalAnswer`. Current `ids`/`role` remain draft selections; changing them does not rewrite the latest submitted judgment. Correctness is separate from submission credit. Legacy saved-correct judgments retain credit without fabricating their unknown first attempt or prior attempt count. Run `node checks/page03-attempts.cjs` (with `TEST_URL` if needed) to check all-correct, partly wrong and all-wrong progression, retry feedback, hints/reveal, persistence and replay isolation.

## Page08–12 dispute stage

- Page08: the S$250/S$120/S$200 proposals (total S$570), archive status and access to the actual rental file.
- Pages09–11: current move-out material beside saved personal versions, immutable submitted snapshots, actual landlord messages and contract clauses. Drafts never enter this catalogue. Full floor guidance, a shorter drawer prompt, and minimal mattress scaffolding with optional help. The known spill and S$90+S$70+S$40 quotation are always visible before mattress judgments.
- Four structured analysis sections: references, supported facts, uncertainty, position and specific requests. Wrong or incomplete reasoning receives up to two targeted feedback points; a complete four-section judgment can be saved without being correct. First and latest judgments and hint use are stored separately. Free notes are not semantically scored.
- Page12: preview generated only from saved current analyses and real references, structured request editing, A/B/combined tenant-perspective reflection and simulated sending. An edited analysis invalidates the old preview and outcomes until regeneration. Case-specific landlord replies identify current status, actual basis and next steps; they do not settle a refund or invent inspection findings.

State transitions live in `disputeModel.ts`, separate from the locked move-in model. New drafts, analyses, feedback and sent-response history persist locally without changing the archived 2027 evidence or communications. Original Page01–07 components and teaching logic are retained; the shared shell registers the new stage.

With a production preview running on port 4174:

```sh
TEST_URL=http://localhost:4174/rent-smart/ node checks/disputes.cjs
```

The suite runs real full-evidence and zero-evidence Page07→12 flows, receipt-only and unsaved-draft variants, wrong-answer progression, analysis persistence, partial-cost replies, invalidation/regeneration, immutable first judgments and history, contradictions with recoverable drafts, file access and mobile layout.

## Final challenge and toolkit

- Page13: independent curtain case, approximately 4 cm tear; proposed S$180 replacement (S$120 curtain + S$60 installation), incomplete move-in photo and visible move-out tear. Four judgments use the same dimensions as Page02. Feedback is withheld until all four first judgments have been submitted; explicitly unanswered judgments are permitted. Wrong answers can continue. First responses are immutable; drafts, latest submissions and attempt counts are separate. Earlier room evidence is never part of this case.
- Page14: four descriptive comparisons use actual submitted Page02 responses and first submitted Page13 responses, including missing answers. Later corrections do not become independent performance or percentage improvement. Actual inspection/saved/sent record trails and landlord messages are reviewed separately. Checklist supports clipboard copy (manual fallback) and browser print / Save as PDF. Replay uses the existing confirmation and creates an isolated new run.

Production browser check: `TEST_URL=http://localhost:4174/rent-smart/ node checks/finale.cjs`. `checks/disputes.cjs` also follows fully recorded and zero-evidence paths from Page07 through Page14. Page12 does not determine a refund or liability; Page14 now has an explicitly fictional game settlement under the ending rules below.

Focused refinement: Page03 has explicit connection instructions; Page07 uses the same evidence images/crops as Page06, including immutable sent versions; Page12 uses concise per-item communication while retaining evidence metadata; Page13 fresh runs use revised plausible distractors and option-specific feedback; Page14 describes each actual dimension separately. Already answered older final challenges retain their original wording so stored choices are not reinterpreted. To see revised Page12 copy on a saved run, regenerate the response; existing sent messages are preserved. Additional browser verification: `TEST_URL=http://localhost:4174/rent-smart/ node checks/refinement.cjs`.

Final polish backup: `stable-before-final-polish` points to `d9060756ebf79abe0a91290ae2d3e20682e8efa4`. New runs use version-2 inspection images and version-3 final Q1/Q2; earlier runs retain their saved image IDs and question versions. Use a separate/private browser window to preview fresh material while keeping an existing run. Page12 strategy affects the opening/order, and style/approach changes require regeneration. Additional check: `node checks/final-polish.cjs` against port 4174.

## Story opening and fictional game ending (Page01 / Page14 only)

Backup tag `stable-before-new-ending` points to `718e0e417acc15bbc6cd20152f32ee41686d6e14`. Page01 reveals the S$570 message against the same room scene. Page14 displays a **Simulated Game Settlement**, separate from any real-world liability or guaranteed refund. Existing skill comparisons and checklist are retained in folded secondary sections. Replay still requires confirmation.

`src/gameSettlement.ts` is a pure, deterministic, read-only function. It uses the matching actual sent response metadata, real sent snapshots and linked specific confirmations. It never uses Page02/Page13 scores or promotes drafts/receipt messages into evidence.

| Item | Most favourable tier | Middle tier | Default tier |
|---|---|---|---|
| Floor | S$0: relevant submitted challenge cites a specific pre-existing-scratch confirmation linked to complete sent floor records | S$125: submitted comparison / review request reserves or queries responsibility, without that confirmation | S$250 |
| Drawer | S$0: submitted functional snapshot from an actual test, with both cause and clause-scope checks | S$60: submitted cause/scope query without the full cited trail and both checks | S$120 |
| Mattress | S$90: acknowledges the stain and queries all three services | S$160: acknowledges it and queries part of the service quote | S$200 |

Missing records are not treated as proof of liability; these are preset negotiation endings. Refund = S$1,300 minus the three game deductions. Deterministic/model check: `node checks/new-ending-model.cjs`. Browser check (after the model fixture check): `node checks/new-ending-browser.cjs`, using preview port4174. The tests cover 27 tier combinations and three representative refunds (S$1,210 / S$955 / S$730), source equivalence of protected Page02–13 code, UI persistence, copy/PDF, mobile and replay.
