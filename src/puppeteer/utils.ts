import { Page } from "puppeteer";

export async function removeEl(page: Page, selector: string) {
    await page.$$eval(selector, function(elems: Element[]) {
        elems.forEach((el) => el.remove());
    });
}