const resp = require("../../../../utils/index");
const responseObject = resp.generateResponse;
const errorObject = resp.createError;
const ValidateEmail = (mail) => {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    )
  ) {
    return true;
  }
  return false;
};

const application = (req, res, next) => {
  let comDTO = req.body;
  let fields = [];
  if (!comDTO.community_name) {
    fields.push("community_name");
  }
  if (!comDTO.community_email || !ValidateEmail(comDTO.community_email)) {
    fields.push("community_email");
  }
  if (!comDTO.use_reason) {
    fields.push("use_reason");
  }if(!comDTO.community_description){
    fields.push("community_description");
  }
  if (fields.length !== 0) {
    let response = errorObject(
      `The following fields are either missing or invalid: ${fields.join(", ")}`
    );
    res.status(400);
    return res.json(response);
  }
  req.comDTO=comDTO;
  next();
};

module.exports.application=application;
