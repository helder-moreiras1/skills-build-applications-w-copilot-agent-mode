import DataView from './DataView.jsx'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'team', label: 'Team' },
]

function Users() {
  return (
    <DataView
      component="users"
      title="Users"
      description="Profiles for athletes, coaches, and team members using OctoFit."
      columns={columns}
      renderSummary={(records) => `${records.filter((record) => record.role === 'coach').length} coaches listed`}
    />
  )
}

export default Users