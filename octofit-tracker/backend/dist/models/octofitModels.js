import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'student' },
    team: { type: String, default: '' },
}, { timestamps: true });
const teamSchema = new Schema({
    name: { type: String, required: true },
    mascot: { type: String, default: '' },
    memberCount: { type: Number, default: 0 },
}, { timestamps: true });
const activitySchema = new Schema({
    user: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    points: { type: Number, required: true },
    loggedAt: { type: Date, default: Date.now },
}, { timestamps: true });
const leaderboardSchema = new Schema({
    name: { type: String, required: true },
    team: { type: String, default: '' },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
}, { timestamps: true });
const workoutSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, default: 'beginner' },
    durationMinutes: { type: Number, required: true },
}, { timestamps: true });
export const User = model('User', userSchema);
export const Team = model('Team', teamSchema);
export const Activity = model('Activity', activitySchema);
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardSchema);
export const Workout = model('Workout', workoutSchema);
