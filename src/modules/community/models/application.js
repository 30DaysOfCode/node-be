const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  community_name: {
    type: String,
    required:true
  },
  community_email: {
    type: String,
    required:true
  },
  password: {
    type: String,
  },
  community_description: {
    type: String,
    required:true
  },
  use_reason: {
    type: String,
    required:true
  },
  socials:{
      type: Array
  },
  additional_information: {
    type: String
  },
  approved:{
    type:Boolean,
    default:false
  }
},{timestamps: true});


let Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;