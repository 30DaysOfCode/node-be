const express = require("express");
const apiRouter = express.Router();

const attemptRouter = require('../modules/tasks/attempts/attempts.routes');
const certificateRouter = require('../modules/certificates/certificates.routes');
const couponRouter = require('../modules/payments/coupons/coupons.routes');
const questionRouter = require('../modules/tasks/questions/questions.routes');
const communityRouter= require("../modules/cohorts/external30/applicationRouter");
apiRouter.use('/attempts', attemptRouter)
apiRouter.use('/certificates', certificateRouter)
apiRouter.use('/coupons', couponRouter)
apiRouter.use('/questions', questionRouter)
apiRouter.use('/application',communityRouter);

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
