# Blue Horizon AI Studio — lean business plan

**Status:** Browser prototype / planned free public beta. Not yet a live AI SaaS.  
**Prepared:** October 22, 2026.

## Executive summary

Blue Horizon AI Studio is a lightweight browser workspace that joins document editing, local folders, editable headers, creative writing/spreadsheet/email starter workflows, and image-filled typography. The current site has no live AI model, cloud account system, cross-device sync, or paid software subscription billing. The first launch goal is to publish the useful browser tools honestly as a free beta, test real workflows, and see what users repeatedly need.

## Core positioning

**Tagline:** Write it. Design it. Make it stand out.  
**Initial product:** Blue Horizon AI Studio.  
**Differentiation hypothesis:** an accessible path from typed words to a polished document or transparent PNG lettering graphic, without forcing users to jump between several tools.

## What's in the prototype

- Local rich-text editor and 20+ font options (network fonts plus system fallbacks).
- Ten editable document header designs.
- Browser-local documents, folders, and file list.
- Import for TXT, Markdown, HTML, and the app's JSON backup format.
- Export to HTML, text, JSON; use the browser's Print dialog for Save as PDF.
- Image Text Studio uses a font as a mask to fill characters with one of eight bundled SVG textures or a user image, then exports a transparent PNG.
- Local template/demo workflows for stories, spreadsheet starter tables, and email copy.
- Configurable contact form via Web3Forms, with mailto fallback.
- A Custom Services page for possible manual one-time digital services.

## Not live yet

- Real AI generation; local prompt inputs currently produce sample/template content.
- Authentication, cloud storage, sharing, or team collaboration.
- Subscription checkout, credit accounting, server-side entitlement enforcement, or AI cost tracking.
- Excel XLSX formulas/import/export or direct DOCX export.
- Account-managed privacy/data deletion workflows.

## Customer segments to validate

1. Solo creators who prepare title art, monograms, posters, and simple documents.
2. Freelancers who prepare branded content for clients.
3. Service businesses that reuse customer reply templates, quotes, notices, and small marketing assets.

Do not target all three with equal effort indefinitely. Conduct 10–20 customer conversations and select the segment with the strongest repeated problem and willingness to pay.

## Public software plans (preview only)

| Plan | Preview price/month | Proposed credits/month | Status |
|---|---:|---:|---|
| Free | $0 | No live AI allowance | Browser tools only |
| Starter | $4.99 | 150 | Preview only |
| Creator | $11.99 | 600 | Preview only |
| Business | $24.99 | 1,500 | Preview only |
| Studio | $49.99 | 4,000 | Preview only |

Do not activate or charge these plans until the features and credit allowances exist and are cost-tested. Credits must be defined as product operations (not simply raw model tokens), enforced server-side, reset according to published rules, and supported by a reliable usage ledger. Subscription billing also needs authentication, a database, verified payment webhooks, cancellation/failed-payment paths, customer self-service, refunds/support handling, and updated legal disclosures.

## Earliest revenue hypothesis: manually fulfilled one-time services

The new `services.html` offers starting-price ideas for custom work. These are service packages, not the software subscriptions:

- Image Text Asset Pack — starting at $19 one time; up to five short transparent PNG graphics, one agreed style direction, one small correction round.
- Branded Document Starter Pack — starting at $29 one time; three editable HTML document templates, matching header/color direction, one small revision round.
- Small Business Content Pack — starting at $49 one time; ten short social-post drafts plus five customer reply/review templates for one business, one wording revision round.

These prices are hypotheses and should be adjusted if scope, customer value, or fulfillment time does not support them. Agree in writing on deliverables, formats, delivery timing, revision scope, refunds/cancellations, and support before accepting payment. Services can be delivered manually while product demand is tested. Stripe Payment Links are optional; they must be created in the owner's verified account and configured in `config.js` only after the offer is ready.

## Market research conclusion

AI interest among small businesses is documented by current public surveys, but that does not prove that customers will buy this specific app. Established products such as Canva and Adobe Express already serve design and creative-text needs. Horizon should compete on focus, simplicity, and the combined workflow—not on claiming to have the largest catalog or an unprecedented text effect.

Useful sources checked for this plan:
- U.S. Chamber of Commerce: https://www.uschamber.com/technology/2026-empowering-small-business-report
- Federal Reserve Bank of San Francisco AI adoption research: https://www.frbsf.org/research-and-insights/publications/community-development-research-briefs/2026/07/ai-adoption-in-small-businesses-2024-sbcs/
- Google Fonts licensing overview: https://developers.google.com/fonts
- Adobe Express text effects: https://helpx.adobe.com/express/web/create-and-customize-text/text-effects.html

## 90-day validation sequence

### Days 1–14: beta and discovery
- Complete local and hosted test checklists.
- Publish the static beta after brand/contact/policy review.
- Talk to 10–20 potential users using the interview prompts in `OUTREACH_TEMPLATES.md`.
- Ask users to do one real task with sample, non-sensitive content.

### Days 15–30: paid service pilots
- Select the segment with the clearest recurring need.
- Show concrete examples tailored to the segment.
- Seek paid commitments only for deliverables you can actually complete.
- Track objections, delivery time, revisions, fees, refunds, and whether customers request more work.

### Days 31–60: improve the workflow
- Fix the top three recurring usability issues.
- Prioritize file import/export requested by customers.
- Measure repeat use and ask which workflow saves meaningful time.
- Do not spend on paid ads until the offer, conversion, and fulfillment economics are understood.

### Days 61–90: choose next investment
- Calculate margin and time per service package.
- Decide whether the stronger path is continuing the service, making a narrower tool, or starting the full subscription backend.
- Estimate per-task AI costs before connecting a model.
- Reinvest only when real users or revenue justify it.

## Risks and guardrails

- **Name/rights risk:** search the USPTO and relevant business registries; name availability is not confirmed.
- **Competition risk:** large creative suites offer free features and broad catalogs.
- **AI costs:** provider calls are billed separately; set spend caps, usage limits, and rate limits before enabling.
- **Privacy:** local browser storage is not cloud storage; avoid sensitive data. Update privacy disclosures before adding third-party AI, accounts, cloud sync, or billing.
- **Trust risk:** never market demo templates as live AI output; never charge for inactive features.
- **Operational risk:** manual service sales require clear scope, written delivery expectations, and a record of orders/refunds.

## Launch guide

See `BUILD_GUIDE.md` for exact Windows setup, contact form, GitHub Desktop, Cloudflare Pages, optional Stripe Payment Links for one-time services, and the gated subscription launch checklist. `GO_LIVE_CHECKLIST.md` gives the short sequence.
