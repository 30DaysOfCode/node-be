const cors = require("cors");
const apiRouter = require("../modules/apiRouter");
const { generateResponse, createError } = require("../utils/index");

function setUpRoutes(app, config) {
  return new Promise((resolve, reject) => {
    app.use(app.express.json());

    app.use(cors());

    app.use("/v1", apiRouter);

    app.use(function (req, res, next) {
      return next(generateResponse(404, createError("Resource not found")));
    });

    app.use((err, req, res, next) => {
      return res.status(err.status).json(err.result);
    });

    return resolve(app);
  });
}

module.exports = setUpRoutes;
