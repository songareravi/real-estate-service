import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

const propertySchema = new Schema({
  type: String,
  price: Number,
  phone: String,
  email: String,
  description: String,
  location: String,
  googleLocation: String,
  rentOrSell:String,
  size: String,
  images: [String],
  videos: [String],
});

export default mongoose.model('Property', propertySchema);
// export default Property;