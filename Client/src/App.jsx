import { useState } from 'react'
import './App.css'
import UrlShortener from './components/UrlShortener'
import UrlStats from './components/UrlStats'
import Header from './components/Header'

function App() {
  const [activeTab, setActiveTab] = useState('shorten')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-md">
              <button
                onClick={() => setActiveTab('shorten')}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  activeTab === 'shorten'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                Shorten URL
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  activeTab === 'stats'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                URL Statistics
              </button>
            </div>
          </div>

          {activeTab === 'shorten' && <UrlShortener />}
          {activeTab === 'stats' && <UrlStats />}
        </div>
      </div>
    </div>
  )
}

export default App
