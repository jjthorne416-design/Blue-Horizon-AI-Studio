# Blue Horizon AI Studio — build, test, and publish guide

**Prepared:** October 22, 2026  
**Project type:** Static HTML/CSS/JavaScript public beta  
**Target launch:** A clearly labelled free beta first; paid subscriptions later when the actual AI/account/billing system exists.

> **Important launch boundary:** This starter project is not yet a production AI SaaS. The document editor, folders, header templates, spreadsheet/story/email starter workflows, and image-text canvas run in the user's browser. The AI input panels currently build local demo drafts/templates; no live AI model is connected. Documents are stored locally in the browser, not in cloud accounts. The five software plans are displayed as research/preview pricing, and subscription checkout is intentionally disabled. Do not charge users for those software plans until the features and subscription controls are really implemented.

This guide provides the exact publication steps. Account signup, business verification, domain purchase, legal decisions, and deployment approval must be completed by the project owner; this guide cannot perform those actions inside your personal accounts.

## 1. Use the correct project folder

1. Download `Blue_Horizon_AI_Studio_Launch_Package.zip` from the conversation.
2. In Windows File Explorer, open **Downloads**.
3. Right-click the ZIP and choose **Extract All…**.
4. Select **Documents** as the destination.
5. Click **Extract**.
6. Open `Documents\BlueHorizonAIStudio`.
7. Confirm that `index.html`, `studio.html`, `services.html`, `site.css`, `site.js`, `studio.css`, `studio.js`, `contact.js`, `config.js`, `privacy.html`, `terms.html`, and `assets` are present.
8. Keep your prior HorizonAI folder as a backup. Do not merge the old folder into this new one.

## 2. Check the brand name before commercial use

The project branding has been changed to **Blue Horizon AI Studio**. The code rename does not reserve the brand or prove that another business has no conflicting rights.

1. Open the official USPTO Trademark Search: https://tmsearch.uspto.gov/search/
2. Search `Blue Horizon AI Studio`.
3. Search `Blue Horizon AI` and `Blue Horizon` too. Review similar names used for software, AI services, design tools, documents, and digital products—not just exact matches.
4. Search your state or country's business-name registry and the web for similar businesses.
5. Check domain registrars for names such as `bluehorizonai.studio`, `bluehorizonai.com`, or another available spelling. Availability was not confirmed by this package; a domain usually costs money, so for now use the free `pages.dev` address.
6. If a potentially conflicting mark appears, get appropriate trademark advice before spending money on a domain, logo, or advertising.

Useful official guide: https://www.uspto.gov/trademarks/search

## 3. Configure the contact form before publishing

The homepage, Studio, and custom-services page share `config.js`. The contact form can use a static-site form service or fall back to opening the visitor's email application.

### A. Set your inbox

1. In the `BlueHorizonAIStudio` folder, right-click `config.js` and choose **Open with → Notepad** or open it in VS Code.
2. Find this line:

   `contactEmail: "REPLACE_WITH_YOUR_EMAIL",`

3. Replace only the placeholder text with an email inbox you control. Example format: `contactEmail: "your-real-inbox@example.com",` — use your actual address, not the example.
4. Press **Ctrl+S** to save.

### B. Enable a working web contact form with Web3Forms (recommended)

The email-app fallback is not dependable for every visitor. Web3Forms documents a free tier that currently includes up to 250 submissions per month; review its current terms, limits, privacy policy, and data retention before enabling it.

1. Go to https://web3forms.com/.
2. Choose **Create Access Key** / **Get Started**.
3. Enter the inbox you want to receive contact requests at and complete the email verification steps.
4. Copy the access key provided by Web3Forms.
5. Open `config.js` again.
6. Find `web3formsAccessKey: "REPLACE_WITH_WEB3FORMS_ACCESS_KEY",`.
7. Replace the placeholder with your actual Web3Forms access key. Keep the quotation marks.
8. Save with **Ctrl+S**.
9. Do **not** put Stripe secret keys, passwords, or an AI provider API key in `config.js`. The Web3Forms access key is intentionally public for a static form; it is not equivalent to a secret API key.
10. The site's privacy notice explains that configured contact submissions go through Web3Forms. Confirm that this provider and its retention practices are acceptable to you before publication.

Official setup guide: https://docs.web3forms.com/getting-started/installation

## 4. Run and test the site locally before uploading

The image canvas works best through a local web server rather than a `file:///` address.

### Option A — Python if already installed

1. Open the `BlueHorizonAIStudio` folder in File Explorer.
2. Click the folder address bar, type `cmd`, and press **Enter**.
3. In Command Prompt, type `python -m http.server 8000` and press **Enter**.
4. Leave that window open.
5. Open Chrome or Edge and go to `http://localhost:8000`.
6. Test the sections below. To stop the local server later, click Command Prompt and press **Ctrl+C**.

### Option B — VS Code Live Server if it is already installed

1. Open VS Code.
2. Choose **File → Open Folder…**.
3. Select `BlueHorizonAIStudio`.
4. Right-click `index.html` in the Explorer.
5. Click **Open with Live Server**.
6. Do not purchase an extension; local testing does not require a paid extension.

### Test checklist

- [ ] Homepage logo, title, buttons, and hero artwork show the Blue Horizon AI Studio name.
- [ ] The **Try the Studio — free** button opens `studio.html`.
- [ ] In Document editor, type a paragraph, select text, change font/color, insert a header, save, and export HTML/TXT/JSON.
- [ ] Try Print / Save PDF using the browser print dialog.
- [ ] Create a folder and a second document; move a document to the folder; refresh and confirm local saving.
- [ ] Import a harmless test `.txt`, `.md`, `.html`, or backup `.json` file under 4 MB.
- [ ] In Image Text Studio, enter `Kk 2026`, switch texture/font/size, change to regular solid text, and export transparent PNG.
- [ ] Try the story, spreadsheet, and email starter workflows. Remember: these are local template/demo flows, not live AI generation; spreadsheet formulas and XLSX export are not implemented.
- [ ] Open Custom Services and try each **Request this package** button. It should send you to the homepage contact form with the request prefilled.
- [ ] Submit a test contact request. With a Web3Forms key configured, verify that the message reaches your inbox. Without a key, verify that the email app fallback opens.
- [ ] Read the privacy notice and prototype terms. Replace or review any wording required for your real operation before publication.
- [ ] Test using a narrow browser window and a phone if available.
- [ ] Export and retain backups of any local documents you want to keep. Browser-local data does not automatically migrate from your earlier site folder or sync to other devices.

## 5. Create the GitHub repository

GitHub will store the project source and let Cloudflare deploy updates automatically. Use a private repository while developing. Do not put API keys, personal customer files, passwords, or Stripe secrets in GitHub.

### Option A — GitHub Desktop (easiest for a website folder)

1. Sign in at https://github.com/ or create an account.
2. If needed, install the official GitHub Desktop app from https://desktop.github.com/.
3. Open GitHub Desktop.
4. Choose **File → Add Local Repository…**.
5. Click **Choose…** and select the `BlueHorizonAIStudio` folder in Documents.
6. If GitHub Desktop says this folder is not a Git repository, choose the link/button to **create a repository** in the folder.
7. Repository name: `blue-horizon-ai-studio`.
8. Keep the local path pointed at the `BlueHorizonAIStudio` folder. Do not choose the parent Documents folder.
9. Choose the `main` branch if asked.
10. Click **Create Repository**.
11. In **Summary**, enter `Publish Blue Horizon AI Studio public beta`.
12. Click **Commit to main**.
13. Click **Publish repository**.
14. Keep **Keep this code private** checked during setup.
15. Click **Publish Repository** and verify that files such as `index.html`, `studio.html`, `services.html`, `site.css`, `studio.css`, and `assets` appear in the GitHub repository.

After each future code change: save in your editor → open GitHub Desktop → enter a short summary → **Commit to main** → **Push origin**.

## 6. Publish the static public beta with Cloudflare Pages

This deployment publishes the static site only; it does not turn on live AI, cloud accounts, or subscription billing. Cloudflare's Git integration builds and deploys after commits are pushed. Review the current account terms/limits before using any free tier for a business.

Official Git integration guide: https://developers.cloudflare.com/pages/get-started/git-integration/

1. Open https://dash.cloudflare.com/ and create/sign in to your Cloudflare account.
2. Open **Workers & Pages**.
3. Choose **Create application**.
4. Choose **Pages** (or the equivalent static-site/Git option shown in your current dashboard).
5. Choose **Connect to Git**.
6. Authorize Cloudflare to access the GitHub repository `blue-horizon-ai-studio`. Grant only the repository access needed if GitHub offers that choice.
7. Select repository `blue-horizon-ai-studio`.
8. Production branch: `main`.
9. Project name: `blue-horizon-ai-studio` if available. If unavailable, choose a similar unique name; the generated public address will use that name.
10. Framework preset: **None**.
11. Build command: leave blank.
12. Build output directory: `.` (a single period), because `index.html` and all assets live at the repository root.
13. Root directory: leave at the repository root/default.
14. Do not add environment variables yet; this static prototype does not need private API secrets.
15. Click **Save and Deploy**.
16. Wait for the deployment page to show success.
17. Open the assigned `https://<your-project-name>.pages.dev` URL.
18. Test the entire site again on the deployed URL. Be sure to check `/studio.html`, `/services.html`, `/privacy.html`, and `/terms.html` directly as well as the homepage.

Use Git integration for the project. Cloudflare notes that Git-integrated Pages projects cannot be converted to Direct Upload later; decide this way up front rather than mixing deployment methods.

## 7. Connect a custom domain later (optional, costs money)

You do not need a custom domain to test the beta. Use the supplied `pages.dev` URL while your budget is $0.

When ready, buy a domain from a reputable registrar, then in Cloudflare Pages open your project → **Custom domains** → **Set up a custom domain** and follow its DNS instructions. Do not type guessed DNS records; copy the exact records Cloudflare provides. Wait until the domain is active and SSL/TLS is working before advertising the custom address.

## 8. What is needed to start earning before subscriptions exist?

The current app does not charge for subscriptions. The public site has a **Custom Services** page with three starter offers, which are manual digital services—not automatically delivered SaaS features:

- Image Text Asset Pack — starting at $19 one time; scope shown on the page.
- Branded Document Starter Pack — starting at $29 one time; scope shown on the page.
- Small Business Content Pack — starting at $49 one time; scope shown on the page.

These are starter prices to validate. Only advertise or accept orders for deliverables you can actually complete. Before taking any payment, agree in writing on the exact assets/content, output formats, revision count, delivery date, cancellation/refund handling, and what is not included.

### Optional no-code one-time payments with Stripe

You can contact a prospective client first, agree on scope, then send that client a Stripe Payment Link or invoice. To make the three service cards open payment links after you have tested them:

1. Sign up at https://stripe.com/ and complete identity/business verification and payout-bank details requested by Stripe.
2. Stay in **test mode** while setting up. Do not send test-mode links to real customers.
3. In the Stripe Dashboard, open **Product catalogue** (wording may vary) and add each fixed-scope service as a product. Set its price in USD and choose **One time**, not recurring:
   - `Image Text Asset Pack` — `$19.00` (up to five short transparent PNG graphics, agreed style, one small correction round).
   - `Branded Document Starter Pack` — `$29.00` (three editable HTML templates, agreed brand colors/headers, one small revision round).
   - `Small Business Content Pack` — `$49.00` (ten short social-post drafts plus five customer reply/review templates for one business, one wording revision round).
4. Include the delivery timing, accepted file formats, revision scope, refund/cancellation terms, and support contact in the product description/checkout details or the written scope you share with the customer. Do not promise a turnaround you cannot meet.
5. Use Stripe's **Payment Links** feature to create a link for each one-time product. Verify the final price, payment mode, customer receipt settings, and any required tax settings. Do not collect more personal information than you need.
6. Test the customer journey in Stripe test mode using Stripe's published test payment method. Confirm you understand the checkout and receipt emails.
7. When your account is verified and the offer is ready to sell, create the **live-mode** payment links; test and live links are separate.
8. Copy each live link. Open `config.js` and paste the URLs in the correct fields, keeping the quotation marks:

   ```js
   servicePaymentLinks: {
     imageTextPack: "https://buy.stripe.com/PASTE_YOUR_LIVE_LINK_HERE",
     documentStarterPack: "https://buy.stripe.com/PASTE_YOUR_LIVE_LINK_HERE",
     businessContentPack: "https://buy.stripe.com/PASTE_YOUR_LIVE_LINK_HERE"
   }
   ```

   Replace each sample URL with its own actual Stripe Payment Link. Never use a secret API key as a payment link.
9. Save `config.js` → commit and push in GitHub Desktop → wait for Cloudflare Pages to deploy → click each service card and ensure it opens the correct Stripe checkout.
10. Make a small real test purchase only when you can handle the associated fee/refund bookkeeping, or use Stripe test mode until the live launch is ready. Track each paid order and deliver it exactly as agreed.

Stripe's standard U.S. online domestic-card pricing currently lists 2.9% + $0.30 per successful card charge, with additional fees possible for some payment methods, international cards, currency conversion, disputes, and optional services. Check the live pricing page before launching: https://stripe.com/pricing. Stripe Billing for recurring software subscriptions has separate billing fees; do not assume card processing is the only subscription cost.

**Important:** A payment link only collects money. It does not automatically deliver the requested files, give the customer account access, or enable paid features. The owner must fulfill each manual-service order and handle customer support/refunds.

## 9. Why the five monthly software plans cannot be charged yet

Keep the displayed research prices unchanged for now:

| Plan | Preview price/month | Proposed monthly AI credits |
|---|---:|---:|
| Free | $0 | Basic browser tools; no active AI allowance |
| Starter | $4.99 | 150 (not active) |
| Creator | $11.99 | 600 (not active) |
| Business | $24.99 | 1,500 (not active) |
| Studio | $49.99 | 4,000 (not active) |

These are preview plans, not active subscriptions. Do **not** activate recurring checkout until these requirements are in place:

- A server-side AI endpoint with provider keys kept in encrypted secrets, never in browser files.
- User authentication and authorization.
- Database-backed user profiles, subscription status, and credit ledger.
- Server-side feature entitlements and usage/rate limits so users cannot change plan status in browser tools.
- Stripe subscription products, Checkout/payment flow, verified webhook handling, failed-payment handling, plan changes, cancellations, refunds, and customer self-service portal.
- Usage metering/reset rules, support process, and spend monitoring to prevent a user or attacker from generating an unexpectedly large API bill.
- Updated Privacy Policy, Terms of Service, subscription/renewal/cancellation/refund wording, and any required consumer/tax disclosures.
- Tests proving that unpaid users cannot access paid features and canceled/failed subscriptions lose access according to published terms.

A front-end plan card or a successful payment alone is not enough to run a responsible subscription SaaS. AI API service usage is billed separately from ChatGPT; see the current provider pricing before deciding which AI workflows to enable: https://developers.openai.com/api/docs/pricing.

## 10. Business and legal setup before paid sales

This is a launch checklist, not legal, tax, or accounting advice.

- Verify the brand and domain as explained in Section 2.
- Decide on the appropriate business structure and check your state/local business registration, licensing, and sales-tax requirements.
- Determine how you will track revenue, refunds, processing fees, software expenses, and taxes. The IRS starting-business guide is a good starting point: https://www.irs.gov/businesses/small-businesses-self-employed/starting-a-business.
- If you need an EIN, apply directly through the official IRS site; the IRS does not charge for an EIN: https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number.
- Put a real support inbox in `config.js` and test the form end to end.
- Review Privacy Notice and Terms for the actual business operator, data processors, retention, user rights, refund policy, and local law before selling. Current files are prototypes/drafts, not attorney-reviewed commercial terms.
- Do not ask users to submit passwords, payment-card details, confidential documents, or regulated/sensitive data through contact forms or this local-only app.

## 11. Final production-beta checklist

Only announce the free beta after all applicable boxes are checked:

- [ ] Project branding is consistent: Blue Horizon AI Studio.
- [ ] Brand/name/domain review is complete enough for the intended risk.
- [ ] `contactEmail` is set to a monitored inbox in `config.js`.
- [ ] Web3Forms key is configured and tested, or you clearly accept the mailto fallback limitation.
- [ ] Site and Studio pass local tests.
- [ ] GitHub repository contains the current files, not just the ZIP.
- [ ] Cloudflare Pages build is green and the public URL loads over HTTPS.
- [ ] Homepage, Studio, services, privacy, terms, assets, and 404 behavior have been tested on the published URL.
- [ ] Homepage clearly says AI generation, cloud sync, accounts, and paid software subscriptions are not active.
- [ ] The five software plans are preview-only and no active subscription checkout appears.
- [ ] Service offers are deliverable as written; live payment links are only added after product/scope/refund terms and Stripe verification are complete.
- [ ] A backup copy of the source project is stored locally.

The next product milestone after the public beta is a secure server-side AI endpoint plus accounts/database, then payment and credit entitlements. Do not paste any API key into the browser source or this ZIP.
