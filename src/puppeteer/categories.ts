import { Page } from "puppeteer";
import { IParentCategory, ISubCategory } from "./model";

export async function getCategories(page: Page): Promise<IParentCategory[]> {
    return await page.$$eval('.main-header-side:not(.main-header-side-right) .drop-menu > li > .drop-a', (parents: Element[]) => {
        let cats: IParentCategory[] = [];

        parents.forEach((parent) => {
            const parentCat = getCategoriesTree(parent);

            cats.push(parentCat);
        });

        cats = safeFirstSubCatToTest(cats);

        return cats;

        function getCategoriesTree(parent) {
            let parentCat: IParentCategory = {
                title: parent.textContent.trim(),
                url: parent.getAttribute('href'),
                subCategories: [],
                cache: []
            }
            parent.parentElement.querySelectorAll('.drop-menu-child a').forEach((el) => {
                parentCat.subCategories.push({
                    title: el.textContent.trim(),
                    url: el.getAttribute('href'),
                    courses: []
                } as ISubCategory);
            });

            parentCat.subCategories.push({
                title: 'Uncategorised',
                url: parentCat.url,
                courses: []
            } as ISubCategory);

            return parentCat;
        }

        function safeFirstSubCatToTest(cats: IParentCategory[]) {
            const cat = cats[0];

            const subCat = cat.subCategories[0];

            return [
                {
                    ...cat,
                    subCategories: [subCat],
                }
            ]
        }
    });

}
