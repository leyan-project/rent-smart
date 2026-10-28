# Page05 room artwork

Two local WebP assets encode one staged room, not unrelated stock photographs. Both are 1536 × 1024 and are used only by Page05. They are AI-generated fictional teaching illustrations, not actual condition photographs, verified real-world evidence or legal materials.

- `room-handover.webp`: tidy move-in state, closed desk drawer, covered mattress, closed window and wardrobe. A fine scratch is depicted on the window-side floor at approximately (1080, 620).
- `room-inspected.webp`: a reference-image edit of the same initial room and camera, with folded bedding exposing a clean quilted mattress surface, partly extended top right-hand desk drawer, open window sash and open wardrobe door.

`InspectionRoomArt.tsx` displays the handover image, then clips only the requested local areas from the edited state. It never swaps the whole scene merely because one object was tested. Close-ups use viewBox crops from these same images, clipped to the requested view so other parts of the room cannot spill into letterboxed areas. The scratch remains in the handover layer in every state.

Generation direction: modest Singapore condominium common room; single bed, oak desk with right-hand drawers, ordinary office chair, normal window, oak wardrobe, pale oak floor, warm natural daylight, no personal clutter or luxury features. The optional original room style reference was used for overall visual direction, not as evidence. Tool generation and subsequent reference edits were visually reviewed before integration.

Page06–07 continue to use the existing explicitly simulated SVG report assets. This increment does not change their image IDs, stored records, attachment snapshots or logic. Coordinating final report/move-out assets with this new room is a separate asset task.

The WebP conversion only changes storage encoding. Originals are retained in the environment's `/workspace/generated_images` directory. No online image search or image-generation API is used at runtime.
