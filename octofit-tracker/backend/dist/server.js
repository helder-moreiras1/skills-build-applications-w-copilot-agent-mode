import cors from 'cors';
import express from 'express';
import './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/octofitModels.js';
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : `http://localhost:${port}`;
const app = express();
app.use(cors());
app.use(express.json());
function collectionRouter(model) {
    const router = express.Router();
    router.get('/', async (_request, response) => {
        const records = await model.find().lean();
        response.json(records);
    });
    router.post('/', async (request, response) => {
        const record = await model.create(request.body);
        response.status(201).json(record);
    });
    return router;
}
app.get('/', (_request, response) => {
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
