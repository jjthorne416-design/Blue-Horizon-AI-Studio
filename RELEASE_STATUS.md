# Blue Horizon AI Studio — release status

**Release target:** Free public beta, not paid SaaS production.

## What is ready in this package

- Rebranded static homepage and responsive site styles.
- Browser-based document editor, folder/document list, editable header designs, selected file import/export, and image-filled typography PNG workflow.
- Local demo/template workflows for writing, story, email, and spreadsheet-related starter content.
- Custom one-time-service information page, three starter service scopes, contact form integration hooks, privacy/terms drafts, 404 page, robots file, and static hosting headers.
- Step-by-step GitHub Desktop + Cloudflare Pages publishing instructions.
- Five software-plan prices retained as preview pricing.

## Required before publishing the free public beta

1. Owner enters their real support inbox in `config.js`.
2. Owner creates/configures Web3Forms and verifies the form reaches their inbox (or knowingly uses the mailto fallback).
3. Owner searches the brand/name and reviews privacy/terms for the actual operator.
4. Owner opens and tests every page locally, then deploys and repeats the tests on the public HTTPS address.
5. Owner confirms the product description clearly says AI generation, account/cloud sync, and monthly subscriptions are not active.

## What is not production-ready yet

- Real server-side AI generation.
- Secure user accounts and authorization.
- Cloud document storage/synchronization.
- Full spreadsheet calculation or XLSX creation/editing.
- Direct Microsoft Word DOCX import/export.
- Paid user entitlements, server-side AI credit metering, subscription checkout, billing webhooks, cancellations, and customer portal.
- Production-reviewed privacy, terms, subscription, tax, refund, and consumer disclosures.

**Do not collect monthly SaaS subscription payments yet.** A payment link by itself does not provide the described AI features, create a user account, or enforce usage credits.

## Optional first-revenue path

The `services.html` page describes manual, one-time deliverables: Image Text Asset Pack (starting at $19), Branded Document Starter Pack (starting at $29), and Small Business Content Pack (starting at $49). These are illustrative starter offers. Only put live Stripe Payment Links into `config.js` after the deliverables, limits, delivery time, refund/cancellation terms, and support process are confirmed. Then fulfil those orders manually and record income and expenses.

## Validation performed for this package

- JavaScript syntax checks passed for `site.js`, `studio.js`, `contact.js`, and `config.js`.
- Static HTML checks passed for local resource references and duplicate IDs on all six HTML pages.
- Four paid plan price strings were verified in the homepage.
- Scan found no Stripe `sk_live_` / `sk_test_` or OpenAI API key values embedded in source.
- Automated interactive browser verification could not be run in this environment because browser navigation was blocked by its execution policy. The local browser and published-site checklist in `BUILD_GUIDE.md` remains mandatory.

Last updated: October 22, 2026.
