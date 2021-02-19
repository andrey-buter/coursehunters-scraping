"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
function createAndSaveFiles(course) {
    // https://stackoverflow.com/questions/42210199/remove-illegal-characters-from-a-file-name-but-leave-spaces
    var filename = course.title.replace(/[/\\?%*:|"<>]/g, '-').replace(' ', '-');
    var dir = 'files';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    var courseDir = dir + "/" + filename;
    if (!fs.existsSync(courseDir)) {
        fs.mkdirSync(courseDir);
    }
    course.sectionsDownload.forEach(function (section, key) {
        var filename = section.title.replace(/[/\\?%*:|"<>]/g, '-').replace(' ', '-');
        fs.writeFile(courseDir + "/" + (key + 1) + " - " + filename + ".json", JSON.stringify(section.lectures), function (err) {
            if (err)
                throw err;
            console.log([course.title + " - " + (key + 1) + "/" + course.sectionsDownload.length + " - " + section.title + " was created successfully"]);
        });
    });
}
exports.createAndSaveFiles = createAndSaveFiles;
// https://www.tutorialkart.com/nodejs/create-file-in-nodejs-using-node-fs-module/#write-file
