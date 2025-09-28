import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, dogs, onLogout, onLoadDogs, onCreateDog, onDeleteDog }) => {
  const [newDogData, setNewDogData] = useState({ name: '', breed: '', age: '', bio: '' });
  const [photoFile, setPhotoFile] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    onLoadDogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDogData({ ...newDogData, [name]: value });
  };

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleCreateDog = async (e) => {
    e.preventDefault();
    const dogDataWithNumberAge = { ...newDogData, age: parseInt(newDogData.age, 10) || 0 };
    await onCreateDog(dogDataWithNumberAge, photoFile);
    setNewDogData({ name: '', breed: '', age: '', bio: '' });
    setPhotoFile(null);
    setIsFormVisible(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dog Paws Dashboard</h1>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600">Welcome, <span className="font-medium">{user.name}</span>!</p>
            <a 
              href={`${config.BACKEND_URL}/admin`} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              Admin
            </a>
            <button 
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Your Dogs</h2>
          <button 
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            {isFormVisible ? 'Cancel' : 'Add New Dog'}
          </button>
        </div>

        {isFormVisible && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-lg font-semibold mb-4">New Dog Profile</h3>
            <form onSubmit={handleCreateDog} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" name="name" placeholder="Name" value={newDogData.name} onChange={handleInputChange} className="w-full p-2 border rounded-md" required />
              <input type="text" name="breed" placeholder="Breed" value={newDogData.breed} onChange={handleInputChange} className="w-full p-2 border rounded-md" required />
              <input type="number" name="age" placeholder="Age" value={newDogData.age} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
              <div className="md:col-span-2">
                <textarea name="bio" placeholder="Bio" value={newDogData.bio} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                <input type="file" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
              </div>
              <div className="md:col-span-2 text-right">
                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700">Save Dog</button>
              </div>
            </form>
          </div>
        )}

        {dogs.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-lg shadow-md">
            <p className="text-gray-500">You haven't added any dogs yet. Click 'Add New Dog' to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dogs.map(dog => (
              <div key={dog.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                <img src={dog.photo?.thumbnail || 'https://placehold.co/600x400/e2e8f0/e2e8f0'} alt={dog.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">{dog.name}</h3>
                  <p className="text-sm text-gray-600">{dog.breed}</p>
                  <p className="text-xs text-gray-500">Age: {dog.age}</p>
                  <p className="text-sm text-gray-700 mt-2 h-16 overflow-hidden">{dog.bio}</p>
                </div>
                <div className="p-4 bg-gray-50 text-right">
                   <button onClick={() => onDeleteDog(dog.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
