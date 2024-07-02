"use strict";
const multer = require('multer');
let fileStorage = null;
function getInstance() {
    if (!fileStorage) {
        fileStorage = multer({ dest: 'uploads/' });
    }
    return fileStorage;
}
function getMiddleware() {
    return getInstance().single('file');
}
module.exports = {
    getMiddleware
};
