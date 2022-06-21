import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileImageUrl: { type: String },
  coverImageUrl: { type: String },
  //   events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
});

export default mongoose.model('User', userSchema);
