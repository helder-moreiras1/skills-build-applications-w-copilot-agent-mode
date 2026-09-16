import cors from 'cors';
import express, { type Request, type Response, type Router } from 'express';
import type { Model } from 'mongoose';

import './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/octofitModels.js';

const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const app = express();

app.use(cors());
app.use(express.json());

function collectionRouter<DocumentType>(model: Model<DocumentType>): Router {
  const router = express.Router();

  router.get('/', async (_request: Request, response: Response) => {
    const records = await model.find().lean();
    response.json(records);
  });

  router.post('/', async (request: Request, response: Response) => {
    const record = await model.create(request.body);
    response.status(201).json(record);
  });

  return router;
}

app.get('/', (_request: Request, response: Response) => {
  response.json({
    name: 'OctoFit Tracker API',
    baseUrl,
    endpoints: [
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/',
    ],
  });
});

app.use('/api/users/', collectionRouter(User));
app.use('/api/teams/', collectionRouter(Team));
app.use('/api/activities/', collectionRouter(Activity));
app.use('/api/leaderboard/', collectionRouter(LeaderboardEntry));
app.use('/api/workouts/', collectionRouter(Workout));

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening at ${baseUrl}`);
});