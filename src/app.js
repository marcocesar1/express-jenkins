require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { AppDataSource, generateRandomUsers } = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", function (req, res, next) {
  res.json({ msg: "Welcome to Jenkins test" });
});

app.get("/users", async function (req, res, next) {
  const userRepo = AppDataSource.getRepository("User");

  const users = await userRepo.find();
  const totalRows = await userRepo.count();

  res.json({ users, totalRows });
});

app.get("/health", function (req, res, next) {
  res.json({ msg: "ok", env: process.env.NODE_ENV });
});

const appCallback = () => {
  console.log(`Listening on PORT: ${port}`);
  console.log(`ENV: ${process.env.NODE_ENV}`);
};

async function initApp() {
  try {
    await AppDataSource.initialize();
    await generateRandomUsers();

    app.listen(port, appCallback);
  } catch (error) {
    console.log({ appError: error?.message });
  }
}

initApp();
