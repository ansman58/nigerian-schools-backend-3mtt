import express from "express";
import SchoolsController from "../controllers/SchoolsController";

const schoolRouter = express.Router();

const schoolsController = new SchoolsController();
schoolRouter.get("/", schoolsController.index);
schoolRouter.post("/", schoolsController.create);
schoolRouter.get("/generate", schoolsController.generateFakeSchhols);

export default schoolRouter;
