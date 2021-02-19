import { CREDENTILS, DOMAIN, GO_TO_PAGE_SETTINGS } from "../settings";

export async function login(page) {
    await page.goto(`${DOMAIN}/sign-in`, GO_TO_PAGE_SETTINGS);
    await page.waitForSelector('.auth-box');
    await page.type('input[type="email"]', CREDENTILS.user);
    await page.type('input[type="password"]', CREDENTILS.password);
    await page.click('.auth [type="submit"]');
    await page.waitForSelector('h1.hero-title');
}