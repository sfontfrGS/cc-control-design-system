# Port to Design System

You are migrating an existing page to the CC Control design system.

The end deliverable is a **standalone `.html` file** in `prototypes/` that:
- Works on GitHub Pages and file:// with no build step
- Uses `side-nav.js` + `topbar.js` for shell
- Uses `components.css` + `tokens.css` for styling
- Can be opened in a browser and shared directly with the dev team

---

## Step 1 — Understand the source

The user will provide one of:
- A path to an existing HTML file
- A screenshot of the live product
- A Figma URL
- A description of the page

Read or inspect whatever they provide. If it's a Figma URL, call `mcp__Figma__get_design_context` on the node.

---

## Step 2 — Pick the right template

Choose the closest template from `prototypes/`:

| Layout | Template to copy | Use when |
|--------|-----------------|----------|
| Data table with filters + pagination | `template-table.html` | Lists of users, ranks, content items, etc. |
| Settings form with cards | `template-settings.html` | Config pages, toggle rows, form fields |
| Topic / moderation detail | `template-topic.html` | Single-item detail with sidebar panels |
| Anything else | `_template.html` | Generic content area |

Copy the chosen template to `prototypes/<page-name>.html`.

---

## Step 3 — Set the shell

On the `<body>` tag set:
- `data-section` — the nav section key (create / home / content / email / users / analytics / platform / gamification / customization / integrations / ai / settings)
- `data-active-item` — the exact nav item label that should be highlighted (e.g. `"Ranks"`, `"AI Settings"`)

The two script tags already in the template handle the rest:
```html
<body data-section="gamification" data-active-item="Ranks">
  <script src="../components/side-nav.js"></script>
  ...
  <div class="main">
    <script src="../components/topbar.js"></script>
```

---

## Step 4 — Migrate the content

Replace the template placeholder content with the real page content. Use design system classes from `components.css`:

**Tables** → `.dt`, `.table-card`, `.action-bar`, `.col-*` size classes, `.filters-row`, `.bulk-toolbar`, `.pagination`

**Settings** → `.dirty-section`, `.dirty-section__card`, `.dirty-section__field`, `.dirty-section__field-row`, `.feat-toggle`, `.select-trigger`

**Buttons** → `.button-control-new.button-control-new--{size}.button-control-new--{variant}` (size: small/medium; variant: primary/secondary)

**Page header** → `.page-header > h1` or `.control-header > h2`

**Banners / notifications** → `.page-banner.page-banner--{success|warning|danger|info}`

**Status pills** → `.status-pill.status-pill--{published|pending|hidden}`

Reference `components/components.html` for full component catalogue.

---

## Step 5 — Deliver

1. Save the file to `prototypes/<page-name>.html`
2. Start or reload the preview server and take a screenshot
3. Compare against the source — call out any components that have no design system equivalent (so the user knows what's still a gap)
4. Commit the file with a descriptive message
5. Push to GitHub Pages
6. Report the local preview URL and the GitHub Pages URL

---

## Notes

- Keep the page title (`<title>`) updated to match the screen name
- Do not add inline styles — use design system classes or add to `components.css` only if a new pattern is genuinely needed
- If the source has a nav panel, map it to `data-active-item` — do not rebuild a custom nav
- Table column widths use the design system size classes: `.col-checkbox` (40px), `.col-m-big` (240px), `.col-s` (160px), `.col-m-flexible` (220px), `.col-xs-right` (90px), `.col-s-right` (130px)
