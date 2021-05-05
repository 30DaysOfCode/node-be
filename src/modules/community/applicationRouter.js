const ApplicatonController=require("./controllers/ApplicationController");
const {communityApplicationValidator}=require("./middlewares/validateBody");
const express = require("express");
const router = express.Router();

router.post("/apply",communityApplicationValidator, ApplicatonController.apply);

router.get("/unapproved",ApplicatonController.unapproved);

router.post("/approve",ApplicatonController.approve);

router.get("/:id",ApplicatonController.getCommunitybyId)

module.exports = router;
