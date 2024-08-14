This is a sample [`Next.js`](https://nextjs.org) web app that utilises [`Open Weather API`](https://openweathermap.org), [`Framer Motion`](https://www.framer.com/motion/) and [`TailwindCSS`](https://tailwindcss.com/).

This repository uses the [`Gitmoji`](https://gitmoji.dev) emoji guide for commit messages.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Target Features
  1. Geocoding API
    - Client-side cache
  1. Current weather summary by location
    - Grab user current location
    - Client-side cache of API response
  1. 5-day forecast by 3 hours by location
    - Client-side cache of API response
  1. Client-side search and history
    - Allow for history deletion
    - Prioritise prior searches to reduce hits on API
