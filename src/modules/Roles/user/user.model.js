const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    community_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    cohort_id: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  this.userName = this.userName.toLowerCase();
  this.firstName = this.firstName.toLowerCase();
  this.lastName = this.lastName.toLowerCase();
  this.email = this.email.toLowerCase();
  return next();
});

module.exports = mongoose.model("User", userSchema);
