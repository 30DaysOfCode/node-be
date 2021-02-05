const express = require("express");
const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  return res.json({
    data: {
      request: "welcome to the 30 days of code entry route.",
    },
    errors: null,
    message: "welcome",
  });
});

module.exports = apiRouter;
