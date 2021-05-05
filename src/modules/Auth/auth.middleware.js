const joi = require("joi");
const User = require("../Roles/user/user.model")
const {generateResponse,createError, getErrorFromJoiFormat} = require("../../utils")
const jwt=require("jsonwebtoken");;
const config=require("../../config/config")

const opts = {abortEarly:false}

const signInValidatorSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().required()
})
exports.signInValidator = async function (req,res,next){
  try {
    req.body = await signInValidatorSchema.validateAsync(req.body,opts);
    return next();
  } catch (err) {
    const errors = getErrorFromJoiFormat(err);
    return next(generateResponse(400,createError(errors)));
  }
}

const signupValidatorSchema = joi.object().keys({
  firstName:joi.string().required(),
  lastName:joi.string().required(),
  email:joi.string().email().required(),
  userName:joi.string().required(),
  password: joi.string().required(),
  confirmPassword:joi.string().required().valid(joi.ref('password')),
})
exports.signUpValidator = async function (req,res,next){
  try {
    req.body = await signupValidatorSchema.validateAsync(req.body,opts);
    return next();
  } catch (err) {
    const errors = getErrorFromJoiFormat(err)
    return next(generateResponse(400,createError(errors)))
  }
}


exports.verifyUniqueDetails = async function(req,res,next){
  const possibleErrors = ["email already exists","username already exists"];
  const errors = [];
  (
    await Promise.all([
      User.find({email:req.body.email.toLowerCase()}),
      User.find({userName:req.body.userName.toLowerCase()})
    ])
  ).forEach((values,i)=>{
    if(values.length > 0)errors.push(possibleErrors[i]);
  })

  if (errors.length) return next(generateResponse(400,createError(errors)))

  return next();
}

exports.authcheck=async (req,res,next)=>{
  const token = req.headers.authorization;
  if (token) {
      jwt.verify(token, config.SECRET_KEY, (err, user) => {
          if (err) {
            return next(generateResponse(403,createError("invalid signin token")))
          }
          return next();
      });
  }else{
    return next(generateResponse(401,createError("user not signed in")))
  }
}