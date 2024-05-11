"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SchoolsController_1 = __importDefault(require("../controllers/SchoolsController"));
const schoolRouter = express_1.default.Router();
const schoolsController = new SchoolsController_1.default();
schoolRouter.get("/", schoolsController.index);
schoolRouter.post("/", schoolsController.create);
schoolRouter.get("/generate", schoolsController.generateFakeSchhols);
exports.default = schoolRouter;
