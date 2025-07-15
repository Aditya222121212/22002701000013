import React, { useState } from 'react'

function UrlStats() {
  const [shortId, setShortId] = useState('')
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!shortId.trim()) return

    setLoading(true)
    setError('')
    setStats(null)

    try {
      const response = await fetch(`http://localhost:3000/shorturls/${shortId.trim()}`)
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Something went wrong')
      }
      const data = await response.json()
      setStats(data)
    } catch (error) {
      setError(error.message || 'Failed to connect to server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const getClicksToday = () => {
    if (!stats?.visitHistory) return 0

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return stats.visitHistory.filter(visit => {
      const visitDate = new Date(visit.timestamp)
      return visitDate >= today
    }).length
  }

  const getClicksThisWeek = () => {
    if (!stats?.visitHistory) return 0

    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)

    return stats.visitHistory.filter(visit => {
      const visitDate = new Date(visit.timestamp)
      return visitDate >= weekAgo
    }).length
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        URL Statistics
      </h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex space-x-4">
          <input
            type="text"
            value={shortId}
            onChange={(e) => setShortId(e.target.value)}
            placeholder="Enter short code (e.g., abc123)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
          <button
            type="submit"
            disabled={loading || !shortId.trim()}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium rounded-lg transition-colors"
          >
            {loading ? 'Loading...' : 'Get Stats'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {stats && (
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              URL Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Original URL:
                </label>
                <a
                  href={stats.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 break-all"
                >
                  {stats.originalUrl}
                </a>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Created:
                </label>
                <p className="text-gray-800">{formatDate(stats.createdAt)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Expires:
                </label>
                <p className="text-gray-800">
                  {stats.expiry ? formatDate(stats.expiry) : 'Never'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Status:
                </label>
                <p className={`font-medium ${
                  new Date() > new Date(stats.expiry)
                    ? 'text-red-600'
                    : 'text-green-600'
                }`}>
                  {new Date() > new Date(stats.expiry) ? 'Expired' : 'Active'}
                </p>
              </div>
            </div>
          </div>

          {/* Click Statistics */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stats.totalClicks}
              </div>
              <div className="text-blue-800 font-medium">Total Clicks</div>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {getClicksToday()}
              </div>
              <div className="text-green-800 font-medium">Clicks Today</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {getClicksThisWeek()}
              </div>
              <div className="text-purple-800 font-medium">Clicks This Week</div>
            </div>
          </div>

          {/* Visit History */}
          {stats.visitHistory && stats.visitHistory.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Visits
              </h3>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {stats.visitHistory
                  .sort((a, b) => b.timestamp - a.timestamp)
                  .slice(0, 20)
                  .map((visit, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 px-4 bg-white rounded border"
                    >
                      <span className="text-gray-800">
                        Visit #{stats.visitHistory.length - index}
                      </span>
                      <span className="text-gray-600 text-sm">
                        {formatDate(visit.timestamp)}
                      </span>
                    </div>
                  ))}
              </div>
              {stats.visitHistory.length > 20 && (
                <p className="text-gray-500 text-sm mt-4 text-center">
                  Showing 20 most recent visits out of {stats.visitHistory.length} total
                </p>
              )}
            </div>
          )}

          {stats.visitHistory && stats.visitHistory.length === 0 && (
            <div className="bg-yellow-50 rounded-lg p-6 text-center">
              <p className="text-yellow-800">
                This URL hasn't been visited yet.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default UrlStats
