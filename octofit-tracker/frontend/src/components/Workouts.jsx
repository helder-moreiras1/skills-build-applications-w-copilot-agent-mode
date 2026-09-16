import DataView from './DataView.jsx'

const columns = [
  { key: 'title', label: 'Workout' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'durationMinutes', label: 'Minutes' },
  { key: 'description', label: 'Description' },
]

function Workouts() {
  return (
    <DataView
      component="workouts"
      title="Workouts"
      description="Suggested sessions for endurance, strength, mobility, and balanced training."
      columns={columns}
      renderSummary={(records) => records.length > 0
        ? `${Math.round(records.reduce((total, record) => total + (record.durationMinutes || 0), 0) / records.length)} minute average session`
        : 'No workout duration average yet'}
    />
  )
}

export default Workouts