const ApplicatonController=require("./controllers/ApplicationController");
const express = require("express");
const router = express.Router();

router.post("/apply", ApplicatonController.apply);
router.post("/unapproved",ApplicatonController.unapproved);
router.post("/approve",ApplicatonController.approve);

module.exports = router;
