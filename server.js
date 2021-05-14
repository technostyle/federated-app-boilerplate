// TODO: CONSIDER NO SLASH ENDPOINT HOSTS
// in order to solve //main.js problem
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const { PUBLIC_URL_MOCK, AGGREGATOR_URL_MOCK } = require("./constants.js");

const DIST_DIR_NAME = "dist";
const port = process.env.PORT || 8080;
const host = process.env.PUBLIC_URL || "";
const nodeVersion = process.version || "";
const aggregatorHost = process.env.AGGREGATOR_URL || "";
console.log({ host, port, aggregatorHost, nodeVersion });

const MOCK_REPLACE_MAP = {
  [PUBLIC_URL_MOCK]: host,
  [AGGREGATOR_URL_MOCK]: aggregatorHost,
};

const logger = (req, res, next) => {
  console.log(`Time: ${Date.now()}. Request URL: ${req.originalUrl}`);
  next();
};
app.use(cors());
app.use(logger);
app.set("json spaces", 2);

const staticHub = {};

const getFileStringReplaced = (filePath, replaceMap) => {
  try {
    if (path.extname(filePath) === ".woff") return fs.readFileSync(filePath);

    const fileString = fs.readFileSync(filePath, "utf-8");
    let properFileString = fileString;

    // TODO: consider no slash hosts in config file
    if (filePath.includes("index.html")) {
      properFileString = properFileString.split("/main.js").join("main.js");
    }

    return Object.keys(replaceMap).reduce((properFileString, curPattern) => {
      return properFileString.split(curPattern).join(replaceMap[curPattern]);
    }, properFileString);
  } catch (e) {
    console.error("changeUniqueStringInFile", e);
  }
};

// TODO: consider create utils file
const setStaticHub = () => {
  const distDirPath = path.join(__dirname, DIST_DIR_NAME);
  const distDir = fs.readdirSync(distDirPath);
  distDir.forEach((file) => {
    const replaced = getFileStringReplaced(
      path.join(__dirname, DIST_DIR_NAME, file),
      MOCK_REPLACE_MAP
    );

    staticHub[file] = replaced;
  });
};
setStaticHub();

const setDynamicRoutes = () => {
  Object.keys(staticHub).forEach((staticFilePath) => {
    app.use(`/${staticFilePath}`, (req, res) => {
      const rawStaticFile = staticHub[staticFilePath];
      const ext = path.extname(staticFilePath);
      switch (ext) {
        case ".html":
          res.setHeader("Content-Type", "text/html", "charset=UTF-8");
          res.send(rawStaticFile);
          break;
        case ".js":
          res.setHeader("Content-Type", "text/javascript");
          res.end(rawStaticFile);
          break;
        case ".json":
          res.json(JSON.parse(rawStaticFile));
          break;
        default:
          res.setHeader("Content-Type", "application/json");
          res.send(rawStaticFile);
      }
    });
  });
};

setDynamicRoutes();
app.use("*", function (req, res) {
  res.redirect("/index.html");
});
app.listen(port);
