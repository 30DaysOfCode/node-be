const joi = require("joi");
const {generateResponse,createError, getErrorFromJoiFormat} = require("../../utils/response");
const opts = {abortEarly:false}


const cohortValidatorSchema = joi.object().keys({
    cohortName:joi.string().required(),
    tracks:joi.array(),
    lateSubmission:joi.boolean(),
    startDate:joi.date().greater('now'),
    mentors:joi.array().items(
      joi.object({
        a: joi.string().email().required(),
        b: joi.array().items(joi.string())
      })
    )
  })

  exports.cohortValidator=async function(req,res,next){
    try{
      req.body=cohortValidatorSchema.validateAsync(req.body,opts);
      let data=req.body;
      if(data.mentors){
          for(mentor in mentors){
              for(track in mentor.track){
                  if (!data["tracks"].includes("track")){
                    return next(generateResponse(400,createError(`track ${track} for a mentor is not a track for this cohort`)));
                  }
              }
          }
      }
      return next();
    }catch(err){
      const errors=getErrorFromJoiFormat(err);
      return next(generateResponse(400,createError(errors)))
    }
  }