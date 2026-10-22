# Start Here — Blue Horizon AI Studio

Welcome! This folder contains the Blue Horizon AI Studio public-beta website and its publishing/business guides.

## The 4 things to do first

1. **Keep a backup.** Extract `Blue_Horizon_AI_Studio_Launch_Package.zip` into Documents as `BlueHorizonAIStudio`. If you already have a folder with that name, rename the old one to `BlueHorizonAIStudio_Backup` first. Do not merge the folders.
2. **Set up contact.** Open `config.js` in Notepad or VS Code. Replace `REPLACE_WITH_YOUR_EMAIL` with a real inbox you monitor. Then get a Web3Forms access key and replace `REPLACE_WITH_WEB3FORMS_ACCESS_KEY`. Save the file. Never put an OpenAI API key or Stripe secret key here.
3. **Test locally.** Open the project folder, click its address bar, type `cmd`, press Enter, then type `python -m http.server 8000` and press Enter. In Chrome/Edge open `http://localhost:8000`. Test every page and the contact form. Press Ctrl+C in Command Prompt to stop the server.
4. **Publish a free public beta.** Follow Section 5 of `BUILD_GUIDE.md` to create the private GitHub repository, then Section 6 to connect it to Cloudflare Pages.

## What is included

- `index.html` — public homepage and plan-preview section.
- `studio.html` — browser-local document and image-text workspace.
- `services.html` — optional manually fulfilled one-time service offers.
- `config.js` — owner settings for contact and optional Stripe service payment links.
- `contact.js` — contact form behavior.
- `privacy.html`, `terms.html` — prototype policy drafts that need owner review.
- `404.html`, `_headers`, `robots.txt` — static-hosting support files.
- `assets/` — branding, hero image, favicon, and eight image-text textures.
- `BUILD_GUIDE.md` — detailed Windows click-by-click build, test, GitHub, Cloudflare, Stripe-service-payment, and production-gating instructions.
- `GO_LIVE_CHECKLIST.md` — final checklist.
- `RELEASE_STATUS.md` — exactly what is and is not production-ready.

## Important — read before charging anyone

The current app is a **static browser prototype**. Its editor, folders, headers, and image-filled text run locally in the browser. Its writing/story/spreadsheet/email workflows are templates/demos, not live AI calls. It does not yet have user accounts, cloud storage, live AI generation, a real spreadsheet engine/XLSX workflow, active subscriptions, or paid AI credit enforcement.

The five software plans remain preview pricing:

| Plan | Price per month | Proposed credits / month |
|---|---:|---:|
| Free | $0 | Basic browser tools only; no active AI allowance |
| Starter | $4.99 | 150 (not active) |
| Creator | $11.99 | 600 (not active) |
| Business | $24.99 | 1,500 (not active) |
| Studio | $49.99 | 4,000 (not active) |

Do not enable monthly software subscriptions until the secure AI backend, authentication, database, server-side credit metering, Stripe subscription lifecycle, billing webhooks, refunds/cancellation process, and commercial policies are implemented and tested.

If you want to test demand for revenue earlier, the custom-services page describes manual one-time deliverables with starting prices. Only attach live Stripe Payment Links after confirming that you can fulfil the exact written scope and handle customer support, refunds, fees, and applicable business/tax requirements.
