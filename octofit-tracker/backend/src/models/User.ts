import { Schema, model } from 'mongoose';

export interface User {
  name: string;
  email: string;
  role: 'member' | 'coach' | 'admin';
  profile: {
    age: number;
    fitnessGoal: string;
    joinedAt: Date;
  };
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['member', 'coach', 'admin'], required: true },
    profile: {
      age: { type: Number, required: true },
      fitnessGoal: { type: String, required: true },
      joinedAt: { type: Date, required: true },
    },
  },
  { collection: 'users', timestamps: true }
);

export const UserModel = model<User>('User', userSchema);
