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
const messageService_1 = __importDefault(require("./services/messageService"));
const fileStorageService_1 = __importDefault(require("./services/fileStorageService"));
const parserService_1 = require("./services/parserService");
const mongodbAdapter_1 = require("./adapters/mongodbAdapter");
const databaseService_1 = require("./services/databaseService");
// Initialize database connection and services
const dbHost = process.env.DB_HOST || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'development';
const dbAdapter = new mongodbAdapter_1.MongoDBAdapterImpl();
const productsRepository = new databaseService_1.DatabaseService(dbAdapter);
function ingestionQueueOnMessage(content) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { filename } = JSON.parse(content);
            console.log(`Processing file: ${filename}`);
            let parsedData = [];
            yield fileStorageService_1.default.streamFile(filename, (chunk) => __awaiter(this, void 0, void 0, function* () {
                yield (0, parserService_1.parseDataChunk)(chunk, (data) => {
                    return JSON.parse(data); // Assuming each chunk is a JSON array of products
                }, (transformedData) => {
                    console.log('Processed chunk:', transformedData);
                    parsedData = parsedData.concat(transformedData);
                });
            }));
            // Write parsed data to MongoDB
            yield productsRepository.insertProducts(parsedData);
            console.log('Data successfully written to MongoDB');
        }
        catch (error) {
            console.error('Error processing message:', error);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield dbAdapter.connect(dbHost, dbName);
    yield messageService_1.default.consume('ingestion-queue', ingestionQueueOnMessage);
}))();
