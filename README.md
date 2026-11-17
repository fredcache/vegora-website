# Vegora

International product catalogue and WhatsApp enquiry storefront.

## Cloudflare Pages deployment

This is a static HTML website. It does not require a framework, package installation, or build step.

1. Open https://dash.cloudflare.com/ and sign in.
2. Go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Connect GitHub and choose **fredcache/vegora-website**.
4. Set the production branch to **main**.
5. Leave **Build command** empty.
6. Set **Build output directory** to `/` (repository root).
7. Leave the root directory at `/` and select **Save and Deploy**.

Cloudflare Pages will automatically redeploy when changes are pushed to the `main` branch.

## Notes

- The storefront is an enquiry-led catalogue. Confirm supplier availability, product specifications, shipping, duties and final price before accepting an order.
- Product images are illustrative catalogue imagery and should be replaced with accurate, product-specific images before paid advertising.
- Do not commit supplier contact lists, private pricing, credentials, customer data or confidential documents to this public repository.
- The cart and WhatsApp enquiry flow do not process card payments or automatically fulfil orders.
