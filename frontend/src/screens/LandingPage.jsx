import React, { useState } from 'react';
import config from '../constants.js';

const LandingPage = ({ onLogin }) => {
  const [email, setEmail] = useState('user@manifest.build');
  const [password, setPassword] = useState('password');

  const handleDemoLogin = (e) => {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Dog Paws</h1>
        <a 
          href={`${config.BACKEND_URL}/admin`} 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          Admin Panel
        </a>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Manage Your Dog's Life
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Track walks, manage profiles, and keep everything organized in one place. Powered by Manifest.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md max-w-sm mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Try the Demo</h3>
            <form onSubmit={handleDemoLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input 
                  id="email"
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="user@manifest.build"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input 
                  id="password"
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="password"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105"
              >
                Login as Demo User
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
