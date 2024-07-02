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
exports.DatabaseService = void 0;
const mongodb_1 = require("mongodb");
class DatabaseService {
    constructor(dbAdapter) {
        this.collectionName = 'products';
        this.dbAdapter = dbAdapter;
    }
    insertProducts(products) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.dbAdapter.getDb();
            const collection = db.collection(this.collectionName);
            yield collection.insertMany(products);
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.dbAdapter.getDb();
            const collection = db.collection(this.collectionName);
            const product = yield collection.findOne({ _id: new mongodb_1.ObjectId(id) });
            return product ? this.mapDocumentToProduct(product) : null;
        });
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.dbAdapter.getDb();
            const collection = db.collection(this.collectionName);
            const products = yield collection.find({}).toArray();
            return products.map(this.mapDocumentToProduct);
        });
    }
    updateProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.dbAdapter.getDb();
            const collection = db.collection(this.collectionName);
            yield collection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: product });
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = this.dbAdapter.getDb();
            const collection = db.collection(this.collectionName);
            yield collection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        });
    }
    mapDocumentToProduct(document) {
        return {
            id: document._id.toString(),
            name: document.name,
            description: document.description,
            price: document.price,
            quantity: document.quantity,
        };
    }
}
exports.DatabaseService = DatabaseService;
