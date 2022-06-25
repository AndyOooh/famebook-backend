import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Event', eventSchema);
