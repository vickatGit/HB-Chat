import mongoose , { Schema } from "mongoose"


const AuthModel: Schema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fcmToken: { type: String },
    username: { type: String, required: true },
    userAvatar: { type: String, default: null },
    userBio: { type: String, default: null },
    followers: { type: Number, default: 0 },
    followings: { type: Number, default: 0 },
  });

  export default mongoose.model("AuthModel",AuthModel)