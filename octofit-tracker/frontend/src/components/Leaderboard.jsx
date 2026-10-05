import DataView from './DataView.jsx'

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'name', label: 'Name' },
  { key: 'team', label: 'Team' },
  { key: 'points', label: 'Points' },
]

function Leaderboard() {
  return (
    <DataView
      component="leaderboard"
      title="Leaderboard"
      description="Current competitive standings ranked by total OctoFit points."
      columns={columns}
      renderSummary={(records) => records[0] ? `${records[0].name} leads with ${records[0].points} points` : 'No leader yet'}
    />
  )
}

export default Leaderboard