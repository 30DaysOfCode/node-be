const responseObject = require("../utils/responseObject");
let Application = require("../models/application");

/**
 * This function processes all valid community applications and adds them to the database
 */

const apply = async (req, res) => {
  let comDTO = req.comDTO;
  let data = await Application.findOne({
    community_email: comDTO.community_email,
  }).exec();
  if (data) {
    let response = new responseObject(
      409,
      "This email has already been used to apply for a community",
      "error",
      null
    );
    res.status(response.statusCode);
    delete response.statusCode;
    return res.json(response);
  } else {
    let application = new Application(comDTO);
    await application.save();
    let response = new responseObject(
      201,
      "The application has submitted successfully",
      "success",
      null
    );
    res.status(response.statusCode);
    delete response.statusCode;
    return res.json(response);
  }
};


/**
 * This function returns all the unapproved community applications
 */
const unapproved = async (req, res) => {
  let applications = await Application.find({ approved: false }, "-_id").exec();
  let response = new responseObject(
    200,
    "unapproved applications",
    "success",
    applications
  );
  res.status(response.statusCode);
  delete response.statusCode;
  return res.json(response);
};

/**
 * This function takes in an array of integers, which represend the id of applications that have been approved, and updates their approval status in the database.
 */
const approve = async (req, res) => {
  let approved = req.body.approved;
  let docs = await Application.find({
    id: { $in: approved },
  });
  for (doc of docs) {
    if (!doc.approved) {
      doc.approved = true;
      doc.save();
    }
  }
  // send mail to alert applyers

  let response = new responseObject(
    201,
    "successfully approved applications",
    "success",
    null
  );
  res.status(response.statusCode);
  delete response.statusCode;
  return res.json(response);
};

module.exports.apply = apply;
module.exports.unapproved = unapproved;
module.exports.approve=approve;
