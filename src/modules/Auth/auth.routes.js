const {Router} = require("express");
const {signInValidator, signUpValidator, verifyUniqueDetails} = require("./auth.middleware");
const AuthController = require("./auth.controller");

const authRouter = Router();

authRouter.post("/sign-up",signUpValidator,verifyUniqueDetails,async (req,res)=>{
  const {result,status} = await AuthController.registerUser(req.body);
  res.status(status).json(result);
})

authRouter.post("/sign-in",signInValidator,async (req,res)=>{
  const result = await AuthController.attemptLogin(req.body);
  res.status(result.status).json(result.result)
})

module.exports = authRouter;