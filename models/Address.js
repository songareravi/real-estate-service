import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

const addressSchema = new Schema({
  location: String,
});

export default mongoose.model('Address', addressSchema);
// export default Property;