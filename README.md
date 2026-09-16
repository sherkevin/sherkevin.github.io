# sherkevin.github.io

Personal academic homepage for Kevin Deng.

This site is intentionally static and dependency-free. It is designed for GitHub Pages and focuses on LLM application algorithms, multimodal reliability, RAG, Tool Use, and LLM4Rec.

## Companion pages: notes and life graph

Notes and the life graph are not part of the personal-profile flow, so the homepage no longer lists them as regular sections. Instead the top of the page carries two tinted portal cards (dark clay for notes, dark green for the graph) that link out; each companion page opens with a matching cover band whose stats (note count, topics, graph nodes, edges, node types) are filled from the live data in `notes.js` and `life-graph.js`.

## Experience timeline layout

The `经历` / `Experience` section opens with a proportional vertical Gantt chart and keeps the expandable detail entries beneath it. Each entry carries `--m0` and `--m1` (months since 2017.09) and one month is `--tl-s` px, and the axis runs newest-first from `--tl-max` at the top down to 0, so recent periods sit at the top; vertical position and bar length are still real time (equal height means equal time), and entries that overlap in time sit side by side in lanes 1-4. A dashed line marks the present. Lane 1 carries the school spans, lane 2 the consecutive work track, lanes 3-4 the startups that run alongside it; year ticks on the left make the scale readable. On narrow screens the chart collapses to a chronological single-column list with dots on the rail.

## Public life graph

`life-graph.html` is the public, non-private version of the long-horizon life and work graph. It uses an interactive draggable SVG node graph with categorized node colors and clickable category focus controls for stable self-model, values, assets, routes, risks, decision gates, and maintenance loops, while private decision logs, interview notes, and unpublished opportunities remain outside the public site.

## Double-blind review note

Under-review manuscripts are summarized but not hosted as full PDFs here. Full paper links should only be added when they are publicly available and compliant with the relevant conference review policy.
