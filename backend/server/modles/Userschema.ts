import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the interface for your user document
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Define the schema for your user document
const userSchema: Schema<IUser> = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Define the model for your user document
const UserModel: Model<IUser> = mongoose.model<IUser>('user', userSchema);

// Create indexes (if needed)
UserModel.createIndexes();
export {IUser}
export default UserModel;
