"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("./config/api");
const database_1 = require("./config/database");
const api_2 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const apiBaseUrl = (0, api_1.getApiBaseUrl)();
app.use(express_1.default.json());
app.use('/api', api_2.default);
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});
app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
});
async function start() {
    try {
        await (0, database_1.connectToDatabase)();
        console.log('Connected to MongoDB octofit_db');
        app.listen(port, () => {
            console.log(`OctoFit backend listening on port ${port}`);
            console.log(`API base URL: ${apiBaseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
}
void start();
