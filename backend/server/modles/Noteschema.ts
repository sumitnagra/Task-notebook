import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the interface for your note document
interface INote extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description: string;
  tag: string;
  date: Date;
}

// Define the schema for your note document
const noteSchema: Schema<INote> = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, default: 'General' },
  date: { type: Date, default: Date.now },
});

// Define the model for your note document
const noteModel: Model<INote> = mongoose.model<INote>('note', noteSchema);

export default noteModel;
export {INote}