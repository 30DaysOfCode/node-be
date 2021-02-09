const express = require("express");
const apiRouter = express.Router();

const questionRouter = require('../modules/tasks/questions/questions.routes');

apiRouter.use('/questions', questionRouter)

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
