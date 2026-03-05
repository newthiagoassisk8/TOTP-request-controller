function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function buildTotpMockItems(total = 20) {
    const now = Date.now();
    const expires = now + 30000;
    const expiresDate = new Date(expires).toISOString();

    return Array.from({ length: total }, (_, index) => ({
        uid: `item${index + 1}`,
        label: `Demo ${index + 1} - 6 digitos`,
        otp: String(100000 + (((index + 1) * 13791) % 900000)).padStart(6, '0'),
        expires,
        now,
        expiresDate,
        digits: 6,
    }));
}

export function createGetJsonHandler(payloadFactory, { delayMs = 0, status = 200 } = {}) {
    return async (route) => {
        const request = route.request();

        if (request.method() !== 'GET') {
            await route.continue();
            return;
        }

        if (delayMs > 0) {
            await wait(delayMs);
        }

        await route.fulfill({
            status,
            contentType: 'application/json',
            body: JSON.stringify(payloadFactory()),
        });
    };
}

export function emptyPayloadRouteHandler(options = {}) {
    return createGetJsonHandler(() => [], options);
}

export function manyItemsRouteHandler(total = 500, options = {}) {
    return createGetJsonHandler(() => buildTotpMockItems(total), options);
}

export function delayedRouteHandler(payload = buildTotpMockItems(40), delayMs = 3000, options = {}) {
    return createGetJsonHandler(() => payload, { ...options, delayMs });
}
