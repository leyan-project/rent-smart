# First-release implementation record

Authority: supplied design blueprint V3.4, including N–R, and visual requirements. User explicitly authorized drafting Page01–04 English copy and implementation together, overriding the document’s sequencing prerequisite. No new story characters or disputes were introduced.

Decisions: no room photograph is required for these four pages. Use warm cream, teal and sage with document and conversation surfaces. Keep preliminary inventory explicitly conditional. The S$110 lock is a separate hypothetical. Contract links use structured selections plus purpose checks. Initial responses lock on submission; optional clarifications are never backfilled. Placeholder visits deliberately do not activate later lifecycle transitions.

Verified in current instance: TypeScript + production build; real headless Chromium navigation and interaction; four pre-assessment responses; three contract tasks; Q1-only persistence then Q2–Q4; refresh of answers, questions and signing; all placeholder pages; zero browser errors; desktop/mobile horizontal overflow; modal Escape; replay clears prior communication and changes run ID. Reviewed desktop screenshot. No full later A/B/C evidence-path tests are claimed.

Not yet verified: final teaching effectiveness, 45-minute timing, official-reference review, later evidence/report/archive/analysis mechanics, full assistive-technology audit. Contract amounts and dates follow the supplied story rather than a claim of statutory standards.

## Usability revision

Root cause: the old Save button required all four answers and Continue depended on that submission flag, without a partial path. Replaced with explicit incomplete/complete metadata and Save & Continue, retaining actual unanswered items. Page02 is now a single-question experience; Page01 has an original illustrated room and interactive deduction notice. Simplified navigation and added visible guidance for the existing Page03–04 completion requirements. Existing schema-1 saves migrate additively without resetting run IDs or answers. No downstream content or rules changed.

Validation: updated Chromium smoke checks exercise the complete Page01→02→03→04 path, question and page backtracking, all/one/zero-answer submissions, reload on every page, optional Q1 then Q2–Q4, wrong and correct understanding choices, signing, legacy metadata migration, mobile controls and horizontal overflow, and replay isolation. Production-path checks run against the built site at /rent-smart/.

## Page05–07 increment

Implemented the blueprint's N1–N3 workflows in the existing app. The shared shell adds three playable entries, navigation guards for unsaved drafts and the archive boundary before later placeholders. Original Page01–04 component content, English question/contract material and the Page01 artwork remain unchanged; their browser regression suite passes.

Artwork is an explicitly temporary, replaceable illustrated room, with fixed viewBox crops and consistent geometry. SVG evidence views use `meet` to avoid clipping the scratch or window out of the context image. The right-hand drawer, clean uncovered mattress, open window and wardrobe have visible action states. No independent stock rooms, downloaded photographs or final asset claims are used.

Model transitions enforce checked versus draft versus saved versus sent. Exact batches are deduplicated in canonical item order. Snapshot IDs include run, item and saved revision; prior snapshot arrays and messages survive later editing and resubmission. Floor confirmation requires submitted close-up + context + objective location/scratch tags + active follow-up. Drawer functional reports only establish that symptoms were reported and received, without determining cause or liability. Personal notes are retained but do not drive conditional fact confirmation.

Actual Chromium checks cover full, partial, zero and draft-only paths; A sent → B draft → discard B → save B → send B; exact receipt lists; refresh at each stage; explicit floor follow-up; read-only archive navigation; mobile horizontal overflow; and the unchanged earlier-page suite. Desktop screenshots reviewed. A first test assertion was corrected to inspect an actual disabled checkbox rather than assuming Playwright's `isDisabled()` classifies a fieldset itself.

Still pending: final unified room photographs/illustrations and evidence asset review; Page08–14 interactions; later dispute scenario paths and full learning-duration validation. The archive prompt is a boundary safeguard, not completion of Page08.

## Page05 visual-only upgrade

Replaced Page05's geometric room illustration with a generated semi-realistic room master and one reference-image edit of that same room. The clean mattress, drawer, window and wardrobe state regions are selectively composited, keeping untested objects unchanged. Main room markers use normalized source-image coordinates; local views and an accessible enlarged dialog use the exact same image coordinate system. The room scene is substantially wider; duplicated instructions are reduced. Page01–04, Page06–07, `moveInModel.ts`, `state.ts`, evidence IDs and all teaching-state transitions remain unchanged. `InspectRoom` was extracted from the existing move-in module to isolate this page's presentation.

Visual checks found and corrected two issues: SVG letterboxing initially allowed artwork outside the desired close-up to spill into the margin, so all content is clipped to the selected viewBox; the floor detail was calibrated to the actual fine scratch rather than a floorboard joint. Modal screenshots wait for visible state images, and the visual test compares detail images before/after action, excluding marker-only changes.

Assets are fictional simulation artwork, not real-world evidence photographs. See `src/assets/page05/README.md` for provenance and the unchanged report-asset boundary. No paid or remote service is needed to run the app.

## Page06 visual-only upgrade

Extracted the existing report presentation into `InspectionReport.tsx`, preserving its dispatched actions and gates. Cards and preview crops use Page05's local raster assets via `ReportPhoto.tsx`, while keeping all fixed evidence IDs unchanged. Added an adjacent live draft preview and an independently labelled saved-report summary, including saved revisions during unsaved edits. Only saved state continues to feed Page07. Image-preview controls are separate from checkbox labels and never dispatch selection/save actions. The optional note remains unscored. Page05's artwork and UI, Page07's layout, the state schema and the reducer are unchanged.

No new room images were needed. All Page06 floor, drawer, mattress, window and wardrobe imagery comes from the Page05 source pair. The drawer still never uses the opened/tested drawer patch to claim functional evidence; the mattress crop uses the uncovered state only behind its existing check gate. These are simulated course assets, not real tenancy photographs.

Production build and real Chromium Page05→06→07 checks passed. Additional checks verified same source assets, previews with no state mutation, live draft image/note changes, refreshing drafts, saved A unchanged during draft B, unsaved B excluded from Page07 snapshots, static drawer and uncovered-mattress visuals, uninspected-item gating and mobile preview/overflow. Desktop and mobile screenshots reviewed. The current sandbox required running Chromium outside its local-socket restriction; no browser assertions were removed to work around that restriction.

## Interaction / archive lifecycle fix

Diagnosis: archived browser state intentionally persisted on earlier pages, but Page03–04 offered no clear explanation, and their ordinary completion gates could block Continue even during read-only review. Empty clause checks had only a disabled button rather than actionable feedback. The existing new-run factory already cleared the archive flag; replay handling did not explicitly persist before navigation or clear the opening-notice UI, and other open tabs could continue displaying a different run.

Fix: enter Page08 and set the archive marker in one model transition; route first visits to later placeholders through this boundary. Preserve valid legacy archives instead of guessing they are erroneous and unlocking evidence. Add a shared explanation/restart action, allow non-mutating Continue while archived, and guard historical patch writes as well as move-in reducer actions. Reset the entire state and transient UI with an immediate localStorage write and synchronize different-run storage events between tabs. Clause checks report missing selections; save actions distinguish eligible, unchanged and empty records. No artwork, layout styling, story facts, teaching tasks or later-page content was redesigned.

Browser validation: full Page01→07 using real controls, archive/cancel, read-only Pages03–07, unchanged snapshots/history, legacy archive refresh, restart/reset assertions, a second full Page01→07 after replay, two-tab reset synchronization and archived review of incomplete tasks. The initial full lifecycle suite passed before the existing partial/zero-evidence and assessment regression suites were rerun.
