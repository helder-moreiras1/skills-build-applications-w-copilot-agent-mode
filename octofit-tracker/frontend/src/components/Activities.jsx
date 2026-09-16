import DataView from './DataView.jsx'

const columns = [
  { key: 'user', label: 'User' },
  { key: 'type', label: 'Activity' },
  { key: 'durationMinutes', label: 'Minutes' },
  { key: 'points', label: 'Points' },
  {
    key: 'loggedAt',
    label: 'Logged',
    render: (record) => record.loggedAt ? new Date(record.loggedAt).toLocaleDateString() : '',
  },
]

function Activities() {
  return (
    <DataView
      component="activities"
      title="Activities"
      description="Recent workouts and movement logs that contribute to team standings."
      columns={columns}
      renderSummary={(records) => `${records.reduce((total, record) => total + (record.points || 0), 0)} activity points earned`}
    />
  )
}

export default Activities