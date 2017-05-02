import mongoose from "mongoose";
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const afflictionModel = new Schema({
  company: {
    type: String,
    required: [true, "Company must not be empty."]
  },

  type: {
    type: String,
    // enum: [("affliction" : "affliction"), ("coupon" : "coupon")],
    required: [true, "Type must not be empty."]
  },

  weblink: {
    type: String,
    required: [true, "website link must not be empty."],
    minlength: [8, "website link must be 8 characters or more."]
  },

  description: {
    type: String
  },

  image: {
    type: String,
    required: [true, "image must not be empty."]
  },

  active: {
    type: Boolean,
    default: true
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

const Affliction = mongoose.model("Affliction", afflictionModel);
export default Affliction;
