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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBAdapterImpl = void 0;
const mongodb_1 = require("mongodb");
class MongoDBAdapterImpl {
    connect(dbHost, dbName) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = new mongodb_1.MongoClient(dbHost);
            yield client.connect();
            this.db = client.db(dbName);
            console.log(`Connected to MongoDB at ${dbHost}`);
        });
    }
    getDb() {
        if (!this.db) {
            throw new Error('Database not connected');
        }
        return this.db;
    }
}
exports.MongoDBAdapterImpl = MongoDBAdapterImpl;
