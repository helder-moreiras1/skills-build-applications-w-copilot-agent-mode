import DataView from './DataView.jsx'

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'mascot', label: 'Mascot' },
  { key: 'memberCount', label: 'Members' },
]

function Teams() {
  return (
    <DataView
      component="teams"
      title="Teams"
      description="Team rosters and identities for friendly fitness challenges."
      columns={columns}
      renderSummary={(records) => `${records.reduce((total, record) => total + (record.memberCount || 0), 0)} total members`}
    />
  )
}

export default Teams