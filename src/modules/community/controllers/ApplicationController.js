const {
  generateResponse,
  createError,
  getErrorFromJoiFormat,
} = require("../../../utils/response");
const utils = require("../../../utils/crypto");
const { SECRET_KEY } = require("../../../config/config");
let Application = require("../models/application");
let User=require("../../Roles/user/user.model");
/**
 * This function processes all valid community applications and adds them to the database
 */

module.exports.apply = async (req, res) => {
  let comDTO = req.comDTO;
  let data = await User.findOne({
    email: comDTO.community_email,
  }).exec();
  if (data) {
    let result=generateResponse(409, createError("This email has already been used to apply for a community"))
    return res.status(result.status).json(result.result);
  } else {
    comDTO.password=utils.hashPassword(comDTO.password);
    let application = new Application(comDTO);
    await application.save();
    let newUser=new User({
      community_id:application._id,
      email:comDTO.community_email,
      password:comDTO.password,
      username:comDTO.community_name,
      role:community
    })
    await newUser.save();
    application.password="n/a"
    let result = generateResponse(201, createSuccessMessage(application))
    return res.status(result.status).json(result.result);
  }
};


/**
 * This function returns all the unapproved community applications
 */
module.exports.unapproved = async (req, res) => {
  let applications = await Application.find({ approved: false }, "-password").exec();  
  let result = generateResponse(200, createSuccessMessage(applications))
  return res.status(result.status).json(result.result);
};

/**
 * This function takes in an array of strings, which represend the id of applications that have been approved, and updates their approval status in the database.
 */
module.exports.approve = async (req, res) => {
  let approved = req.body.approved;
  let docs = await Application.find({
    _id: { $in: approved },
  });
  for (doc of docs) {
    if (!doc.approved) {
      doc.approved = true;
      doc.save();
      doc.password="n/a"
    }
  }
  // send mail to alert applyers

  let result = generateResponse(201, createSuccessMessage(docs))
  return res.status(result.status).json(result.result);
};


module.exports.getCommunitybyId=async (req,res)=>{
let id=req.params.id;
let community=await Application.findById(id,"-password").exec();
let result = generateResponse(200, createSuccessMessage(community))
return res.status(result.status).json(result.result);
}
