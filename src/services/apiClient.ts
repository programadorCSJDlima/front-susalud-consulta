const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8085'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type RequestOptions = {
  headers?: Record<string, string>
  query?: Record<string, string | number | boolean | undefined>
  body?: unknown
}

const buildUrl = (path: string, query?: RequestOptions['query']) => {
  const url = new URL(path, API_BASE_URL)
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined) return
      url.searchParams.set(key, String(value))
    })
  }
  return url.toString()
}

const request = async <T>(method: HttpMethod, path: string, options: RequestOptions = {}) => {
  const url = buildUrl(path, options.query)
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...options.headers,
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
  }

  if (options.body !== undefined) {
    headers['Content-Type'] = 'application/json'
    fetchOptions.body = JSON.stringify(options.body)
  }

  const response = await fetch(url, fetchOptions)

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Error ${response.status} al consumir la API`)
  }

  if (response.status === 204) {
    return null as T
  }

  const contentType = response.headers.get('Content-Type') || ''
  if (contentType.includes('application/json')) {
    return (await response.json()) as T
  }

  return (await response.text()) as T
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) => request<T>('GET', path, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>('POST', path, { ...options, body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>('PUT', path, { ...options, body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>('PATCH', path, { ...options, body }),
  delete: <T>(path: string, options?: RequestOptions) => request<T>('DELETE', path, options),
}

export type ApiClient = typeof apiClient
