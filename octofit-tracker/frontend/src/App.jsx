import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiBaseUrl, codespaceName, isCodespacesApi } from './api.js'
import logoUrl from '../../../docs/octofitapp-small.png'
import './App.css'

const navigation = [
  { path: '/users', label: 'Users' },
  { path: '/teams', label: 'Teams' },
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-lockup">
          <img src={logoUrl} alt="OctoFit Tracker" className="app-logo" />
          <div>
            <p className="eyebrow">OctoFit Tracker</p>
            <h1>Fitness teams, activity, and competition in one place.</h1>
          </div>
        </div>

        <div className="api-status" role="status">
          <span className={isCodespacesApi ? 'status-dot online' : 'status-dot local'}></span>
          <div>
            <strong>{isCodespacesApi ? codespaceName : 'Local API fallback'}</strong>
            <span>{apiBaseUrl}</span>
          </div>
        </div>
      </header>

      <nav className="nav nav-pills app-nav" aria-label="OctoFit sections">
        {navigation.map((item) => (
          <NavLink key={item.path} className="nav-link" to={item.path}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
