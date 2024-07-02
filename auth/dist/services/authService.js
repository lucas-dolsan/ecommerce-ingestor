"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const storage_1 = __importDefault(require("../storage"));
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
function initialMigration() {
    return __awaiter(this, void 0, void 0, function* () {
        const adminEmail = 'admin';
        const adminPassword = 'admin';
        const existingAdmin = storage_1.default.getUserByEmail(adminEmail);
        if (!existingAdmin) {
            const hashedPassword = yield bcrypt_1.default.hash(adminPassword, 10);
            storage_1.default.addUser({ email: adminEmail, password: hashedPassword });
            console.log('Admin account created');
        }
    });
}
function registerUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        storage_1.default.addUser({ email, password: hashedPassword });
    });
}
function loginUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = storage_1.default.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        const token = jsonwebtoken_1.default.sign({ userId: email }, JWT_SECRET, { expiresIn: '1h' });
        storage_1.default.addToken({ token, userId: email });
        return token;
    });
}
function verifyToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const storedToken = storage_1.default.getToken(token);
        if (!storedToken) {
            throw new Error('Invalid token');
        }
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    });
}
exports.default = {
    initialMigration,
    registerUser,
    loginUser,
    verifyToken
};
