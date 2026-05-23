import { Schema, model } from 'mongoose';

export interface LeaderboardEntry {
  userEmail: string;
  teamName: string;
  points: number;
  rank: number;
}

const leaderboardSchema = new Schema<LeaderboardEntry>(
  {
    userEmail: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
  { collection: 'leaderboard', timestamps: true }
);

export const LeaderboardModel = model<LeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
