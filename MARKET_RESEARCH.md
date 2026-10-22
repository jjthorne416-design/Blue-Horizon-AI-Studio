# Blue Horizon AI Studio — initial market research

**Research checked:** October 22, 2026  
**Purpose:** Use current public evidence to choose an initial product direction. This is directional desk research, not a statistically representative survey of prospective Blue Horizon AI customers and not proof of product-market fit.

## 1. The market is active, but broad creative tools are formidable competitors

### Canva
Canva's official pricing and plan-comparison page describes a free tier with broad design functionality, a very large template and asset catalog, and some AI usage. The company is an established all-purpose design product with substantial distribution and brand recognition.

Official source: https://www.canva.com/pricing/

**Implication for Horizon:** We should not claim to compete on having the largest template or stock-image library. Instead, start with a lightweight document-and-typography workflow: local file/folder organization, editable header starters, and text whose glyph shapes are filled with selected images. We must test whether this bundle is meaningful enough for a specific group of customers.

### Adobe Express
Adobe's official pricing page lists a no-cost tier with standard photo, video, and document editing, thousands of fonts, and stock assets. It lists Adobe Express Premium at US$9.99/month on the page reviewed for this research, with premium templates, a much larger font collection, additional assets, and AI credits. Product features and prices can change.

Official source: https://www.adobe.com/express/pricing

Adobe also documents a text-effects workflow that uses generative AI to apply a prompted texture to text, then lets a user choose results and download them.

Official source: https://helpx.adobe.com/express/web/create-and-customize-text/text-effects.html

**Implication for Horizon:** Image-filled typography already exists in the broader market. Our version needs to be easy, approachable, and complementary to documents—not marketed as a never-before-seen invention. The prototype supports a precise workflow: type a string, choose a texture (or upload an image), use a chosen font as a glyph mask, and export transparent PNG. It also supports inserting the graphic into an editable document.

## 2. AI adoption is real, but buyers need practical utility

The U.S. Chamber of Commerce Foundation published a July 14, 2026 report based on an Ipsos online survey of 750 small-business owners and operators. The article describes AI users as reporting efficiency and quality benefits and says employers use it to take on more ambitious work.

Source: https://www.uschamberfoundation.org/workforce/what-small-business-owners-say-ai-is-actually-doing-at-work

The Federal Reserve Bank of San Francisco's research brief on AI adoption among small businesses describes use cases including productivity, marketing, written communications, customer service, graphics, and analytics; it also discusses barriers such as costs, training capacity, skill gaps, security, and uncertainty.

Source: https://www.frbsf.org/research-and-insights/publications/system-research-san-francisco/2026/09/ai-adoption-among-small-businesses-qualitative-insights-small-business-credit-survey/

The OECD's 2026 SME survey likewise discusses adoption of off-the-shelf AI, interest in productivity and growth, and challenges around staff time, maintenance costs, skills, and cybersecurity.

Source: https://www.oecd.org/en/publications/empowering-smes-in-the-age-of-ai_b5e2a6c6-en.html

**Implication for Horizon:** The product should reduce steps and avoid requiring a user to become an AI expert. We are beginning with useful local-first document and typography tools; AI must be added only where it creates value worth its per-use cost.

## 3. Fonts and licensing

Google Fonts says its collection is available for use in websites and other projects, and that its fonts are released under open-source licenses for commercial and non-commercial work. Individual font files and redistribution still need to be handled according to their licenses; the current app requests selected web fonts from Google Fonts rather than bundling font files.

Source: https://developers.google.com/fonts

Additional reference on licensing: https://github.com/google/fonts/blob/main/cc-by-sa/knowledge/glossary/terms/licensing/content.md

**Implication for Horizon:** Use properly licensed open fonts or system fonts. Do not copy proprietary fonts, templates, art, or assets from competitors. Uploaded images remain the user's responsibility; the app should remind users to have rights to assets they use.

## 4. Hosting constraints for a zero-budget prototype

GitHub's official Pages documentation says GitHub Pages is not intended or allowed as a free hosting service for a website primarily directed at facilitating commercial transactions or commercial SaaS.

Source: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

Vercel's official plan documentation describes the Hobby plan as limited to personal, non-commercial use.

Source: https://vercel.com/docs/plans/hobby

Cloudflare Pages documents a free tier with a stated build allowance and static-site asset limits, although a future backend, AI, database, email, or payment system may introduce distinct costs and limits.

Source: https://developers.cloudflare.com/pages/platform/limits/

**Implication for Horizon:** Use GitHub as the source-code repository. For a public commercial static site with a $0 budget, evaluate Cloudflare Pages and verify current terms before deployment. Do not use free GitHub Pages or Vercel Hobby as the commercial production host contrary to their stated terms.

## 5. Product opportunity and differentiation

The product hypothesis is **Blue Horizon AI Studio: documents + folders + editable headers + image-filled typography + (later) secure AI assistance**.

The possible advantages worth testing are:

- A single compact workflow that connects written documents and stylized typography.
- The ability to put generated text art directly into a working document.
- A useful free local editor that can be tested with no account or API billing.
- Accessible header patterns for people who do not want to begin with a blank page.
- A future optional AI assistant that can help prepare or improve content, with user approval and clear usage controls.

The risks are equally important:

- Canva and Adobe Express are capable incumbents with free tiers and very large feature and asset catalogs.
- Document editing, template design, and image-text effects are not unique features by themselves.
- A browser-local prototype is not yet a cloud file manager, collaboration system, or real AI product.
- Five pricing tiers can create confusion before we understand the customers' most valuable feature.
- AI credit allowances cannot be set responsibly until we measure model costs per operation and add a protected backend.

## 6. Recommended customer validation

Begin by interviewing 15–20 potential customers across three candidate groups: (1) solo creators who prepare posters, titles, and text graphics; (2) small service businesses that reuse quotes, notices, and customer documents; and (3) freelancers who create branded documents for clients.

Ask about actual recent work rather than asking only whether they like the idea:

1. What did you create most recently?
2. Which applications did you use and what was frustrating?
3. How did you create or reuse your headers, fonts, and graphic text?
4. Did you need to export it to another document or send it to someone?
5. How often does that task recur?
6. What does the current workflow cost in time or money?
7. Would the workflow in this prototype solve a real problem? What is missing?
8. Would you pay to avoid this specific pain? What price feels fair, and why?

The most important evidence is repeated use, specific feature requests, willingness to test again, and paid commitments—not general compliments or social likes.

## 7. Sources and limitations

Primary vendor and public-institution sources were preferred where available. The market scan did not crawl private networks, access private accounts, or copy protected competitor code or visual assets. This report summarizes publicly available material and should be refreshed before launch because products, prices, plan limits, and legal requirements change.
