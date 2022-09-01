import dotenv from "dotenv";
dotenv.config();

import express from "express";
import auth from "./routes/auth";
import { logger } from "./configs/logger";
import db from "./db/models";
import upload from "./routes/upload";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createFolder } from "./utils/createFolder";
import { passport } from "./configs/passport";

const PORT = process.env.APP_PORT || 7777;
const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

app.use(passport.initialize());

app.use("/api", express.static("public"));
app.use("/api/auth", auth);
app.use("/api/upload", upload);
app.get("/", (req, res) => {
  res.redirect("/api");
});

const start = async () => {
  createFolder("/public/avatars");
  try {
    app.listen(PORT, () => {
      logger("initialize-app").info(
        `Server has been started on port ${PORT}...`
      );
    });
    db.sequelize
      .sync()
      .then(function () {
        console.log("Nice! Database looks fine");
      })
      .catch(function (err) {
        console.log(err, "Something went wrong with the Database Update!");
      });

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();
