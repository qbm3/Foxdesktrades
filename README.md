# Civa Trades — landing page

Static site: `index.html` + Tailwind CSS v4 (compiled) + `css/styles.css` + vanilla JS (`js/main.js`).

## Styles

| File | What it is | Edit it? |
|---|---|---|
| `css/tailwind.input.css` | Tailwind source: brand colours/font (`@theme`) and which files to scan | Yes |
| `css/tailwind.css` | **Generated** from the file above | No — rebuild instead |
| `css/styles.css` | Hand-written custom styles (animations, cards, slider…) | Yes, no rebuild needed |

### When you add or change Tailwind classes in the HTML

`css/tailwind.css` only contains classes that were in the HTML when it was last built, so rebuild it:

- **While editing:** double-click `tailwind-watch.cmd` (or run it in the VS Code terminal) and leave it open — it rebuilds on every save.
- **Before committing:** run `tailwind-build.cmd` for a minified build, then commit `css/tailwind.css` with your HTML.

The Tailwind CLI lives at `.tools/tailwindcss.exe` (not committed — 130 MB). On a new machine, download
`tailwindcss-windows-x64.exe` from https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.1.11 and save it there.

Text, image, link, `styles.css` and `main.js` changes never need a rebuild.
