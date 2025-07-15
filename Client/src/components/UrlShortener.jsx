import React, { useState } from 'react'

function UrlShortener() {
  const [formData, setFormData] = useState({
    url: '',
    shortcode: '',
    validity: 30
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const requestBody = {
        url: formData.url,
        validity: parseInt(formData.validity)
      }

      if (formData.shortcode.trim()) {
        requestBody.shortcode = formData.shortcode.trim()
      }

      const response = await fetch('http://localhost:3000/shorturls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Something went wrong')
      }

      const data = await response.json()
      setResult(data)
      setFormData({ url: '', shortcode: '', validity: 30 })
    } catch (error) {
      setError(error.message || 'Failed to connect to server. Please try again.')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('Copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Create Short URL
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            Original URL *
          </label>
          <input
            type="url"
            id="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://example.com"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label htmlFor="shortcode" className="block text-sm font-medium text-gray-700 mb-2">
            Custom Short Code (Optional)
          </label>
          <input
            type="text"
            id="shortcode"
            value={formData.shortcode}
            onChange={(e) => setFormData({ ...formData, shortcode: e.target.value })}
            placeholder="my-custom-code"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
          <p className="text-sm text-gray-500 mt-1">
            Leave empty for auto-generated code
          </p>
        </div>

        <div>
          <label htmlFor="validity" className="block text-sm font-medium text-gray-700 mb-2">
            Validity (Minutes)
          </label>
          <select
            id="validity"
            value={formData.validity}
            onChange={(e) => setFormData({ ...formData, validity: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          >
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
            <option value={180}>3 hours</option>
            <option value={360}>6 hours</option>
            <option value={720}>12 hours</option>
            <option value={1440}>1 day</option>
            <option value={10080}>1 week</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          {loading ? 'Creating...' : 'Shorten URL'}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-4">
            URL Created Successfully!
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Short URL:
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={result.shortLink}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-green-300 rounded text-green-800"
                />
                <button
                  onClick={() => copyToClipboard(result.shortLink)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Expires at:
              </label>
              <p className="text-green-800">
                {new Date(result.expiry).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UrlShortener
