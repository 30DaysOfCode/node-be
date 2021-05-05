const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const participantSchema = new Schema({
  cohort_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  email: {
    type: String,
    required: true,
  },
  tracks: [],
  // A user might leave a cohort to join another one, if such happens, this would be false. If a user wants to join another
  active:{
      type: Boolean,
      default:true
  }
});

participantSchema.pre("save", function (next) {
  this.email = this.email.toLowerCase();
  return next();
});

module.exports = mongoose.model("Participant", participantSchema);
