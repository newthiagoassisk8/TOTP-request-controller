# Web Scraping com Playwright

Projeto simples para iniciar com web scraping usando Playwright.

## Requisitos

- Node.js 18+

## Instalação

```bash
npm install
npx playwright install chromium
```

## Uso

Rodar com URL padrão (`https://news.ycombinator.com/`):

```bash
npm run scrape
```

Rodar com URL customizada:

```bash
npm run scrape -- https://example.com
```

## Saída

O script retorna JSON com os primeiros links encontrados na página (texto e URL).
