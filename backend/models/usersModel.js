import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, required: true, default: false },
  password: { type: String, required: true },
  books: [],
});
export const User = mongoose.model("User", userSchema);
