"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const authService_1 = __importDefault(require("./services/authService"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
// Middleware to parse JSON requests
app.use(express_1.default.json());
authService_1.default.initialMigration();
// Define auth routes
app.use('/auth', authRoutes_1.default);
// Start the server
app.listen(port, () => {
    console.log(`Auth service is running on port ${port}`);
});
