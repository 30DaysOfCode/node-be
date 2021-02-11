const ApplicatonController=require("./controllers/ApplicationController");
const bodyvalidate=require("./middlewares/validateBody");
const express = require("express");
const router = express.Router();

router.post("/apply",bodyvalidate.application, ApplicatonController.apply);

router.get("/unapproved",ApplicatonController.unapproved);

router.post("/approve",ApplicatonController.approve);

module.exports = router;
