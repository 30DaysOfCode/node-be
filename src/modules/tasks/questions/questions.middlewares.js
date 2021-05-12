const User = require("../Roles/user/user.model");
const { generateResponse, createError } = require("../../utils");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const Cohort = require("../../cohorts/cohort.model");
const Mentor = require("../../cohorts/cohort.mentors.model");

exports.validateMentor = async (req, res, next) => {
    let user_id = getCurrentUserID(req);
    let { cohortId } = req.body;
    let mentors = await Mentor.find({ user_id });
    let isMentor =  mentors.find(mentor => mentor.cohort_id == cohortId);
    if(isMentor) return next();    
    next(generateResponse(403,createError("Not authorized for this action.")));    
};

let getCurrentUserID = (req) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, config.SECRET_KEY, (err, user) => {
            return user?._id;
        });
    } else {
        return null;
    }
};
