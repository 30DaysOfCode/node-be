const {Schema,model} = require("mongoose");

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  }
},{
  timestamps: true
});

userSchema.pre("save",function(next){
  this.userName = this.userName.toLowerCase();
  this.firstName = this.firstName.toLowerCase();
  this.lastName = this.lastName.toLowerCase();
  this.email = this.email.toLowerCase();
  return next();
})

module.exports = model("User",userSchema);