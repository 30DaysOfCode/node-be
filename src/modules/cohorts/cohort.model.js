const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortSchema = new Schema(
  {
    cohortName: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    internal:{
      type: Boolean,
      required: true,
      default:false
    },
    tracks: {
      type: Array,
      required: true,
    },
    lateSubmission: {
      type: Boolean,
      default: true,
    },
    startDate: {
      type: Date,
    },
    length:{
      type:Number,
      default:30
    }
  },
  {
    timestamps: true,
  }
);

cohortSchema.pre("save", function (next) {
  // by default, cohort starts the next day at midnight.
  if (!this.startDate) {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setHours(date.getHours() + 24);
    this.startDate = date;
  } else {
    this.startDate = this.startDate;
  }
  return next();
});

module.exports = mongoose.model("Cohort", cohortSchema);
