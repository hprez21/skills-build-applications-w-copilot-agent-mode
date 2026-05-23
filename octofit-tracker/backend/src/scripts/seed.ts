import mongoose from 'mongoose';
import { connectToDatabase } from '../config/database';
import { ActivityModel } from '../models/Activity';
import { LeaderboardModel } from '../models/Leaderboard';
import { TeamModel } from '../models/Team';
import { UserModel } from '../models/User';
import { WorkoutModel } from '../models/Workout';

async function seed(): Promise<void> {
  console.log('Seed the octofit_db database with test data');

  await connectToDatabase();

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  await UserModel.insertMany([
    {
      name: 'Maya Chen',
      email: 'maya.chen@example.com',
      role: 'member',
      profile: {
        age: 29,
        fitnessGoal: 'Improve endurance for a half marathon',
        joinedAt: new Date('2026-01-12'),
      },
    },
    {
      name: 'Jordan Rivera',
      email: 'jordan.rivera@example.com',
      role: 'coach',
      profile: {
        age: 34,
        fitnessGoal: 'Build functional strength',
        joinedAt: new Date('2025-11-03'),
      },
    },
    {
      name: 'Avery Patel',
      email: 'avery.patel@example.com',
      role: 'member',
      profile: {
        age: 42,
        fitnessGoal: 'Increase weekly active minutes',
        joinedAt: new Date('2026-02-18'),
      },
    },
  ]);

  await TeamModel.insertMany([
    {
      name: 'Cardio Crew',
      motto: 'Miles together, stronger forever.',
      city: 'Seattle',
      memberCount: 14,
    },
    {
      name: 'Strength Squad',
      motto: 'Lift smart, recover smarter.',
      city: 'Austin',
      memberCount: 11,
    },
    {
      name: 'Trail Blazers',
      motto: 'Every climb counts.',
      city: 'Denver',
      memberCount: 9,
    },
  ]);

  await ActivityModel.insertMany([
    {
      userEmail: 'maya.chen@example.com',
      type: 'run',
      durationMinutes: 48,
      caloriesBurned: 430,
      activityDate: new Date('2026-05-19T07:30:00Z'),
    },
    {
      userEmail: 'jordan.rivera@example.com',
      type: 'strength',
      durationMinutes: 55,
      caloriesBurned: 360,
      activityDate: new Date('2026-05-20T12:15:00Z'),
    },
    {
      userEmail: 'avery.patel@example.com',
      type: 'hike',
      durationMinutes: 92,
      caloriesBurned: 610,
      activityDate: new Date('2026-05-21T15:45:00Z'),
    },
    {
      userEmail: 'maya.chen@example.com',
      type: 'yoga',
      durationMinutes: 35,
      caloriesBurned: 140,
      activityDate: new Date('2026-05-22T06:45:00Z'),
    },
  ]);

  await LeaderboardModel.insertMany([
    {
      userEmail: 'maya.chen@example.com',
      teamName: 'Cardio Crew',
      points: 1840,
      rank: 1,
    },
    {
      userEmail: 'avery.patel@example.com',
      teamName: 'Trail Blazers',
      points: 1615,
      rank: 2,
    },
    {
      userEmail: 'jordan.rivera@example.com',
      teamName: 'Strength Squad',
      points: 1495,
      rank: 3,
    },
  ]);

  await WorkoutModel.insertMany([
    {
      title: 'Tempo Run Builder',
      difficulty: 'intermediate',
      focusArea: 'Cardio endurance',
      durationMinutes: 45,
      suggestedForGoal: 'Improve endurance for a half marathon',
    },
    {
      title: 'Foundational Strength Circuit',
      difficulty: 'beginner',
      focusArea: 'Full-body strength',
      durationMinutes: 30,
      suggestedForGoal: 'Build functional strength',
    },
    {
      title: 'Hill Power Intervals',
      difficulty: 'advanced',
      focusArea: 'Leg power and aerobic capacity',
      durationMinutes: 50,
      suggestedForGoal: 'Increase weekly active minutes',
    },
  ]);

  console.log('Seed complete: users, teams, activities, leaderboard, and workouts created.');
}

seed()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
