# Laboratório de Cliente TOTP Personalizado

Este projeto é um laboratório para validar e testar o comportamento do cliente de TOTP personalizado usando Playwright.
Ele abre a aplicação web de TOTP e pode interceptar a rota da API para simular diferentes cenários de resposta.

## Requisitos

- Node.js 18+

## Instalação

```bash
npm install
npx playwright install chromium
```

## Uso

Executa o fluxo padrão (sem mock, consumindo a API real):

```bash
npm run scrape
```

Também é possível passar um argumento para simular cenários:

```bash
npm run scrape -- <cenario>
```

Cenários disponíveis:

- `normal`: não intercepta a API (comportamento real).
- `empty`: retorna array vazio (`[]`).
- `manyItems`: retorna uma lista grande de TOTP (2000 itens).
- `delayed`: retorna payload com atraso de 4 segundos.
- qualquer outro valor: retorna payload mock com 40 itens.

Exemplos:

```bash
npm run scrape -- empty
npm run scrape -- manyItems
npm run scrape -- delayed
npm run scrape -- testeLivre
```

## Observações

- O script abre o navegador em modo visível (`headless: false`).
- O Playwright pausa a execução com `page.pause()` para inspeção manual do cenário.
