import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-center px-4">
      <h1 className="text-5xl font-bold text-white mb-4">404</h1>
      <p className="text-lg text-gray-400 mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound; 