import { ICourse } from "./model";
import { Page, Browser } from "puppeteer";
import { removeEl } from "./utils";
import { GO_TO_PAGE_SETTINGS } from "../settings";

export async function getCourseLinks(browser: Browser, course: ICourse): Promise<string[]> {
    const page: Page = await browser.newPage();
    await page.goto(course.url, GO_TO_PAGE_SETTINGS);
    console.log([course.url]); 
    
    // await page.waitForSelector('.course-box');
    // await removeEl(page, '.course-box');
    const links = await page.$$eval('.section-block-btn', function(elems: Element[]) {
        let links = [];

        elems.forEach((el) => {
            links.push(el.getAttribute('href'));
        });

        if (!links.length) {
            document.querySelectorAll('#lessons-list li.lessons-item link[itemprop="url"]').forEach((el) => {
                links.push(el.getAttribute('href'));
            });
        }
        return links;
    });


    await page.close();

    return links;
}