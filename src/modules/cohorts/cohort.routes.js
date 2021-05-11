const express = require("express");
const router = express.Router();
const {cohortValidator}=require("./cohort.middleware");
const {createCohort,addParticipants,getAllParticipants}=require("./cohort.controller");
const {authcheck}=require("../Auth/auth.middleware")
router.post("/createcohort",authcheck,cohortValidator,createCohort);
router.get("/:cohort_id/participate",authcheck,addParticipants);
router.get("/:cohort_id/getallparticipants",getAllParticipants);

module.exports=router;