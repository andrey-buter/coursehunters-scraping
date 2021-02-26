import { launch, Page, Browser } from "puppeteer";
import { login } from "./puppeteer/login";
import { getCategories } from "./puppeteer/categories";
import { getAllCourses } from "./puppeteer/all-courses";
import { getCourseLinks } from "./puppeteer/course-links";
import { saveFile } from "./node/save-file";
import { IParentCategory } from "./puppeteer/model";

function logObj(data) {
    console.log(JSON.stringify(data, null, "  "));
}

export async function start() {
    const browser: Browser = await launch({
        headless: false,
        devtools: true,
        defaultViewport: {
            width: 1200,
            height: 800
        },
        // https://stackoverflow.com/questions/64117723/puppeteer-failed-to-launch-the-browser-process-spawn
        executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    })
    const page: Page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 })
    await login(page);
    const categories: IParentCategory[] = await getCategories(page);
    logObj(categories);

    // const categories: IParentCategory[] = [
    //     {
    //         title: 'Marketing',
    //         url: 'https://coursehunter.net/marketing',
    //         cache: [],
    //         subCategories: [
    //             {
    //                 title: 'Seo',
    //                 url: 'https://coursehunter.net/marketing/seo',
    //                 courses: []
    //             },
    //             {
    //                 title: 'Uncategoriezed',
    //                 url: 'https://coursehunter.net/marketing',
    //                 courses: []
    //             }
    //         ]
    //     }
    // ]
    for (const cat of categories) {
        for (const subCat of cat.subCategories) {
            subCat.courses = await getAllCourses(page, subCat, cat.cache);
            logObj(subCat.courses);

            // for (const course of subCat.courses) {
            //     course.materials = await getCourseLinks(browser, course);
            // }

            for (const _courses of courseIterator(subCat.courses, 10)) {
                console.table(_courses);

                const materialsArr = await Promise.all(_courses.map((course) => getCourseLinks(browser, course)));
                _courses.forEach((course, index) => {
                    course.materials = materialsArr[index];
                });
            }

            saveFile(cat, subCat);
        }
    }

    console.log(['Done']);
}

function courseIterator(courses, step: number = 3) {
    let iterable = {
        step,
        array: courses,
        *[Symbol.iterator]() {
            for (let index = 0; index < this.array.length; index = index + this.step) {
                console.log(index);

                yield this.array.slice(index, this.step + index);
            }
        }
    }
    return iterable;
}

start();
