import * as fs from 'fs';

export function createAndSaveFiles(course) {
    // https://stackoverflow.com/questions/42210199/remove-illegal-characters-from-a-file-name-but-leave-spaces
    const filename = course.title.replace(/[/\\?%*:|"<>]/g, '-').replace(' ', '-');

    const dir = 'files';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    const courseDir = `${dir}/${filename}`;

    if (!fs.existsSync(courseDir)) {
        fs.mkdirSync(courseDir);
    }

    course.sectionsDownload.forEach((section, key) => {
        const filename = section.title.replace(/[/\\?%*:|"<>]/g, '-').replace(' ', '-');
        fs.writeFile(`${courseDir}/${key + 1} - ${filename}.json`, JSON.stringify(section.lectures), function (err) {
            if (err) throw err;
            console.log([`${course.title} - ${key + 1}/${course.sectionsDownload.length} - ${section.title} was created successfully`]);
        });
    });
}
    // https://www.tutorialkart.com/nodejs/create-file-in-nodejs-using-node-fs-module/#write-file