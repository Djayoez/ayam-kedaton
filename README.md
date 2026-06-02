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

### Recommended workflow

1. Create a Git repository for this folder.
2. Push it to GitHub.
3. Deploy from GitHub to Netlify or Vercel.

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
