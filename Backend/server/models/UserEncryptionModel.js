import mongoose from "mongoose";

const UserEncryption = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "userName is required"],
  },
  privateKeySalt: {
    type: String,
    required: [true, "privateKeySalt is required"],
    unique: true,
  },
  encrytpedData: {
    type: String,
    required: [true, "encrytpedData is required"],
  },
  intializationVector: {
    type: String,
    required: [true, "intializationVector is required"],
  },
  keyUseCount: {
    type: Number,
    default: 3, // Set default remaining uses
    required: [true, "keyUseCount is required"],
  },
});

export default mongoose.model("UserEncryption", UserEncryption);
