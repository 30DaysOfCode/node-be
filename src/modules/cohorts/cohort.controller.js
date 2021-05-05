const utils = require("../../utils/crypto");
const {
  generateResponse,
  createError,
  createSuccessMessage,
} = require("../../utils/response");
const { SECRET_KEY } = require("../../config/config");
const Cohort = require("./cohort.model");
const Mentor = require("./cohort.mentors.model");
const Participant = require("./cohorts.participants.model");
const User = require("../Roles/user/user.model");

let addCohort = async (lastcohort, data) => {
  if (!lastcohort) {
    let cohort = new Cohort(data);
    //console.log(data);
    let newCohort = await cohort.save();
    if (data.mentors) {
      for (mentor in data.mentors) {
        mentor.cohort_id = newCohort._id;
      }
      let mentors = await Mentor.insertMany(data.mentors);
    }
    return generateResponse(201, createSuccessMessage(newCohort));
  } else {
    let date = lastcohort.startDate;
    let length = lastcohort.length;
    let now = new Date();
    date.setHours(date.getHours() + length * 24);
    if (now < date) {
      // A cohort is already in session;
      return generateResponse(
        409,
        createError("A cohort is already in session")
      );
    } else {
      let cohort = new Cohort(data);
      let newCohort = await cohort.save();
      if (data.mentors) {
        for (mentor in data.mentors) {
          mentor.cohort_id = newCohort._id;
        }
        let mentors = await Mentor.insertMany(data.mentors);
      }
      return generateResponse(201, createSuccessMessage(newCohort));
    }
  }
};


module.exports.createCohort = async (req, res) => {
  let data = await req.body;
  console.log(data)
  let token = req.headers.authorization;

  let { id, role } = utils.verifyJWT(token, SECRET_KEY);
  data.createdBy=id;
  let result;
  if (role == "admin") {
    let lastcohort = await Cohort.findOne({ internal: true })
      .sort({ created_at: -1 })
      .exec();
    result = await addCohort(lastcohort, data);
  } else if (role == "community") {
    let lastcohort = await Cohort.findOne({ createdBy: id }).sort({
      created_at: -1,
    });
    data.internal = false;
    result = await addCohort(lastcohort, data);
  } else {
    generateResponse(403, createError("User not eligible to create cohort"));
  }
  return res.status(result.status).json(result.result);
};



module.exports.addParticipants = async (req, res) => {
  let overwrite = req.query.overwrite;
  let token = req.headers.authorization;
  let cohort_id = req.params.cohort_id;
  let { tracks } = req.body;
  let { id, role, email } = utils.verifyJWT(token, SECRET_KEY);
  let result;
  let lastcohort = await Participant.findOne({ email })
    .sort({ created_at: -1 })
    .exec();
  if (lastcohort) {
    let date = lastcohort.startDate;
    let length = lastcohort.length;
    let now = new Date();
    date.setHours(date.getHours() + length * 24);
    if (now < date && !overwrite) {
      // Already part of a cohort organized by
      result = generateResponse(
        409,
        createError("You are already part of a cohort")
      );
      return res.status(result.status).json(result.result);
    } else {
      if (lastcohort._id == cohort_id) {
        result = generateResponse(
          409,
          createError("You are already part of this cohort")
        );
        return res.status(result.status).json(result.result);
      }
      let cohort = await Cohort.findById(cohort_id).exec();
      if (!cohort) {
        result = generateResponse(404, createError("cohort does not exist"));
        return res.status(result.status).json(result.result);
      } else {
        let date = cohort.startDate;
        let length = cohort.length;
        let now = new Date();
        date.setHours(date.getHours() + length * 24);
        if (now > date) {
          result = generateResponse(400, createError("This cohort has ended"));
          return res.status(result.status).json(result.result);
        }
        for (track in tracks) {
          if (!result["tracks"].includes(track)) {
            result = generateResponse(
              404,
              createError(
                `selected track ${track} does not exist in this cohort`
              )
            );
            return res.status(result.status).json(result.result);
          }
        }
        let newParticipant = new Participant({
          email,
          user_id: id,
          cohort_id,
          startDate: cohort.startDate,
          length: cohort.length,
          tracks,
        });
        lastcohort.active = false;
        await lastcohort.save();
        let participant = await newParticipant.save();
        let user = await User.findById(id).exec();
        user.cohort_id = cohort_id;
        await user.save();
        generateResponse(201, createSuccessMessage(participant));
        return res.status(result.status).json(result.result);
      }
    }
  }
};

module.exports.getAllParticipants = async (req, res) => {
  let cohort_id = req.params.cohort_id;
  let participants = await Participant.find({ cohort_id }).exec();
  generateResponse(201, createSuccessMessage(participants));
  return res.status(result.status).json(result.result);
};

// module.exports.updateMentors=(req,res)=>{

// }
