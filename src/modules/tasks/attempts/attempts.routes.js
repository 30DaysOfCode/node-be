const { Router } = require("express");
const AttemptController = require("./attempts.controller");
const { authcheck } = require("../../Auth/auth.middleware");

var router = Router();

router.use(authcheck);

router.get("/", AttemptController.fetchAttempts);

router.get("/:id", AttemptController.fetchAttemptById);

router.post("/create", AttemptController.addAttempt);

router.patch("/edit/:id", AttemptController.editAttempt);

router.delete("/delete/:id", AttemptController.deleteAttempt);

module.exports = router;
