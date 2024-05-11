import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { requestLogger } from "./src/services/logger";
import schoolRouter from "./src/routes/schoolRoutes";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

(async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URI as string);

    console.log("connected", connect.connection.host);
  } catch (err) {
    console.log(
      "Oops! Sorry, connection to the DB failed.",
      (err as Error)?.message
    );
  }
})();

app.use("/schools", requestLogger, schoolRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
