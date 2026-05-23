import { Schema, model } from 'mongoose';

export interface Activity {
  userEmail: string;
  type: 'run' | 'cycle' | 'strength' | 'yoga' | 'hike';
  durationMinutes: number;
  caloriesBurned: number;
  activityDate: Date;
}

const activitySchema = new Schema<Activity>(
  {
    userEmail: { type: String, required: true },
    type: { type: String, enum: ['run', 'cycle', 'strength', 'yoga', 'hike'], required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    activityDate: { type: Date, required: true },
  },
  { collection: 'activities', timestamps: true }
);

export const ActivityModel = model<Activity>('Activity', activitySchema);
