import React, { useState, useEffect, useMemo } from 'react';
import MediaCard from './MediaCard';
import FilterControls from './FilterControls';
import AddMediaForm from './AddMediaForm';

const API_BASE_URL = 'http://localhost:8082/api'; 
const AUTH_TOKEN = 'YOUR_LARAVEL_AUTH_TOKEN'; 

const mediaTypes = ['All', 'KDrama', 'Manhwa', 'Book', 'Anime', 'CDrama'];

function MediaTracker() {
  const [mediaItems, setMediaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('All');

  // 1. Fetch Data using native Fetch API
  const fetchMediaItems = () => {
    setIsLoading(true);
    fetch(`${API_BASE_URL}/media`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${AUTH_TOKEN}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        setMediaItems(data);
        setIsLoading(false);
    })
    .catch(error => {
        console.error("Error fetching media items:", error);
        setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchMediaItems();
  }, []);

  const handleItemAdded = (newItem) => {
    setMediaItems([newItem, ...mediaItems]);
  };

  // 2. Filtering Logic
  const filteredItems = useMemo(() => {
    if (selectedType === 'All') {
      return mediaItems;
    }
    return mediaItems.filter(item => item.media_type === selectedType);
  }, [mediaItems, selectedType]);

  if (isLoading) {
    return <div className="app-container" style={{ textAlign: 'center', padding: '50px' }}>Loading Media Library...</div>;
  }

  return (
    <div className="app-container">
      <h1 className="header-title">ESCAPISM TRACKER</h1>
      
      {/* Add New Item Form */}
      <div className="form-section-container">
         <h2 className="form-section-header">Add New Media</h2>
         <AddMediaForm 
             onMediaAdded={handleItemAdded} 
             API_BASE_URL={API_BASE_URL} 
             AUTH_TOKEN={AUTH_TOKEN}
         />
      </div>

      {/* Filter Controls */}
      <FilterControls 
        mediaTypes={mediaTypes}
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />

      {/* Media List Display */}
      <div className="media-list-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <MediaCard key={item.id} item={item} />
          ))
        ) : (
          <p style={{ color: '#718096' }}>No {selectedType !== 'All' ? selectedType : ''} items found.</p>
        )}
      </div>
    </div>
  );
}

export default MediaTracker;