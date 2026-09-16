# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application. It uses Vite, Bootstrap, and `react-router-dom` to navigate between users, teams, activities, leaderboard, and workouts views.

## Environment

Define `VITE_CODESPACE_NAME` before running the frontend in Codespaces so API requests target the forwarded backend URL:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

For local development, add it to `octofit-tracker/frontend/.env.local`:

```text
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, API endpoints use `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`. If it is unset, the app safely falls back to `http://localhost:8000/api/[component]/` instead of generating an `undefined` Codespaces URL.
