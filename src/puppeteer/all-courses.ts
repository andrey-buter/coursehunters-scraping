import { ICourse, ISubCategory } from "./model";
import { Page } from "puppeteer";
import { removeEl } from "./utils";
import { GO_TO_PAGE_SETTINGS } from "../settings";

export async function getAllCourses(page: Page, cat: ISubCategory, cache: string[]): Promise<ICourse[]> {
    let courses = [];
    let currentPage = 1;
    debugger

    while (true) {
        const url = `${cat.url}?page=${currentPage}`;
        await page.goto(`${cat.url}?page=${currentPage}`, GO_TO_PAGE_SETTINGS);
        await page.waitForSelector('.hero-title');

        console.log([url]);

        let pageCourses = await getPageCourses(page, cat);

        if (!pageCourses.length) {
            break;
        }

        // remove title to go to new page and wait for new page title
        await removeEl(page, '.hero-title');

        pageCourses = filterByCache(cache, pageCourses);

        courses = courses.concat(pageCourses);
        currentPage++;
    }

    return courses;
}

function filterByCache(cache: string[], pageCourses: ICourse[]) {
    return pageCourses.filter((course) => {
        if (cache.includes(course.url)) {
            return false;
        }
        cache.push(course.url);
        return true;
    });
}

async function getPageCourses(page: Page, cat: ISubCategory): Promise<ICourse[]> {
    return await page.evaluate(function(args) {
        const [catUrl] = args;
        let courses = [];

        document.querySelectorAll('.course').forEach((el) => {
            const title = el.querySelector('.course-primary-name').textContent.trim(); 
            const originTitle = el.querySelector('.course-secondary-name').textContent.trim();
            const url = el.querySelector('.course-btn').getAttribute('href');
            courses.push({
                title,
                originTitle ,
                url ,
                materials: [],
                subCategory: ''
            });

            function getSubCategory(url) {
                let path = url.replace(catUrl, '');
            }
        });
        return courses;

    }, [cat.url]);
}