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
function saveFile(cat, subCat) {
    var path = createDir("files/" + getName(cat.title));
    // https://www.tutorialkart.com/nodejs/create-file-in-nodejs-using-node-fs-module/#write-file
    fs.writeFile(path + "/" + getName(subCat.title) + ".json", JSON.stringify(subCat), function (err) {
        if (err)
            throw err;
        console.log([cat.title + ": " + subCat.title + " was created successfully"]);
    });
}
exports.saveFile = saveFile;
function createDir(path) {
    var pathArr = path.split('/');
    pathArr.reduce(function (pathByStep, dir) {
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
