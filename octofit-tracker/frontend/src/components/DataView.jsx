import { useEffect, useState } from 'react'
import { getApiUrl, normalizeRecords } from '../api.js'

function DataView({ component, title, description, columns, renderSummary }) {
  const [records, setRecords] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      try {
        setStatus('loading')
        setError('')

        const response = await fetch(getApiUrl(component), {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`API request failed with HTTP ${response.status}`)
        }

        const payload = await response.json()
        setRecords(normalizeRecords(payload))
        setStatus('success')
      } catch (requestError) {
        if (requestError.name === 'AbortError') {
          return
        }

        setError(requestError.message)
        setStatus('error')
      }
    }

    loadRecords()

    return () => controller.abort()
  }, [component])

  return (
    <section className="data-view">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{component}</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <span className="record-count">{records.length} records</span>
      </div>

      {status === 'loading' && <div className="alert alert-info">Loading {title.toLowerCase()}...</div>}
      {status === 'error' && <div className="alert alert-danger">{error}</div>}
      {status === 'success' && records.length === 0 && (
        <div className="alert alert-warning">No {title.toLowerCase()} found.</div>
      )}

      {status === 'success' && records.length > 0 && (
        <div className="table-responsive data-table-wrap">
          <table className="table table-hover align-middle data-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th scope="col" key={column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id || `${component}-${index}`}>
                  {columns.map((column) => (
                    <td key={column.key}>{column.render ? column.render(record) : record[column.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {status === 'success' && renderSummary && (
        <div className="summary-strip">{renderSummary(records)}</div>
      )}
    </section>
  )
}

export default DataView