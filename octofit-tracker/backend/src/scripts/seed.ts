import mongoose from 'mongoose';

import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/octofitModels.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await Team.insertMany([
      { name: 'Octo Sprinters', mascot: 'Flash the Octopus', memberCount: 4 },
      { name: 'Core Crushers', mascot: 'Captain Crunch', memberCount: 3 },
      { name: 'Cardio Kraken', mascot: 'Krak the Runner', memberCount: 5 },
    ]);

    await User.insertMany([
      { name: 'Maya Chen', email: 'maya.chen@example.com', role: 'student', team: 'Octo Sprinters' },
      { name: 'Jordan Smith', email: 'jordan.smith@example.com', role: 'student', team: 'Core Crushers' },
      { name: 'Priya Patel', email: 'priya.patel@example.com', role: 'coach', team: 'Cardio Kraken' },
      { name: 'Lucas Garcia', email: 'lucas.garcia@example.com', role: 'student', team: 'Octo Sprinters' },
    ]);

    await Activity.insertMany([
      { user: 'Maya Chen', type: 'Trail run', durationMinutes: 42, points: 120, loggedAt: new Date('2026-09-10T14:30:00Z') },
      { user: 'Jordan Smith', type: 'Strength circuit', durationMinutes: 35, points: 95, loggedAt: new Date('2026-09-11T19:00:00Z') },
      { user: 'Priya Patel', type: 'Cycling intervals', durationMinutes: 50, points: 135, loggedAt: new Date('2026-09-12T12:15:00Z') },
      { user: 'Lucas Garcia', type: 'Yoga mobility', durationMinutes: 30, points: 70, loggedAt: new Date('2026-09-13T16:45:00Z') },
    ]);

    await LeaderboardEntry.insertMany([
      { name: 'Priya Patel', team: 'Cardio Kraken', points: 135, rank: 1 },
      { name: 'Maya Chen', team: 'Octo Sprinters', points: 120, rank: 2 },
      { name: 'Jordan Smith', team: 'Core Crushers', points: 95, rank: 3 },
      { name: 'Lucas Garcia', team: 'Octo Sprinters', points: 70, rank: 4 },
    ]);

    await Workout.insertMany([
      {
        title: 'Beginner Full Body Reset',
        description: 'A balanced mix of bodyweight squats, incline pushups, hip hinges, and stretching.',
        difficulty: 'beginner',
        durationMinutes: 25,
      },
      {
        title: 'Lunch Break HIIT',
        description: 'Short rounds of jumping jacks, mountain climbers, lunges, and plank holds.',
        difficulty: 'intermediate',
        durationMinutes: 18,
      },
      {
        title: 'Endurance Builder Ride',
        description: 'A steady cycling workout with cadence drills and two controlled sprint blocks.',
        difficulty: 'advanced',
        durationMinutes: 45,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
