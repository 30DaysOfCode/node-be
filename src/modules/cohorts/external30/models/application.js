const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  id: Number,
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
      type: String
  },
  additional_information: {
    type: String
  },
  approved:{
    type:Boolean,
    default:false
  }
},{timestamps: true});


ApplicationSchema.plugin(AutoIncrement, {inc_field: 'id'});
let Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;