import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    password: {
      type: String,
      required: true,
    },
    nivelUser: {
        type: Number,    //0 = comomn /  1 = admin
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
