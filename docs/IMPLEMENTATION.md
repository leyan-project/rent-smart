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

Additional reproduced issue: opening the rental-file agreement over Page03 rendered duplicate clause IDs. Clicking the modal index left its own reader at scrollTop 0 and targeted the background. Each ContractViewer now scopes its IDs and explicitly scrolls its own clause. A Chromium check covers Page03 with both readers and the Page04 modal; contract copy and task logic are unchanged.

## Page03 judgment progression

The reported 2+4+6 answer was rejected by exact equality against the old 2+6 set. Both sets are now accepted for the records/supporting-materials purpose. All other clause selections are still evaluated, and unsupported extra clauses are not silently accepted. The same three prompts and existing page layout remain in place.

Submission completion is separated from correctness. One actual judgment per task unlocks Continue; a missing clause selection or purpose does not count as a submission. The first incorrect judgment receives specific feedback, and a second incorrect judgment receives an explicit hint. Optional answer explanations do not populate controls, increment attempts or change submitted correctness. First and latest answers, per-attempt snapshots, counts, hints and answer-reveal flags persist across refresh. Unsubmitted later edits remain distinct from the final submitted answer. Legacy records preserve only known facts and do not invent historical first answers or counts.

Chromium tests exercised all-correct (including 2+4+6), mixed and all-wrong answers entering Page04; first/second-error feedback; manual hints and answer reveal without false correctness; retries preserving the first judgment; exact counts and latest judgments; refresh; valid 2+6; irrelevant extra clauses; legacy data and replay reset. Scope is Page03 plus its state metadata and test expectations; other page UI and logic are unchanged.

## Page08–12 implementation

Read V3.4 story facts, H/O analysis matrix, P response rules and R acceptance paths. Registered the new stage in the shared shell while retaining existing Page01–07 components, teaching logic and the Page13–14 placeholders. Archive still happens atomically on confirmed entry to Page08. Dispute edits use a separate guarded reducer, so analyses remain editable while 2027 inspection records, snapshot batches and communications remain read-only.

Evidence catalogues contain only saved personal revisions, actually submitted immutable snapshots, actual item-linked landlord messages and any genuinely asked pre-signing replies. Unsaved drafts and unasked clarifications are excluded. Current landlord material and contract clauses remain available with zero personal evidence. A receipt is never promoted to specific pre-existence confirmation. The drawer state distinguishes viewed/tested actions, saved functional observations and receipt, with no invented cause or liability.

Pages09–11 use a visual comparison desk plus four compact analysis sections. Guidance reduces from floor to drawer to mattress; optional help is recorded. First judgments are deep-copied and retained separately from current drafts, saved analyses and revisions. Feedback prioritizes missing/false evidence, unsupported inferences and request specificity, at most two items per check. Structured choices are evaluated; personal notes are displayed but unscored. Under-supported judgments can still save and proceed.

Page12 assembles actual referenced sources, saved positions and selected requests into an editable-by-structure preview. Conflicting claims keep the draft and show a repair prompt. Any analysis edit marks old text/outcomes stale; revised analyses must be saved and the response regenerated before sending. The two adult tenant perspectives accept A, B or a combination with reasons, without ranking the tenant or automatically accepting fees. Simulated landlord outcomes are per case, with status, basis and next step. Mattress replies cover only requested quote items. No S$730 refund, recovered amount or final ruling is generated.

Asset work: reference-edited the same room's uncovered mattress to add the stipulated spill stain. Reused same-scene floor and drawer views, clearly labelled simulated. No stock room photos were introduced. Fixed current-view accessible labels to identify move-out rather than inheriting the move-in renderer's label.

Actual production-browser tests: full-evidence and no-evidence Page07→08→09→10→11→12; archive/cancel and rental-file access; all three saved analyses and refresh; first/latest/hint separation; historical immutability; case-specific outcomes; editing/regenerating sent text; partial S$90/S$70 requests without a fabricated S$40 explanation; wrong-answer sending; receipt-only and draft exclusions; contradictory selections with retained drafts and successful correction; mobile overflow. Existing lifecycle, move-in and Page03 retry suites also passed. Final asset review, independent curtain challenge and toolkit (Page13–14) remain outside this increment; no 45-minute learning-duration validation is claimed.

## Final increment: Page13–14

Added a standalone curtain file: approximately 4 cm lower-edge tear, S$180 proposed replacement (S$120 curtain + S$60 installation). Paired simulated views show the same curtain / oak chest; the relevant move-in hem is physically obscured. The supplied contract extract is explicitly scoped to this independent fictional tenancy. No Page05–12 evidence is imported as curtain evidence.

Four compact judgments evaluate contract links, image limits, missing timeline/cost information and a proportionate response. All four first judgments must be submitted before feedback appears. Explicit blanks can be submitted; wrong answers never prevent continuation. First submissions, latest choices, latest submissions and attempts are distinct persisted data. Page14 compares actual submitted pre-assessment responses with first curtain submissions, never revisions or invented learning gains. Missing answers are described as missing, not correct or automatically wrong.

Toolkit review reads the real inspected/tested flags, saved revisions, saved photos/descriptions, submitted snapshots and actual landlord messages. Draft-only content is excluded from evidence; receipt is not promoted to fact confirmation. Checklist supports clipboard with manual fallback, browser print / PDF and the existing confirmed isolated restart. Printed layout was corrected and verified as a single-page PDF.

Actual built-app Chromium tests: Page12→13→14, all supported / all wrong / explicitly unanswered / partial responses, draft persistence and refresh, first-response preservation on revision, descriptive comparison, actual saved-A/sent-A versus unsaved-B exclusion, receipt-only review, image zoom / Escape, clipboard, print-button invocation and PDF, mobile widths, completed persistence and restart run-ID/data isolation. Expanded the existing full/zero-evidence Page07 dispute tests through Page14 and reran the Page01–07 lifecycle suite. Build and diff whitespace checks pass. Changes to earlier pages are limited to shared integration/navigation for the newly playable chapters; their components, content, reducers, visual assets and styles were preserved. No validated 45-minute outcome or final refund is claimed.

## Focused usability and content refinement

Kept V3.4 facts, question stems, dimensions, answer IDs and progression. Replaced Page13 implausible distractors with plausible but incomplete reasoning: price-before-scope, visibility-as-timeline, timeline without remedy/cost review, early payment offers and overly narrow proof demands. New feedback distinguishes each selected option. Version 2 is additive; previously answered/drafted version-1 runs retain their original question wording and interpretation rather than relabelling historical answers. Fresh runs use version 2. First submissions remain immutable and feedback remains withheld until all four are submitted.

Page12 now generates short per-item professional paragraphs from the same selected sources, positions and requests. Source IDs remain in response metadata, without database-like lists in the message. Landlord replies acknowledge the discussion and describe a limited next step; no inspection, payment, responsibility or refund is invented. Existing sent messages remain unchanged; regeneration creates updated wording. Page14 uses dimension- and choice-specific descriptions of the submitted initial and first final judgments, without claimed growth or replacing first answers with revisions.

Page07 saved-record cards and exact sent snapshots now use Page06's ReportPhoto renderer, asset and crop for each stable photo ID, also in the file. Saved and sent revisions remain separate. Page03 includes numbered selection / purpose / submission instructions and accessible named clause groups; wrong-answer continuation is unchanged.

Actual production Chromium checks passed: disputes full/zero paths through Page14, saved analyses and response regeneration, partial mattress fees, conditional outcomes, all-correct/all-wrong/blank/partial final assessments, all twelve new option outcomes, four distinct toolkit descriptions, legacy question preservation, Page06→07 exact image/crop parity, sent-A remaining unchanged after saving B, refresh, mobile overflow, Page03 retries / hints / nonblocking errors, and Page05–07 full/partial/zero/draft-only save/send/snapshot tests. Build and whitespace checks passed.

## Final polish after second full playtest

Backup: annotated tag `stable-before-final-polish` → `d9060756ebf79abe0a91290ae2d3e20682e8efa4`, pushed before edits. No history was removed or force-pushed.

Opening emphasizes the S$570 proposal with a restrained reveal. Three contract tasks now have distinct plausible purposes; first feedback is short with a non-revealing cue, hints/explanations remain optional, first answers remain immutable and any three submissions allow progression. Previous purpose values remain readable in existing saves. Pre-signing and move-in landlord replies are shorter; exact attachment lists and receipt/fact labels remain system UI, with unchanged follow-up prerequisites.

New run evidence visual version 2 uses genuinely bare clean mattress / matching stained mattress, partly open tested drawer and open wardrobe details. New image IDs and preserved legacy assets prevent old saved/sent evidence being visually rewritten. Inspections and photo availability keep the existing guards. All three stages use the same scene/crops. Optional recording and sending is explicit, with current-version sent status. Old storage defaults to visual version 1; it is not cleared or reset.

Dispute options retain keys, quantities and diminishing guidance, with only obvious absolute distractors revised. Page12 approach now changes the opening/order (clear-facts-first begins with the mattress), and direct/collaborative expression is adjustable with no free insertion of evidence. Changing approach or expression makes an old preview stale until regeneration. Sent histories remain intact. Natural landlord chat is separate from a collapsed learning review, with no refund or responsibility outcome invented.

Fresh final challenges use version 3: only Q1/Q2 change, with balanced option lengths and corresponding feedback. Versions 1/2 remain readable for already-started challenges. Toolkit presents four compact cards, folded actual answers, one advice priority selected from actual first judgments, folded evidence history and a completion/checklist/replay area. Clipboard, print/PDF and confirmed isolated replay remain intact. No measured growth or scores are claimed.

Production Chromium suites cover selective/full/partial/zero/draft-only record paths; immutable sent revisions; new asset/crop references; independent contract choices and all-wrong continuation; all final option outcomes; actual first-answer feedback; three strategy outputs and style invalidation; separated chat/review; all 14 pages via Back; refresh and legacy save preservation; mobile overflow, clipboard, PDF and replay isolation. Tests use separate headless browser contexts, never the user's browser profile. Build and whitespace checks pass.

## Scoped Page11–12 conflict hotfix

Preserved `stable-before-final-polish` and added `stable-before-page12-conflict-fix` at 235a3e4 before editing. The old `denySpill` key's visible wording had changed to an inference about responsibility, but the boolean gate still treated it as a literal denial of the spill. That incorrectly blocked an acknowledging position (or the known spill fact) even when all fee requests were consistent. It now receives reasoning feedback without becoming a logical contradiction; no selected answer is removed or marked correct. Only explicit incompatible selections block assembly, with the same shared predicate used by UI and reducer. The receipt-pair rule is scoped to its floor case instead of leaking across unrelated records.

Page12 diagnostics name the actual saved choices, distinguish saved analysis from unsaved revisions and link directly back to review. Page11 opens at the conflicting section, shows the selected pair and preserves the normal save step. Existing first judgments, drafts, communications, evidence snapshots and sent responses remain unchanged. No storage migration or reset is performed; other page content/design is unchanged.

Production Chromium: exact acknowledged-stain + S$90/S$70/S$40 + conditional payment-proof requests; legacy-key false positives; explicit spill-versus-denial diagnostics and navigation; saving the correction; unsaved correction remains unsaved; first-answer/history preservation; refresh; scoped receipt test. Existing full/zero-evidence Page07→14 dispute suite passed. Build and whitespace checks passed. Tests use independent browser contexts, not the user's browser profile.
