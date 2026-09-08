# Control Admin — Design System (reverse-engineered)

Extracted from the live control/admin panel at `dchdesign-en.insided.com` for building
accurate HTML prototypes ahead of the real design system being available to us.

**Status:** v0.2 — two passes done 2026-09-08 (first pass, then a fix + expansion pass after
review caught gaps — bulk-selection table state, full pagination, modals, toasts, rich text
editor, uploads, tags, nested tree, rule builder, more button variants). **Still not
exhaustive** — see "What's NOT covered yet" below before assuming something isn't cataloged
just because it's missing from here.

## What's here

- [`tokens/tokens.css`](tokens/tokens.css) — color, typography, radius, and spacing tokens as CSS
  custom properties (`--hz-*`), extracted directly from the panel's own `:root` variables.
  This is the *real* token set the tech team's newest admin screens already use (a system
  they seem to call "Horizon" internally, based on the `--hz-` prefix).
- [`components/components.html`](components/components.html) — visual catalog of components
  (buttons, inputs, checkboxes/radios, toggle switch, tabs, stat cards, data table, search,
  filter flyout, badges, empty state), each built with real extracted styles. Open it in a
  browser as a living reference; copy the markup/classes straight into prototypes.
- [`shell/shell.html`](shell/shell.html) — reusable page shell: icon rail + section flyout nav +
  topbar + content area, matching the real control panel chrome. Duplicate this as the base
  for every new prototype page and swap out `.content`.
- [`sitemap.md`](sitemap.md) — map of every section/page in the admin panel, for reference when
  looking for more component examples.

## Important: three co-existing design generations

The admin panel is mid-migration and currently ships **three different button/form
styles** depending on how old the page is:

| Generation | Where seen | Radius | Look |
|---|---|---|---|
| **Current ("Horizon")** | Users Overview, AI Settings, newer settings pages | 4px | Clean, `--hz-*` tokens, `.button-control-new` classes |
| **Mid** | Role/Rank edit screens | 2px | `.button-control` classes, green save / red delete |
| **Legacy** | Oldest screens (e.g. User Roles list) | 2px | Bootstrap-style `.btn.btn-primary`, blue #1E9CDF |

**Use the Current/Horizon generation for all new prototypes** — it's the direction the
product is heading. The other two are documented only so you can recognize them when
auditing existing screens.

## Correction log

- **2026-09-08:** The Users Overview table toolbar/pagination structure was wrong in the first
  two passes — it approximated a common "search+filters row, pagination footer below table"
  pattern instead of copying the real one. Verified against the live page at desktop width:
  the real structure is **two rows above the table** (Filters+Search, then Refresh+Columns
  with pagination pushed right via `margin-left:auto` on the same row) and **no footer at
  all**. Also corrected: avatar pattern (real pastel-initial colors + real uploaded-photo URLs,
  not invented colors), topbar icons (3 specific real icons, not a generic bell), and the real
  column set (11 columns, not 5). Lesson: when the task is "copy this exactly," pull real
  HTML/CSS from the live page for structure and content, not just colors/spacing — don't
  reconstruct layout from memory of a common pattern.

- **2026-09-08 (2nd correction pass):** Went back through every already-documented component
  and re-verified each against live HTML/CSS instead of the approximations from the first two
  passes. Found and fixed: **Summary/stat cards** were shown as 3 separate cards — real
  structure is one card with a 3-column metric grid inside. **Badges/pills** section was
  entirely fabricated — no colored-pill-badge component actually exists in Control; real status
  indicator is a colored dot + plain text. **Empty state** used an emoji instead of the real
  PNG illustration. **Tabs** had slightly wrong font-size/color. **"Write with AI" panel** was
  a flat gray box with purple text — real one has a gradient border (orange→purple→blue via a
  double-background padding-box/border-box trick) and gradient `background-clip:text` label.
  **CKEditor toolbar** background was white — real one is gray `rgb(207,209,207)`. Lesson: even
  components that "look done" need the same live-HTML verification pass, not just the ones
  flagged as gaps.

- **2026-09-08 (3rd pass — remaining approximations):** Finished verifying every component that
  was still built from partial/guessed data. Found: **"Permission grant/deny segmented
  control" didn't exist** — it's the same `.control-switcher` toggle switch, just shown small;
  the fabricated component has been removed entirely. **Breadcrumb had a fabricated arrow
  icon** — real one is plain text, no icon, no `::before`. **Applied filter dismiss icon** now
  uses the real SVG (X glyph) instead of a text ✕. **File upload button** was styled as Horizon
  but the verified real one (Create Article → Featured Image) is legacy-generation
  (`.btn.btn-default.btn-upload`, 2px radius) — noted that a second, Horizon-styled upload
  button also exists elsewhere (Create Section), so generation depends on the surrounding page.
  Mid/Legacy button colors were re-checked and were already correct from the original
  extraction. This closes out the correction backlog — everything in `components.html` has now
  been checked against live markup at least once.

- **2026-09-08 (prototype gap):** After building `moderate-topic.html`, review caught that I'd
  silently skipped 4 real sections from the live page (Featured image, Featured Image Alt Text,
  Team notes, Content helpfulness) because I judged them "low reuse value" — that judgment call
  wasn't mine to make silently. Went back, extracted them for real, and fixed a structural
  error in the process: "Section visibility" and "Topic performance" are not separate panels,
  both live inside one "Content helpfulness" panel. Added all 3 as new components (image-upload-
  with-preview, moderator-only note, content-helpfulness/performance widget). Lesson: don't
  decide a section is skippable without flagging it — incomplete-but-silent is worse than
  incomplete-and-noted.

- **2026-09-08 (missing reply thread):** The topic used to build `moderate-topic.html` had 0
  replies, so the entire reply thread — action bar (Like/Reply/Follow/Share), reply composer,
  reply list, and the "New" unread indicator — was silently absent, not just unstyled. Opened a
  topic with a real reply to extract it. Found the content-type flag ("GUIDE" above a title)
  and the "New" reply indicator are the SAME real colored-pill component
  (`.label-component.label--brand.label--emphasis-high`) — which **reverses** the earlier
  "no colored pill exists" finding from the badges correction. Also found each threaded reply
  reuses the exact same `.topic-header` structure as the main post (not a separate "reply"
  component), just indented with a left+top border. Added content-type/new pill, action bar,
  and reply composer/thread to `components.html`. Not fully verified: the bulk-select footer
  for replies (Select all/Trash replies) — noted as unverified, mapped to the existing table
  bulk-toolbar pattern as a placeholder.

- **2026-09-08 (replies header + content-type variance):** Side-by-side against a real Ideas
  topic caught two more gaps: the "N Replies" header was missing its full pagination bar
  (« ‹ Page 1 of 1 › » · rows-per-page · sort — I'd only shown the sort dropdown), and the tags
  row's "Edit tags" was missing its pencil icon. Fixed both. Also newly confirmed: action-bar
  wording and the top toolbar both vary by content type — Articles show "Like" + Version
  History, Ideas show "Upvote" (with voter-count chip) + a status workflow dropdown + "Merge
  idea." Documented as a variance to check per content type, not a fixed toolbar.

- **2026-09-08 (missing card):** The opening post, reply composer, and each threaded reply were
  rendering directly on the gray page background with no card at all. Verified the real pattern
  (`.topic-wrapper` — white, 1px border `#D5D9DE`, 8px radius, 16px padding) wraps ALL THREE:
  the whole opening post, the reply composer (with a visible "Write a reply" heading above it,
  not hidden as I'd noted before), and each individual reply — same card, not the border-indent
  I'd built earlier. Also corrected the reply composer's real placeholder text
  (`"Leave a reply..."`, not `"Write a reply"`). Fixed in both the prototype and the shared
  library.

- **2026-09-08 (sidebar proportion):** The Moderate Topic sidebar was a rigid fixed 280px with
  no shrink, making it look oversized relative to the main content at narrower viewports.
  Verified live: the real sidebar is `flex: 0 2 400px; min-width: 320px` next to
  `flex: 1 1 auto` main content, inside a `display:flex; gap:24px` layout — it shrinks faster
  than the main column as the viewport narrows, it's not a static width. Also removed a
  fabricated white background + border-right on the sidebar (verified: transparent, no border —
  the gray page background comes from a shared ancestor, and each panel/card supplies its own
  boundary). Fixed in the prototype.

- **2026-09-08 (panels lost their background):** Fixing the sidebar's fabricated white
  background/border-right exposed that the sidebar panels (Overview, Details, Featured image,
  Team notes, Content helpfulness) never had their own background either — they'd only looked
  right by accident, riding on an ancestor's white background that's since been removed.
  Verified live: each panel is really two backgrounds, not one — `.m-section-header` (gray
  `#F5F7F9`, rounded top only) and `.m-section-body` (white, rounded bottom only), together
  forming one seamless card. Fixed in both the prototype and the shared library. Lesson: a
  component that "looks right" in one context can be silently depending on a background it
  doesn't own — moving it (or fixing a neighboring component) can break it invisibly.

- **2026-09-08 (full sweep, round 1):** Went through Customization (Header, Footer, Phrases),
  Gamification (Badges + Add Badge form), Settings (Product Areas, Languages, Public Tags), and
  Platform (Groups, Custom Pages, Events + Create Event) looking for genuinely new component
  types. Analytics skipped per user (out of design scope). Found and added 5 new real
  components: **color picker** (swatch + hex + popover trigger), **image-upload empty state**
  ("Click to add" + camera icon, distinct from the already-documented preview state), **toggle-
  that-reveals-a-subform** (reusable pattern, not a new toggle), **date/time picker** (date field
  is flatpickr — a real third-party library, trigger documented but calendar grid itself treated
  like CKEditor: don't hand-build it; time field is just the existing dropdown-select component),
  and **radio option card** (recurring pattern across Header/Footer/Badge-type/Event-registration).
  Everything else checked (Phrases, Public Tags, Languages, Groups) reused already-documented
  table/toggle/button patterns — no new component needed. See `sitemap.md` for exactly which
  pages are now verified vs. still unknown.

- **2026-09-08 (full sweep, round 2):** Continued through the remaining Settings pages, Email,
  Integrations, and Gamification▸Ranks. Most reused existing patterns (rule-builder card, radio
  option card, tables) — good sign the core set holds up. Found and added 4 more real
  components: **dynamic editable list** (add/remove text rows — Moderation Labels; distinct from
  Tags input, which applies existing tags rather than managing the list of possible values),
  **inline table empty state** ("No items found..." — a plainer alternative to the illustrated
  empty state, for genuinely-empty config lists rather than moderation queues), **light-blue info
  banner** (`.warning-box`, page-level notice, distinct from the gray inline info-callout), and
  the **integration app card grid** (2-column, icon+title+description, whole card is a link).

- **2026-09-08 (full sweep, round 3):** Continued through System Emails, Third-party Scripts,
  Point system, Content & Replies, Ideation, and Embeddable Widget▸Installation. Found 4 more
  real components: **code editor** (CodeMirror-based, used for email templates and custom
  head/footer scripts — same "don't hand-clone the library" treatment as CKEditor/flatpickr),
  **searchable multi-select combobox** (button trigger + popover — reuses the exact same shell
  as the Filter flyout, just with a search box + checkboxes inside instead of grouped links),
  **config + live-preview two-column layout** (settings on the left, the real rendered
  community-facing widget on the right — worth reusing for any setting that affects something
  end-users visually see), and **code snippet with copy button** (not fully re-verified — noted
  as approximation in the doc itself).

- **2026-09-08 (full sweep, round 4 — final):** Finished the remaining list: Integrations▸API,
  SSO▸End Users, Platform▸Knowledge Base, Settings▸Event Types/Ideation Status/Platform
  Visibility/Moderation Notifications. Found 2 more real components: **list-row card**
  (`.method-box` — icon + title/description + trailing action, full-width row; distinct from
  the 2-column app-card grid, used for short lists like SSO methods) and, importantly, a
  **third correction to the colored-pill-badge saga**: Ideation Status proved colored pills
  really do exist as a third real pattern — user-configurable workflow status labels
  (`.status-list__item-status-name`), visually identical to the content-type/new-flag pill but
  a distinct class, and distinct from the moderation-status dot. All three now documented
  clearly so future work doesn't re-litigate this. This closes the full-platform sweep — see
  `sitemap.md` for the short list of un-opened pages, none of which are expected to hold a new
  component family based on everything seen so far.

- **2026-09-08 (side nav corrected via Figma + fully truncated menu fixed):** Two real bugs
  flagged from a full-window screenshot of `ideation-status.html`: (1) the flyout menu only
  showed the "Platform" group instead of Settings' full real menu (Platform/User/Topic/
  Moderation/SEO); (2) the table looked off due to uneven auto-sized columns and an extra
  row-divider border that (per the earlier table correction) shouldn't exist. Fixed the table
  (even column widths verified live, no borders). For the nav, cross-checked against the team's
  Figma file ("CC Design System — Control") and found it shows a newer rail treatment (bg
  `#34383A` + 3px active border, wider bordered drawer, 20px title) that — re-verified directly
  — is NOT yet shipped in the live product. Kept live values as the default in `shell/shell.html`
  since prototypes should match what's actually live, but documented the Figma variant so the
  team can decide if they want it. Did fix one real bug the Figma comparison caught: the group
  label styling was wrong (11px/700/.04em/#5F6C7A) vs the correct 12px/400/1px/#3C4A57 — same in
  both Figma and live. `shell/shell.html` is now the single canonical source for the nav; new
  prototypes should copy from it, not hand-roll it.

- **2026-09-08 (icon set added):** Created `tokens/icons.html` — loads the full Google Material
  Symbols Outlined font (~2,500 icons, any name works via `fonts.google.com/icons`) plus a
  curated reference grid of icons already relevant to our prototypes, with click-to-copy markup.

- **2026-09-08 (real rail icons retrofitted):** Before doing a blanket Material Symbols swap,
  re-verified the live product's icon set and found it is a proprietary custom stroke-based
  outline icon system (1.4px stroke, round caps/joins), distinct from Material Symbols. The
  existing in-content icons were already real/verified — replacing them would reduce accuracy.
  Only the icon-rail icons were still approximate. Extracted all 12 real rail SVGs from the live
  product (Add/Home/Content/Email/Users/Analytics/Platform/Gamification/Customisation/
  Integrations/AI/Settings) with `stroke="currentColor"` normalization and replaced the rail in
  all 5 files: `shell/shell.html`, `users-overview.html`, `ai-settings.html`,
  `moderate-topic.html`, `ideation-status.html`, each with the correct active icon. Also removed
  the old `.icon-rail__item svg { fill: none; }` CSS override that conflicted with fill-carrying
  paths in the real icons. Verified rendering — all icons display correctly.

- **2026-09-08 (Figma design system audit):** Reviewed all 30+ component pages in the Figma CC Design System — Control file against our HTML library. Changes made to `components/components.html`:
  - **Pill (Lozenge) added** — Horizon design system component with 7 variants (default, info, info-bold, success, success-bold, warning, danger), replacing the old fabricated `.badge` class that was never matched to any live or Figma pattern. Specs: 11px/700/uppercase, 0 4px padding, 4px radius, 16px line-height.
  - **Section Message added** — 4-variant component (information/success/warning/danger) with exact Figma colors and leading icon. Distinct from the live `.warning-box` (documented separately) — this is the new Horizon design not yet shipped.
  - **Spinner added** — 5-size component (xsmall 12px → xlarge 80px), primary blue `#0369e9` arc on gray `#d5d9de` track. Was completely absent from the library.
  - **Button ghost + danger-subtle added** — two appearances from Figma not yet in the live codebase. Ghost: transparent bg/border. Danger-subtle: white bg + `#dc3626` red text + standard border (for lower-impact destructive actions like "Remove/Leave").
  - **Modal width corrected** — was 420px (matched nothing in Figma). Corrected to 528px (small), with medium 728px and large 880px variants added.
  - **Toggle deprecation noted** — Figma explicitly marks the current `.control-switcher` (51×24px, ✓/✕ inside) as "Legacy Toggle (To Deprecate)." New design is 40×20px pill. Noted in the component with migration guidance — keeping legacy for now since it's what's live.
  - **Figma-only vs live distinctions** clearly marked throughout — ghost, danger-subtle, Section Message, Spinner, and Pill are all labelled "NOT in live codebase yet, added from Figma" so devs know which components are aspirational vs verified-live.
  - Remaining gaps flagged for follow-up: Checkbox/Radio need 24px custom styling, Empty State needs illustration system, Pagination paradigm needs reconciliation (page buttons vs input box).

## What's NOT covered yet

Second pass (2026-09-08) added: bulk-selection table state + full pagination, applied-filter
pills, breadcrumb, modal/dialog (with real scrim opacity), success toast, kebab dropdown menu,
CKEditor4 rich text toolbar, "Write with AI" panel, file/image upload control, tags input,
nested draggable category/section tree, and the Automation Rules sentence-style rule builder
card (with inline input + info callout). Also found 2 more button variants (`--success`,
`--warning-outline`) and a split-button pattern.

Still **confirmed missing** — not inspected at all yet:

- **Color picker** — looked in Customization > Header/Sidebar, not found there. Try Footer,
  or it may not exist as a distinct control (some platforms just take a hex text input).
- **True date picker** (calendar popup) — Event Settings/Registration Rules turned out to be
  radio groups, not date pickers. Still unconfirmed whether one exists anywhere in Control.
- **Loading / skeleton states.**
- **Long-text / overflow / truncation handling** (e.g. very long usernames, labels).
- **Disabled/hover states on nav rail and nav-panel items** — only the active state is confirmed.
- **Dark mode / contrast variant** — control panel appears light-only; unconfirmed either way.
- **Combobox with search-and-filter** (the "Choose a label" field is a plain text input with
  a clear icon, not a full searchable dropdown — a true search-combobox hasn't been seen yet).

Treat `components.html` as "confirmed real," and treat anything not in it as "unknown,"
not "doesn't exist." Pages actually inspected so far: Home, Users Overview, User Roles/Edit
Custom Role, AI Settings, Content > Articles (list + editor), Platform > Community (category
tree), Customization > Header/Sidebar, Settings > Event Settings/Automation Rules/Registration
Rules.

## Caveats (read before trusting this blindly)

- This is a **snapshot** taken 2026-09-08 by inspecting rendered pages — not the tech team's
  actual source of truth. If they ship visual changes, this will drift out of date.
- Only states that were visible during the pass are captured (e.g. hover/focus/disabled/error
  states were mostly not triggered — some are estimated, not measured). Flag anything
  uncertain before a real handoff.
- Not every page/section was inventoried yet (see `sitemap.md` for what's covered vs. not).
- Spacing wasn't found as explicit design tokens (no `--hz-spacing-*` vars exist) — spacing
  values in `components.html` are empirical, read off individual elements, not a formal scale.

## Next steps / how to extend this

1. Duplicate `shell/shell.html`, rename, and drop in content built from `components.html`
   pieces for each new prototype.
2. When a new component type is needed that isn't in the catalog yet, go find it live in
   control, inspect it (same method as this pass), and add it to `components/components.html`.
3. Periodically re-check pages already catalogued for drift, especially anything the tech
   team is actively rebuilding into the Horizon system.
