import { Schema, model } from 'mongoose';

const propertySchema = new Schema({
  type: String,
  price: Number,
  phone: String,
  email: String,
  description: String,
  location: String,
  googleLocation: String,
  size: String,
  images: [String],
  videos: [String],

});

// const Property = mongoose.model('Property', propertySchema);
export default model('Property', propertySchema);