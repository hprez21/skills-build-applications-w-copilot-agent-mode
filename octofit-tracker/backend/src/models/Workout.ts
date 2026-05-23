import { Schema, model } from 'mongoose';

export interface Workout {
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  focusArea: string;
  durationMinutes: number;
  suggestedForGoal: string;
}

const workoutSchema = new Schema<Workout>(
  {
    title: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    focusArea: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    suggestedForGoal: { type: String, required: true },
  },
  { collection: 'workouts', timestamps: true }
);

export const WorkoutModel = model<Workout>('Workout', workoutSchema);
