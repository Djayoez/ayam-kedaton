# Ayam Kedaton — Static Website

This is a simple static landing page for Ayam Kedaton.

## What is included

- `index.html` — main page
- `styles.css` — styling
- `assets/` — logo, menu photos, and icon images

## Local preview

### Option 1: Open directly
Open `index.html` in your browser.

### Option 2: Use a local HTTP server
From this project folder, run one of these commands:

- Python 3:
  ```powershell
  python -m http.server 8000
  ```
- Node.js:
  ```powershell
  npx http-server . -p 8000
  ```

Then visit `http://localhost:8000`.

## Publish later

This site is ready for static hosting. You do not need a backend.

### GitHub setup

If you want to publish with GitHub, you should install Git first.

- Windows: install from https://git-scm.com/download/win
- After installation, open PowerShell in this project folder and run:
  ```powershell
  git init
  git add .
  git commit -m "Initial Ayam Kedaton site"
  ```
- If you prefer a GUI, use GitHub Desktop instead:
  - Download https://desktop.github.com
  - Add this folder as a local repository
  - Publish the repository to GitHub from the app

### Best static hosting options

1. **Netlify**
   - Create a free account at https://www.netlify.com
   - Drag and drop the project folder or connect a GitHub repository
   - The site will be published automatically

2. **Vercel**
   - Create a free account at https://vercel.com
   - Import the project from GitHub or use the Vercel CLI
   - Works great for static HTML/CSS sites

3. **GitHub Pages**
   - Create a GitHub repository
   - Push this project to the repository
   - Enable GitHub Pages from repository settings

## CMS integration

The website now supports both:

- static fallback content from `content/*.json`
- optional Sanity content from a Sanity project via `sanity-config.js`

### Sanity setup (recommended)

1. Create a Sanity account at https://www.sanity.io.
2. Create a new project and dataset, for example `production`.
3. Add the document types below in your Sanity Studio:
   - `siteSettings`
   - `menuItem`
   - `testimonial`
4. Replace `projectId` in `sanity-config.js` with your actual Sanity project ID.
To run the local Sanity Studio in this repo:

```powershell
cd sanity
npm install
npm run dev
```
### Example Sanity schemas

- `siteSettings`
  - `eyebrow` (string)
  - `headline` (text)
  - `sub` (text)
  - `heroImage` (image)

- `menuItem`
  - `name` (string)
  - `description` (text)
  - `price` (string)
  - `image` (image)

- `testimonial`
  - `author` (string)
  - `text` (text)

You can also copy these examples into your own Sanity Studio project from `sanity/schemas/`.

### How the site loads content

- If `sanity-config.js` contains a valid `projectId`, the page will fetch content from Sanity.
- If not, the site falls back to the static JSON files in `content/`.

## Domain name

A custom domain is optional but recommended.

- Buy from a registrar such as Namecheap, Google Domains, Niagahoster, or Rumahweb
- Point DNS to Netlify or Vercel if you use those services

## What to do next

- Keep the page simple and static for now
- If you want articles later, we can add a simple blog section or connect a headless CMS later

## Need help?

If you want, I can also:

- help set up a GitHub repository
- deploy this site to Netlify or Vercel
- connect a custom domain
- add a simple article/blog section later
