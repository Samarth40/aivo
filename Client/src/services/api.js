// ─── Central API Client ────────────────────────────────────────────────────────
// All backend calls go through this module. Auth token is injected automatically.

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

/**
 * Core fetch wrapper — attaches Bearer token and handles JSON.
 * @param {string} path  - e.g. '/api/analyze'
 * @param {string} token - Clerk JWT
 * @param {object} opts  - fetch options (method, body, etc.)
 */
async function request(path, token, opts = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(opts.headers || {}),
    },
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || `HTTP ${res.status}`)
  }

  return res.json()
}

// ─── User ──────────────────────────────────────────────────────────────────────

export const userApi = {
  /** Sync Clerk user to MongoDB on first login */
  sync: (token) => request('/api/user/sync', token, { method: 'POST' }),

  /** Fetch dashboard stats for the current user */
  getStats: (token) => request('/api/user/stats', token),
}

// ─── Analysis Pipeline ─────────────────────────────────────────────────────────

export const analysisApi = {
  /** Start an analysis job — returns { analysis: { _id, status, ... } } */
  start: (token, url) =>
    request('/api/analyze', token, {
      method: 'POST',
      body: JSON.stringify({ url }),
    }),

  /** Poll a single analysis by ID */
  getById: (token, id) => request(`/api/analyze/${id}`, token),
}

// ─── AI Simulation ─────────────────────────────────────────────────────────────

export const simulationApi = {
  /** Start a simulation job */
  start: (token, payload) =>
    request('/api/simulate', token, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  /** Poll a simulation by ID */
  getById: (token, id) => request(`/api/simulate/${id}`, token),
}

// ─── Competitor Intelligence ───────────────────────────────────────────────────

export const competitorApi = {
  /** Start a competitor analysis job */
  start: (token, targetUrl, competitorUrl) =>
    request('/api/competitor', token, {
      method: 'POST',
      body: JSON.stringify({ targetUrl, competitorUrl }),
    }),

  /** Poll a competitor job by ID */
  getById: (token, id) => request(`/api/competitor/${id}`, token),
}

// ─── LLMs.txt Generator ────────────────────────────────────────────────────────

export const llmsApi = {
  /** Start an llms.txt generation job */
  start: (token, url) =>
    request('/api/llmstxt', token, {
      method: 'POST',
      body: JSON.stringify({ url }),
    }),

  /** Poll an llms.txt job by ID */
  getById: (token, id) => request(`/api/llmstxt/${id}`, token),
}

// ─── Polling Helper ────────────────────────────────────────────────────────────

/**
 * Generic job poller — calls fetchFn every intervalMs until status is terminal.
 * @param {Function} fetchFn       - () => Promise<job>
 * @param {Function} onUpdate      - (job) => void   called on every poll
 * @param {number}   intervalMs    - polling interval (default 2000ms)
 * @returns {Function}             - cancel function
 */
export function pollJob(fetchFn, onUpdate, intervalMs = 2000) {
  const TERMINAL = new Set(['Completed', 'Failed'])
  let stopped = false

  const run = async () => {
    while (!stopped) {
      try {
        const job = await fetchFn()
        onUpdate(job)
        if (TERMINAL.has(job.status)) break
      } catch (e) {
        console.error('[pollJob] error:', e.message)
      }
      await new Promise((r) => setTimeout(r, intervalMs))
    }
  }

  run()
  return () => { stopped = true }
}
