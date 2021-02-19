import { DirectNavigationOptions } from "puppeteer";

export const CREDENTILS = {
    user: 'andrey.buter@gmail.com',
    password: 'Q72364q72364'
}

export const DOMAIN = 'https://coursehunter.net';

export const GO_TO_PAGE_SETTINGS: DirectNavigationOptions = {
    // networkIdleTimeout: 5000,
    waitUntil: 'domcontentloaded',
    timeout: 3000000
}