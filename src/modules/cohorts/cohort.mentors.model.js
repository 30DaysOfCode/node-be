const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mentorSchema = new Schema({
    cohort_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  email: {
    type: String,
    required: true,
  },
  track: [],
  accepted:{
    type:Boolean,
    default: false
  }
});

mentorSchema.pre("save", function (next) {
  this.email = this.email.toLowerCase();
  return next();
});

module.exports = mongoose.model("Mentor", mentorSchema);
