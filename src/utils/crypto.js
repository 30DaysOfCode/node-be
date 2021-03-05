const {hash,compare} = require("bcryptjs");
const {SECRET_KEY} = require("../config/config");
const {sign,verify} = require("jsonwebtoken");

exports.hashPassword = (plainPassword) => hash(plainPassword,10)

exports.comparePassword = (text,hash) => {
  return compare(text,hash)
}

exports.signJWT = function(payload){
  return sign(payload,SECRET_KEY,{expiresIn: 60*60*24*7});
}

exports.verifyJWT = function(jwt){
  return verify(jwt,SECRET_KEY);
}