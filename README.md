# Quotes Send

A small React app that displays the quote scheduled for the current date in Neon.

## Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `DATABASE_URL` to your Neon connection string.
3. Start the app with `npm run dev` and open the Vite URL shown in the terminal.

The connection string is read only by the Express server and must not use a `VITE_` prefix. The server queries `quotes_list` for a row whose `send_date` equals PostgreSQL's `CURRENT_DATE`. If more than one row matches, the app displays one of them.

Run `npm run build` to create a production build. `npm start` serves that build and the API from the same server.

## Deploying to Vercel

Vercel serves the Vite build as a static site and deploys `api/today-quote.js` as the `/api/today-quote` function. Add `DATABASE_URL` to the Vercel project's Environment Variables for each environment you use, then redeploy. The variable must be the Neon connection string and must not use a `VITE_` prefix.