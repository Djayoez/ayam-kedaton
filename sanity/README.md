# Sanity Studio for Ayam Kedaton

This folder contains a local Sanity Studio setup for your project.

## Setup

From the project root run:

```powershell
cd sanity
npm install
```

## Run the Studio locally

```powershell
cd sanity
npm run dev
```

Then open the URL shown in the terminal, usually `http://localhost:3333`.

## What is included

- `sanity.config.js` — Sanity Studio configuration, including your project ID and dataset
- `schemas/siteSettings.js` — home page hero content
- `schemas/menuItem.js` — menu items
- `schemas/testimonial.js` — customer testimonials
- `sanity/package.json` — local Studio dependencies and scripts

## Sanity project settings

- `projectId` is set to `0b8sjspb`
- `dataset` is set to `production`
- `http://localhost:3333` should be allowed in Sanity CORS origins

## Next steps

1. Run the Studio locally.
2. Use the Studio to create documents for:
   - `siteSettings`
   - `menuItem`
   - `testimonial`
3. Save content in Sanity and then preview your front-end.

## Seed Sanity with current website data

This repo now includes a seed script that imports your existing `content/*.json` data into Sanity.

1. Create a Sanity write token in the Sanity dashboard under `API` → `Tokens`.
2. Set the token before running the seed script.
   - Windows PowerShell: `setx SANITY_API_TOKEN "your_token_here"`
   - Command Prompt: `set SANITY_API_TOKEN=your_token_here`
   - Git Bash / WSL: `export SANITY_API_TOKEN=your_token_here`
3. From the `sanity` folder, run:
   ```powershell
   npm.cmd install
   npm.cmd run seed
   ```
4. Refresh Studio after the script completes.

If you prefer, copy `.env.example` to `.env` and add your token there. The seed script now loads `.env` automatically.

## Website content behavior

- If Sanity is available, the website will fetch content from your Sanity project.
- If Sanity is not available, the site will continue to load the static fallback content from `content/*.json`.
