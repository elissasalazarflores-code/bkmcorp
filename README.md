# BKM · Business Key Medical — website

Dark-luxury corporate site for BKM – Business Key Medical (English). Static, no build step.

```bash
python3 -m http.server 8000   # then open http://localhost:8000/
```

## Structure

- `index.html` — one page with the content of bkmcorp.com.mx: Home (hero) · About · Execution Platform · Our Philosophy · Services · Customer Success Stories · Contact. Copy is taken from the live site; the only figures shown are the public ones on Customer Success Stories and the “more than 15 years” line from Home.
- `css/styles.css` — tokens from the BKM ID manual: gold `#A89613` (Pantone 104 C), charcoal `#1C1C22` (Pantone 4575 C), silver `#B9BFC5`.
- `js/main.js` — sticky header, mobile menu, scroll reveals, contact form (opens a pre-filled email to contact@bkm.com.mx).
- `assets/` — official BKM logo from the Logo Book SVG, unmodified: `bkm-logo.svg` (symbol + BUSINESS KEY MEDICAL) and `bkm-symbol.svg` (symbol only). Only the canvas background was removed and the viewBox cropped to the artwork; always size them by height with `width: auto`. Office video and stills from `BKM - Our offices - 2026.mp4`.

## Pending

- The live site's footer email link points to `contact@bkmcorp.copm.mx` (typo); this site uses the address shown as text, `contact@bkm.com.mx`.
- Connect the contact form to a form service or CRM if needed.

## Version 2 (`v2/`)

Alternative design published at `/v2/` (GitHub Pages: `https://elissasalazarflores-code.github.io/bkmcorp/v2/`). Same content and assets (`../assets/`), compact layout with deep-navy highlights: hero with figures strip, services selector beside the three-engines diagram, lifecycle and success-stories panels, clinical-area cards, About tabs, values band and contact. Full service and engine copy opens on click to reduce visible text.
