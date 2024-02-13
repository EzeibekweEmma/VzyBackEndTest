import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  createdAt: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IUser>('User', userSchema);
