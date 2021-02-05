const express = require("express");
const config = require("./config/config");
const setupDb = require("./loaders/database.loader");
const setupRoutes = require("./loaders/routes.loader");
const app = express();

// attach express module to the express app instance
app.express = express;

module.exports = function loadResources() {
  return Promise.all([setupDb(app, config), setupRoutes(app, config)])
    .then((db, route) => {
      console.log("resources have successfully loaded");
      return Promise.resolve({
        port: config.PORT,
        appInstance: app,
      });
    })
    .catch((err) => {
      console.log(err);
      process.exit;
    });
};
