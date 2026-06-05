# CLAUDE.md — Ayam Kedaton Website

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Project Overview
- **Site:** Ayam Kedaton — Indonesian restaurant website
- **Language:** Indonesian (`lang="id"`). All copy must be in Indonesian.
- **Frontend:** `index.html` + `styles.css` (custom CSS, no framework)
- **CMS:** Sanity.io — project ID `0b8sjspb`, dataset `production`
- **Sanity Studio:** `sanity/` folder — run with `cd sanity && npx sanity dev`
- **Frontend ↔ CMS bridge:** `sanity-config.js` in root (GROQ queries for home, menu, testimonials)

## Brand Assets
- All assets live in `assets/` — check here before designing anything.
- `assets/logo.png` — use this for the logo, never a placeholder.
- `assets/menu-*.jpg`, `assets/menu-box.jpg`, `assets/menu-paket.jpg` — real food photography.
- `assets/icons/` — delivery platform icons: whatsapp, grabfood, gofood, shopeefood.
- Do not use `placehold.co` for anything that has a real asset available.

## Brand Tokens (from `styles.css`)
Use these exact values — do not invent new brand colors:

| Token | Value | Use |
|---|---|---|
| `--color-primary` | `#C8522A` | burnt orange — main brand |
| `--color-secondary` | `#F5A623` | golden yellow — accents |
| `--color-dark` | `#2C1A0E` | deep brown — body text |
| `--color-light` | `#FFF8F2` | warm off-white — background |
| `--color-surface` | `#FFFFFF` | card backgrounds |
| `--color-muted` | `#7A6050` | secondary text |

## Typography
- **Headings:** `'Playfair Display', Georgia, serif` — already loaded via Google Fonts
- **Body:** `'Inter', system-ui, sans-serif` — already loaded via Google Fonts
- Never introduce a third font without explicit instruction.
- Large headings: tight tracking (`-0.03em`). Body text: generous line-height (`1.7`).

## Local Server
- Start dev server: `node serve.mjs` (serves project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- Always serve on `localhost` — never screenshot a `file:///` URL.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Puppeteer is installed in the project root (`node_modules/`). Chrome cache: `C:/Users/User/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved to `./screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Do not improve or add to the design.
- If no reference image: design from scratch following the brand tokens and anti-generic guardrails below.
- Do at least 2 comparison rounds against the reference. Stop only when no visible differences remain or user says so.

## Sanity CMS Schema
Three content types are defined in `sanity/schemas/`:
- **siteSettings** — hero eyebrow, headline, sub-copy, hero image
- **menuItem** — name, description, price, image
- **testimonial** — author, text

When editing frontend data fetching, always use GROQ queries matching those in `sanity-config.js`.

## Output Defaults
- Edit existing `index.html` + `styles.css` files — do not create new HTML files unless instructed.
- Keep CSS variables in `styles.css :root` block — never hardcode brand values inline.
- Mobile-first responsive layout.
- Placeholder images only when no real asset exists: `https://placehold.co/WIDTHxHEIGHT`

## Anti-Generic Guardrails
- **Colors:** Use the brand palette above. Never use default Tailwind blue/indigo or generic grays.
- **Shadows:** Use layered, color-tinted shadows. The established pattern: `0 4px 20px rgba(44,26,14,0.10)`.
- **Typography:** Playfair Display for headings, Inter for body — already established. Do not change.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states.
- **Images:** Add a gradient overlay (`background: linear-gradient(to top, rgba(0,0,0,0.6), transparent)`) on food/hero images.
- **Depth:** Surfaces should have a layering system (base → elevated → floating).

## Hard Rules
- Do not add sections, features, or content not requested
- Do not "improve" a reference design — match it
- Do not use `transition-all`
- Do not introduce Tailwind CDN (this project uses plain CSS)
- All copy in Indonesian unless user says otherwise
