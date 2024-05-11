"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("./src/services/logger");
const schoolRoutes_1 = __importDefault(require("./src/routes/schoolRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
(async () => {
    try {
        const connect = await mongoose_1.default.connect(process.env.DB_URI);
        console.log("connected", connect.connection.host);
    }
    catch (err) {
        console.log("Oops! Sorry, connection to the DB failed.", err?.message);
    }
})();
app.use("/schools", logger_1.requestLogger, schoolRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
