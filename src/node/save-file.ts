import * as fs from 'fs';
import { ISubCategory, IParentCategory } from '../puppeteer/model';

export function saveFile(cat: IParentCategory, subCat: ISubCategory) {
    const path = createDir(`files/${getName(cat.title)}`);

    // https://www.tutorialkart.com/nodejs/create-file-in-nodejs-using-node-fs-module/#write-file
    fs.writeFile(
        `${path}/${getName(subCat.title)}.json`, 
        JSON.stringify(subCat), 
        (err) => {
            if (err) 
                throw err;

            console.log([`${cat.title}: ${subCat.title} was created successfully`]);
        }
    );
}

function createDir(path) {
    let pathArr = path.split('/');

    pathArr.reduce((pathByStep, dir) => {
        if (pathByStep.length) {
            pathByStep += '/';
        }
        pathByStep += dir;

        if (!fs.existsSync(pathByStep)) {
            fs.mkdirSync(pathByStep);
        }
        return pathByStep;
    }, '');

    return path;
}

function getName(name) {
    // https://stackoverflow.com/questions/42210199/remove-illegal-characters-from-a-file-name-but-leave-spaces

    return name.replace(/[/\\?%*:|"<>]/g, '-').replace(' ', '-');
}