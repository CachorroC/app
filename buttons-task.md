## Task

Rework the styling of the entire `/Carpetas` route in my Next.js (App Router) app so the
layout is **mobile-first** with intentional tablet and desktop treatments, and restyle the
toolbar controls (sort, search, select, filter) to follow **Material You / Material 3**.
The app uses **CSS Modules**.

## Step 1 — Explore before editing anything

Read and map the current styling/structure of the route first. Start here and follow the
imports/components outward:

- `./src/app/Carpetas/layout.tsx` + its `.module.css`
- `./src/app/Carpetas/@right/default.tsx` + its `.module.css` ← where the sort/search/select/filter controls live
- any shared table or layout components these render
- `globals.css` (to see the existing color tokens)

Then report back before doing the full edit: what the current responsive strategy is (or the
lack of one), how the table and toolbar are laid out, and your plan.

## Step 2 — Make the whole route mobile-first

The CSS currently isn't mobile-first. Rewrite it so the base styles target mobile, then layer
up with `min-width` media queries. Suggested breakpoints (adjust if the codebase already has
conventions):

- **Mobile (base, no query):** compact stacked layout. The data table must stay usable —
  horizontally scrollable or reflowed — and the managing buttons should wrap/stack cleanly.
- **Tablet (≥ 600px):** more comfortable spacing, table gains width, toolbar moves toward a
  single inline row.
- **Desktop (≥ 905px):** full table width with the toolbar inline.

This applies to both the table and its managing buttons.

## Step 3 — Restyle the toolbar controls

Style sort / search / select / filter as **Material You filled tonal or segmented buttons**, visually grouped as a
**connected button group (segmented-style)**. the searchar has to be a search input that follows material yous best practices and design system.

- Pull every color from the existing tokens in `globals.css` — map Material You's color roles
  onto those variables. Do **not** introduce new colors.
- Make the group behave with the mobile-first layout (e.g. it can scroll or collapse on mobile).

## Constraints

- CSS Modules only — no Tailwind, no new styling libraries, no inline styles unless already used.
- Styling and responsive layout only — don't change component logic or data behavior.
- Preserve the `globals.css` palette exactly.
