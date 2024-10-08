This is a sample [`Next.js`](https://nextjs.org) web app that utilises [`Open Weather API`](https://openweathermap.org), [`Framer Motion`](https://www.framer.com/motion/) and [`TailwindCSS`](https://tailwindcss.com/).

This repository uses the [`Gitmoji`](https://gitmoji.dev) emoji guide for commit messages.

[`Demo`](https://weather-llama.vercel.app)

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

## Required Environment Variables

```
OPEN_WEATHER_KEY=<API_KEY> # sign up for a key here https://openweathermap.org/
```

## Target Features

1. UI

   - ~~Toggle between imperial and metric units via tapping of temperature~~
   - ~~Animations~~
   - ~~Null state skeleton loader~~

1. ~~Geocoding API~~

   - ~~Client-side cache~~

1. Current weather summary by location

   - ~~Grab user current location~~
   - Client-side cache of API response

1. 5-day forecast by 3 hours by location

   - ~~Timezone awareness for classification of forecasts~~
   - Client-side cache of API response

1. Client-side search and history

   - ~~Allow for history deletion~~
   - ~~Error message if no results returned~~
