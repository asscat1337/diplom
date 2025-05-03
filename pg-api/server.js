require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const { databaseConnect,closeDatabaseConnection } = require("./database/index");
const morgan = require("morgan");
const { mainRouter } = require("./routes");

const PORT = 5174;

const app = express();
// app.use(cors());
app.use("/api", mainRouter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

async function main() {
  await databaseConnect();

  app.listen(PORT, () => console.log("Listening on port " + PORT));
}

(async () => await main())().catch(console.error);
