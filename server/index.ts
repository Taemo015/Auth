import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";

import sequelize from "./db";
import router from "./routing";
import errorMiddlewares from "./middlewares/error_middlewares";

const app: Application = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api", router);
app.use(errorMiddlewares);

async function startProject() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
  } catch (e) {
    console.log(e);
  }
}

startProject();
