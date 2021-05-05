const joi = require("joi");
const Community = require("../models/application");
const {
  generateResponse,
  createError,
  getErrorFromJoiFormat,
} = require("../../../utils/response");
const opts = { abortEarly: false };

const communityValidatorSchema = joi.object().keys({
  community_name: joi.string().required(),
  community_email: joi.string().email().required(),
  password: joi.string().required(),
  community_description: joi.string().required(),
  use_reason: joi.string().required(),
  socials: joi.array(),
  additional_information: joi.string(),
});

exports.communityApplicationValidator = async function (req,res,next){
  try {
    req.body = await communityValidatorSchema.validateAsync(req.body,opts);
    return next();
  } catch (err) {
    const errors = getErrorFromJoiFormat(err)
    return next(generateResponse(400,createError(errors)))
  }
}
