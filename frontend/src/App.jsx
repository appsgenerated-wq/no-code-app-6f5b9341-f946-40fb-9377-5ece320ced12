import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService.js';
import config from './constants.js';
import './index.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [dogs, setDogs] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const manifest = new Manifest({
    baseURL: config.BACKEND_URL,
    appId: config.APP_ID
  });

  useEffect(() => {
    const initializeApp = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const connectionResult = await testBackendConnection();
      setBackendConnected(connectionResult.success);

      if (connectionResult.success) {
        console.log('✅ [APP] Backend connection successful.');
        try {
          const user = await manifest.from('User').me();
          setCurrentUser(user);
          setCurrentScreen('dashboard');
        } catch (error) {
          console.log('No active session found.');
          setCurrentUser(null);
          setCurrentScreen('landing');
        }
      } else {
        console.error('❌ [APP] Backend connection failed:', connectionResult.error);
      }
      setIsLoading(false);
    };

    initializeApp();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const user = await manifest.from('User').me();
      setCurrentUser(user);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setCurrentUser(null);
    setDogs([]);
    setCurrentScreen('landing');
  };

  const loadDogs = async () => {
    if (!currentUser) return;
    try {
      const response = await manifest.from('Dog').find({
        filter: { owner: currentUser.id },
        sort: { createdAt: 'desc' },
        include: ['owner']
      });
      setDogs(response.data);
    } catch (error) {
      console.error('Failed to load dogs:', error);
    }
  };

  const createDog = async (dogData, file) => {
    try {
      let photoId = null;
      if (file) {
        const uploadedFile = await manifest.from('File').upload(file);
        photoId = uploadedFile.id;
      }
      const newDog = await manifest.from('Dog').create({ ...dogData, photo: photoId });
      setDogs([newDog, ...dogs]);
    } catch (error) {
      console.error('Failed to create dog:', error);
    }
  };

  const deleteDog = async (dogId) => {
    try {
      await manifest.from('Dog').delete(dogId);
      setDogs(dogs.filter(dog => dog.id !== dogId));
    } catch (error) {
      console.error('Failed to delete dog:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading Application...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className={`fixed top-4 right-4 flex items-center gap-2 p-2 rounded-full text-xs font-medium ${backendConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
         <span className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
         {backendConnected ? 'Backend Connected' : 'Backend Disconnected'}
      </div>

      {currentScreen === 'landing' || !currentUser ? (
        <LandingPage onLogin={handleLogin} />
      ) : (
        <DashboardPage
          user={currentUser}
          dogs={dogs}
          onLogout={handleLogout}
          onLoadDogs={loadDogs}
          onCreateDog={createDog}
          onDeleteDog={deleteDog}
        />
      )}
    </div>
  );
}

export default App;
