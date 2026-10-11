import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Homepage
      </Link>
    </div>
  )
}

export default NotFoundPage
