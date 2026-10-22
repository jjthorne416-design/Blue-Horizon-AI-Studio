# Blue Horizon AI Studio — project map

## Repository layout

```text
BlueHorizonAIStudio/
├── index.html                 # Homepage, feature sections, preview plan cards, contact form
├── studio.html                # Main browser-local creative workspace
├── services.html              # Custom one-time service offers and requests
├── privacy.html               # Current prototype privacy notice; review before launch
├── terms.html                 # Prototype terms; not final commercial terms
├── 404.html                   # Not-found page
├── site.css / site.js         # Public pages: visual styling, navigation, forms, optional checkout URLs
├── studio.css / studio.js     # Workspace styles and browser-only functions
├── config.js                  # Public email, Web3Forms access key, optional public Stripe Payment Links
├── contact.js                 # Contact-submit helper with mailto fallback
├── _headers                   # Basic static response security headers for supported hosts
├── robots.txt
├── assets/
│   ├── horizon-ai-hero.jpg / .png
│   ├── horizon-ai-mark.svg
│   ├── favicon.svg
│   ├── textures-preview.png
│   └── textures/               # 8 original SVG texture fills
├── BUILD_GUIDE.md
├── GO_LIVE_CHECKLIST.md
├── BUSINESS_PLAN.md
├── MARKET_RESEARCH.md
├── OUTREACH_TEMPLATES.md
└── README.md
```

## Page map

- `index.html`: marketing homepage. Uses `config.js`, `contact.js`, `site.css`, `site.js`.
- `studio.html`: local document workspace. Uses `config.js`, `contact.js`, `studio.css`, `studio.js`.
- `services.html`: manually fulfilled service descriptions. Service buttons use inquiry links by default; if actual Stripe Payment Link URLs are set in `config.js`, the buttons change to secure one-time checkout links.
- `privacy.html` and `terms.html`: disclosure drafts for the current prototype; replace/update before adding paid SaaS and consult appropriate advisors.
- `404.html`: friendly not-found page.

## Configuration fields

`config.js` contains only browser-public values:

- `contactEmail`: inbox used by the email-app fallback.
- `web3formsAccessKey`: optional public access key for a static contact form. The website sends submitted contact fields to Web3Forms when configured.
- `servicePaymentLinks.imageTextPack`: optional URL for the one-time Image Text Asset Pack.
- `servicePaymentLinks.documentStarterPack`: optional URL for the one-time Branded Document Starter Pack.
- `servicePaymentLinks.businessContentPack`: optional URL for the one-time Small Business Content Pack.
- `subscriptionsEnabled`: remains `false`; this static prototype has no subscription entitlement service.

Never put AI API keys, Stripe secret keys, session signing keys, passwords, or private credentials in this file. A future server-side application must store those secrets in the hosting provider's encrypted secret/environment settings.

## Important workspace internals

- Browser data lives in localStorage using an existing `horizon-ai-studio` storage key. That legacy key is intentionally retained so a local user's saved drafts are not silently orphaned by the rebrand.
- JSON backup `type` values are internal compatibility identifiers and intentionally remain unchanged when the visible brand changes.
- Image text draws on a canvas using a selected built-in SVG or user-selected image, with text shape as a mask; exported PNG files have a transparent background.
- Story, spreadsheet, and email prompts are local demo/template workflows. They are not remote AI calls.

## Current release boundary

This repository supports publishing a static free beta. It does not contain user accounts, cloud document storage, subscription billing, server-side AI generation, a credit ledger, or paid-feature enforcement. The preview tiers ($0, $4.99, $11.99, $24.99, $49.99) and credit amounts are not active subscriptions. Follow `BUILD_GUIDE.md` before collecting any money.
