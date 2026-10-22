# Blue Horizon AI Studio — public beta starter

Blue Horizon AI Studio is a browser-based creative workspace prototype that combines a local document editor, folders, editable header designs, several writing/story/email/spreadsheet starter workflows, and image-filled typography that exports transparent PNG files.

## Open locally

1. Open the `BlueHorizonAIStudio` folder.
2. To test canvas export reliably, start a local server from this folder using `python -m http.server 8000` (if Python is installed).
3. Open `http://localhost:8000` in a browser.
4. Open `studio.html` through the homepage and test documents, story/spreadsheet/email starter tools, folders, and Image Text Studio.

## Before publishing

1. Read `BUILD_GUIDE.md` completely.
2. Configure `contactEmail` and (recommended) `web3formsAccessKey` in `config.js`.
3. Verify the name/domain and review privacy/terms for the actual operator.
4. Test locally, create the private GitHub repository `blue-horizon-ai-studio`, and deploy the static public beta using the Git integration documented in the guide.

## Pages and files

- `index.html` — homepage, feature overview, preview subscriptions, contact form.
- `studio.html` — browser-local document editor, folders, headers, image-text studio, story/spreadsheet/email template workflows, and support form.
- `services.html` — three proposed one-time manual-service packages; buttons remain enquiry links until valid live Stripe Payment Links are configured.
- `site.css`, `site.js` — homepage/services styling and navigation, contact, service-link behavior.
- `studio.css`, `studio.js` — Studio styling and browser-local prototype behavior.
- `config.js` — public contact configuration, optional Web3Forms key, and optional one-time service Payment Link URLs.
- `contact.js` — Web3Forms contact submission with mailto fallback.
- `assets/` — original hero artwork, logo mark, favicon, texture preview, and eight original SVG textures.
- `privacy.html`, `terms.html` — prototype policy/terms drafts; review before commercial launch.
- `404.html`, `_headers`, `robots.txt` — simple deployment support files.
- `BUILD_GUIDE.md` — detailed local testing, branding clearance, GitHub, Cloudflare Pages, Web3Forms, one-time payments, and commercial launch limits.
- `BUSINESS_PLAN.md` — lean business strategy and pricing assumptions.
- `MARKET_RESEARCH.md` — initial public-source desk research.
- `PROJECT_MAP.md` — code/layout overview.
- `OUTREACH_TEMPLATES.md` — customer interview and pilot outreach examples.

## What works in this public-beta prototype

- Rich-text document editing with multiple fonts and basic formatting.
- Ten editable header starter designs.
- Local documents, folders, renaming, saving, imports for TXT/Markdown/HTML/Horizon JSON.
- HTML, text, JSON export; browser print-to-PDF.
- Image text: fill typed letters and numbers with one of eight built-in SVG textures or an uploaded image; export transparent PNG; insert the image into a local document.
- Local starter workflows for stories, spreadsheet tables (CSV), and email drafting.
- Contact forms can email an inbox through Web3Forms after the owner configures an access key; otherwise they attempt a mailto draft.
- Optional one-time Stripe Payment Links can be attached to the custom service cards via `config.js` after the owner creates and tests them.

## Not live yet — do not promise otherwise

- No live AI model/API is connected; prompt boxes currently create local templates/demo drafts.
- No user accounts, cloud document storage, cross-device sync, teams, or shared documents.
- No real subscription checkout, account entitlement enforcement, or AI credit ledger.
- AI plan credits/pricing are preview-only and must not be charged until the corresponding features are implemented.
- Spreadsheet formulas, XLSX import/export, and direct `.docx` compatibility are not implemented.
- Browser local storage can be cleared and is not appropriate for confidential or regulated records.

## Security

Never place Stripe secret keys, payment credentials, passwords, or AI provider API keys in `config.js`, HTML, CSS, or browser JavaScript. Web3Forms' access key is designed to be public for static-site form use. Future AI and subscription functions need server-side code, encrypted secrets, authentication, database-backed entitlements, rate limits, and verified payment webhooks.
