# RED LEGACY — MUFC Premium Fan Experience

An unofficial, premium-style Manchester United fan website starter built with React + Vite.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Build for GitHub / deployment

```bash
npm run build
```

The production site is generated in `dist/`.

## Put real videos on the site

Place your **licensed** MP4 files in:

`public/videos/`

Use:

- `penalty-01.mp4`
- `penalty-02.mp4`
- ...
- `penalty-10.mp4`

The Top 10 page uses the native HTML5 video player, so there is no YouTube redirect.

## Add manager pictures

Place your licensed/public-domain portraits in `public/managers/` using the filenames in `public/managers/README.txt`.

## Make VIP billing real

The included membership is a front-end demo using localStorage. For production:

1. Create a backend/serverless API.
2. Create a Stripe subscription product and price.
3. Send users to Stripe Checkout from a secure server endpoint.
4. Use Stripe webhooks to mark subscriptions active/cancelled.
5. Protect VIP APIs/content server-side.
6. Never put Stripe secret keys or football-data provider keys in browser code.

## Make live matches real

The Live page is intentionally a rights-safe interface. Connect a stream only when you have the required broadcasting rights. For live men's competitive matches, do not proxy or embed an unauthorized stream.

## Make updates automatic

Connect a football/news provider through a server-side API route. Store:

- timestamp
- headline
- source
- transfer type
- player
- status
- source URL

Then render the data in the Team Updates page.

## Important branding note

This is an **unofficial fan project**. Do not present it as the official Manchester United website, and only use Manchester United trademarks, logos, photographs, match footage and other protected material when you have permission/licensing.
