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
const users = [];
const tokens = [];
function initializeAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        const adminEmail = 'admin';
        const adminPassword = 'admin';
        const hashedPassword = yield bcrypt_1.default.hash(adminPassword, 10);
        users.push({ email: adminEmail, password: hashedPassword });
        console.log('Admin account created');
    });
}
function addUser(user) {
    users.push(user);
}
function getUserByEmail(email) {
    return users.find(user => user.email === email);
}
function addToken(token) {
    tokens.push(token);
}
function getToken(token) {
    return tokens.find(t => t.token === token);
}
exports.default = {
    initializeAdmin,
    addUser,
    getUserByEmail,
    addToken,
    getToken,
};
