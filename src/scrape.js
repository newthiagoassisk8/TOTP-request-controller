import { chromium } from 'playwright';
import {
    buildTotpMockItems,
    createGetJsonHandler,
    delayedRouteHandler,
    emptyPayloadRouteHandler,
    manyItemsRouteHandler,
} from './routePayloadUtils.js';

async function run(scenario) {
    const url = 'https://totp-generator-e27b.vercel.app/';
    let routeHandler;

    switch (scenario) {
        case 'normal':
            routeHandler = null;
            break;
        case 'empty':
            routeHandler = emptyPayloadRouteHandler();
            break;
        case 'manyItems':
            routeHandler = manyItemsRouteHandler(2000);
            break;
        case 'delayed':
            routeHandler = delayedRouteHandler(buildTotpMockItems(40), 4000);
            break;
        default:
            routeHandler = createGetJsonHandler(() => buildTotpMockItems(40));
            break;
    }

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    const apiUrl = 'https://totp-service-80qpl83qz-newthiagoassisk8s-projects.vercel.app/api/totp';

    try {
        if (routeHandler) {
            await page.route(apiUrl, routeHandler);
        }

        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.pause();
    } catch (error) {
        console.error('Erro ao fazer scraping:', error.message);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

run(process.argv[2] ?? 'normal');
