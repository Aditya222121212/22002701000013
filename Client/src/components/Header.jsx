import React from 'react'

function Header() {
  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
             URL Shortener
          </h1>
          <p className="text-gray-600 text-lg">
            Create short, memorable links that work for you
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header
