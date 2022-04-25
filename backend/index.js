const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { readdirSync } = require("fs");

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

app.use("/api", router);

const DB_CONNECTION = "mongodb://localhost:27017/sms-template";
const db_connect = async () => {
  try {
    await mongoose.connect(DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error connecting to DB");
  }
};

db_connect();

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const modules = getDirectories("./src/modules");

modules.forEach((moduleName) => {
  const appModule = require(`./src/modules/${moduleName}`);
  if (typeof appModule.configure === "function") {
    router.use(`/${moduleName}`, appModule.configure({ app }));
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
