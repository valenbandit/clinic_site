# CSS Build

Tailwind is compiled — not loaded from CDN.

**While editing:** `npm run watch:css` (auto-rebuilds on save)
**Before pushing:** `npm run build:css` (one-time minified build)

Output: `assets/tailwind.css`

> If you add a new Tailwind class and it's not working, you forgot to rebuild.
