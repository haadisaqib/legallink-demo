import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full bg-gray-900/70 rounded-xl border border-gray-800 shadow-lg p-8 flex flex-col items-center">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="Stock team"
          className="w-40 h-40 object-cover rounded-full border-4 border-blue-600 mb-6 shadow-md"
        />
        <h1 className="text-3xl font-bold text-white mb-4 text-center">Who We Are</h1>
        <p className="text-lg text-gray-300 text-center mb-2">
          We're just two University of Houston students trying to make the world a better place—one line of code at a time.
        </p>
        <p className="text-gray-400 text-center">
          LegalLink AI is our passion project, built to empower law firms and legal professionals with cutting-edge AI technology. We believe in making legal work more efficient, accessible, and impactful for everyone.
        </p>
      </div>
    </div>
  );
};

export default About; 