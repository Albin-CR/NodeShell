import mongoose from "mongoose";
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const userModel = new Schema({

  username: {
    type: String,
    required: [true, "Username must not be empty."],
    minlength: [3, "Username must be 3 characters or more."]
  },
  
  password: {
    type: String,
    required: [true, "Password must not be empty."],
    minlength: [8, "Password must be 8 characters or more."]
  },

  email: {
    type: String,
    required: [true, "Email must not be empty."],
    index: {
      unique: true,
      sparse: true
    }
  },

  phno: {
    type: [Number, "Phone number must digit."],
    required: [true, "Phone number must not be empty."],
    min: [10, "Phone number should be of 10 digit."],
    max: [11, "Phone number should be of 10 digit."]
  },

  created: {
    type: Date,
    default: Date.now
  },

  updated: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", userModel);
export default User;
