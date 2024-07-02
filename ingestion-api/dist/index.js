"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const ingestionController_1 = __importDefault(require("./controllers/ingestionController"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const upload = (0, multer_1.default)({ dest: 'uploads/' });
app.post('/upload', upload.single('file'), ingestionController_1.default.uploadFile);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
