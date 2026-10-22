# Go-live checklist — Blue Horizon AI Studio

Follow this checklist in order. The site can launch as a **free public beta** after the static-site, contact, privacy, and content checks pass. It is **not ready to charge for the five software subscriptions** until live AI, accounts, usage credits, and billing enforcement are built.

## A. Before deploy

- [ ] Check `Blue Horizon AI Studio`, `Blue Horizon AI`, and `Blue Horizon` in the USPTO search and relevant business registry.
- [ ] Check domain availability with a registrar (not verified by this project).
- [ ] Open `config.js`; replace `contactEmail` with a real inbox.
- [ ] Get an optional Web3Forms access key and replace the access-key placeholder.
- [ ] Read `privacy.html` and `terms.html`; adapt to the actual operator and get appropriate review before commercial sales.
- [ ] Run local tests using the checklist in `BUILD_GUIDE.md`.
- [ ] Ensure there are no API keys, passwords, bank details, or customer files in the repository.

## B. Publish the beta

- [ ] Use GitHub Desktop to create/publish a private repo named `blue-horizon-ai-studio` from the `BlueHorizonAIStudio` folder.
- [ ] Connect the repo to Cloudflare Pages with Git integration.
- [ ] Production branch `main`; framework preset `None`; build command blank; build output directory `.`; root directory repository root.
- [ ] Open the generated `pages.dev` URL over HTTPS.
- [ ] Test the homepage, Studio, custom services, privacy, terms, images, exports, and contact form on the live domain.
- [ ] Keep the plan note that AI and subscriptions are not active. No subscription checkout exists.

## C. If you want to accept first revenue

1. Start with the clearly scoped one-time custom services on `services.html`, not the incomplete AI subscriptions.
2. Agree on actual deliverables, file formats, revision limits, delivery window, support, and refund/cancellation handling before payment.
3. Set up and verify a Stripe account, then create a one-time Payment Link for each service in test mode, test it, and make live links when ready.
4. Put only the public checkout URLs into `config.js` fields `servicePaymentLinks.imageTextPack`, `servicePaymentLinks.documentStarterPack`, and `servicePaymentLinks.businessContentPack`.
5. Commit/push `config.js`; after Cloudflare deploys, test every checkout link.
6. Record each order, deliver it manually as agreed, and track fees, refunds, expenses, and income. Stripe links collect payment; they do not deliver files automatically.

## D. Before enabling monthly plans

- [ ] Live AI provider integration exists on the server; API key stored as an encrypted secret.
- [ ] Authentication and a database exist.
- [ ] Subscription lifecycle is verified by Stripe webhooks.
- [ ] Credits are metered server-side, reset rules are implemented, and paid features are enforced server-side.
- [ ] Cancel/change-plan and failed-payment paths have been tested.
- [ ] Customer portal, receipts, refunds, support, usage caps, and cost monitoring are ready.
- [ ] Privacy/terms/subscription disclosures are updated for the actual service.
- [ ] Starter/Creator/Business/Studio plan feature claims and credit allowances match what is implemented.

## Reference pages

- Trademark Search: https://tmsearch.uspto.gov/search/
- Cloudflare Pages Git integration: https://developers.cloudflare.com/pages/get-started/git-integration/
- Web3Forms installation: https://docs.web3forms.com/getting-started/installation
- Stripe pricing: https://stripe.com/pricing
- IRS starting a business: https://www.irs.gov/businesses/small-businesses-self-employed/starting-a-business
