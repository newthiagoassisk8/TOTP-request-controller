# Custom TOTP Client Lab

This project is a lab environment to validate and test the behavior of a custom TOTP client using Playwright.
It opens the TOTP web app and can intercept the API route to simulate different response scenarios.

## Videos

- Portuguese video explaining the project idea: https://www.youtube.com/shorts/EsEgtpxXzIQ
- English video explaining the idea and what this repository is for: https://www.youtube.com/shorts/greFPDed_eA

## Requirements

- Node.js 18+

## Installation

```bash
npm install
npx playwright install chromium
```

## Usage

Run the default flow (no mock, using the real API):

```bash
npm run scrape
```

You can also pass an argument to simulate scenarios:

```bash
npm run scrape -- <scenario>
```

Available scenarios:

- `normal`: does not intercept the API (real behavior).
- `empty`: returns an empty array (`[]`).
- `manyItems`: returns a large TOTP list (2000 items).
- `delayed`: returns a payload with a 4-second delay.
- any other value: returns a mock payload with 40 items.

Examples:

```bash
npm run scrape -- empty
npm run scrape -- manyItems
npm run scrape -- delayed
npm run scrape -- testeLivre
```

## Notes

- The script opens the browser in visible mode (`headless: false`).
- Playwright pauses execution with `page.pause()` for manual scenario inspection.
