import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

// User Schema (Only one admin exists)
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
export default mongoose.model("User", UserSchema);

// export default Property;