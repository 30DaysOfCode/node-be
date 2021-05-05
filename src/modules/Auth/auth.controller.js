const User = require("../Roles/user/user.model");
const utils = require("../../utils");
const { generateResponse } = require("../../utils");


class AuthController {
  static async attemptLogin(payload){
    try {
      const {email,password} = payload;
      const user = await User.findOne({email});
      if (!user) throw new Error("Invalid login credentials");

      const passwordMatch = await utils.comparePassword(password,user.password);
      
      if(!passwordMatch)throw new Error("Invalid login credentials")

      //all validation passed, generate payload and send
      const token = utils.signJWT({id:user._id,role:user.role,email:user.email})
      return generateResponse(200,utils.createSuccessMessage({user,token}))
    } catch (err) {
      return utils.generateResponse(400,utils.createError([err.message])); 
    }  
  }

  static async registerUser(payload){
    try {
      const user = new User(payload);
      user.password = await utils.hashPassword(user.password);
      await user.save();
      user.password = "N/A"
      return generateResponse(200,utils.createSuccessMessage(user))
    } catch (err) {
      return utils.generateResponse(400,utils.createError([err.message]));
    }
  }
}

module.exports = AuthController;