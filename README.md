# sherkevin.github.io

Personal academic homepage for Kevin Deng.

This site is intentionally static and dependency-free. It is designed for GitHub Pages and focuses on LLM application algorithms, multimodal reliability, RAG, Tool Use, and LLM4Rec.

## Notes

`notes.html` collects paper reading reports and study records: problem setting, method design, key results, and applicable boundaries per paper. The corpus lives as plain data at the top of `notes.js`; add a note by appending one object there. The page renders a uniform two-column card grid (fixed-height previews) with topic filters and full-text search; clicking a card opens a `<dialog>` with the full record. All client-side and dependency-free. Notes are Chinese-only; the English homepage links to this page the same way it links to the life graph.

Abstract thinking and derivations live in the homepage `所思` / `Thoughts` section (formerly `技术观` / `Worldview`), not in the notes page.

## Timeline layout

The timeline lists periods newest-first, one row per period. Work and startup entries whose intervals overlap share a single row: each concurrent entry becomes a lane to the right of the first one, all lanes starting at the same height and left-aligned, capped at three lanes per row (`.timeline-row.lanes-2` / `.lanes-3`). School entries stay single-lane rows because a degree spans years and would otherwise merge with every job inside it. On narrow screens lanes stack vertically inside their row.

## Public life graph

`life-graph.html` is the public, non-private version of the long-horizon life and work graph. It uses an interactive draggable SVG node graph with categorized node colors and clickable category focus controls for stable self-model, values, assets, routes, risks, decision gates, and maintenance loops, while private decision logs, interview notes, and unpublished opportunities remain outside the public site.

## Double-blind review note

Under-review manuscripts are summarized but not hosted as full PDFs here. Full paper links should only be added when they are publicly available and compliant with the relevant conference review policy.
