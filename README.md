# Nishant Varshney — Portfolio

A self-contained portfolio with a warm ivory, charcoal, orange, and muted lilac palette. Includes a real WebGL sculpture, custom SVG project illustrations, a responsive layout, project filters and details, résumé download, and email contact.

## Open

Double-click `index.html` to view the complete site. No installation, build step, API key, or internet connection is needed for the portfolio itself. GitHub, certificate, phone, and email links use their respective external services/apps.

For a local development server, open a terminal in this folder and run:

```text
npm start
```

Then visit http://127.0.0.1:4173. Stop the server with Ctrl+C. No `npm install` is necessary.

## Edit

- `index.html`: profile, experience, education, contact, and page sections.
- `projects.js`: all 11 project records and four custom SVG illustrations.
- `styles.css`: responsive layouts, typography, colors, and transitions.
- `motion.css`: enlarged Segoe UI / Bahnschrift typography, roomier layouts, and motion styling.
- `motion.js`: animated contour backgrounds, scroll progress, project parallax, pointer tilt, and shared animation controls.
- `sculpture.js`: locally rendered interactive 3D knot, with an SVG fallback.
- `app.js`: filtering, project dialogs, navigation, reveal effects, time, and clipboard.
- `assets/Nishant_Varshney_Resume.pdf`: a copy of the supplied general résumé.

Run `npm run check` to check JavaScript syntax.

## Content provenance

Profile and project facts come from `profile.md`, `projects.md`, `experience.md`, and `resume1/nishantresume.tex` in the supplied Desktop resume folder. The supplied general résumé PDF was copied without modification. The source folder was treated as read-only.

Rusborn dates use the definite August–September 2026 dates in `nishantresume.tex`; the master Markdown files contain an ambiguous “or Present” alternative. The portfolio uses the overall 8.95 CGPA, not the first-semester 9.20. Project illustrations are original concept diagrams, not product screenshots. Projects without supplied repository URLs use an email contact link. No LinkedIn URL, live demo, project date, or client testimonial has been invented.

## Interaction & accessibility

- Drag the 3D sculpture, or focus it and use arrow keys. Touch dragging is horizontal so vertical page scrolling remains available.
- Pause or resume every animation using the fixed motion control or the sculpture button. Reduced-motion preferences are respected; the background pauses when the tab is hidden or project details are open, and the sculpture pauses outside the viewport.
- Project details open in native modal dialogs with Escape dismissal and focus restoration.
- Keyboard focus styles, skip navigation, semantic headings, mobile navigation, and a clipboard fallback are included.
- No analytics, external scripts, external fonts, or runtime dependencies.

## Hosting

This is a static website. Upload `index.html`, `styles.css`, `motion.css`, `motion.js`, `projects.js`, `app.js`, `sculpture.js`, and the `assets` folder to any static host. `server.mjs` is only a local preview utility. No site has been published automatically.
