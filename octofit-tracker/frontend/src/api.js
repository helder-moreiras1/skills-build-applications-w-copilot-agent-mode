const trimmedCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const codespaceName = trimmedCodespaceName || ''
export const isCodespacesApi = Boolean(codespaceName)
export const apiBaseUrl = isCodespacesApi
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getApiUrl(component) {
  return `${apiBaseUrl}/${component}/`
}

export function normalizeRecords(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const paginatedKeys = ['results', 'data', 'items', 'docs']
  const records = paginatedKeys.map((key) => payload[key]).find(Array.isArray)

  return records || []
}