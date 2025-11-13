import React from 'react';

function getRatingColorClass(rating) {
  if (rating === null || isNaN(parseFloat(rating))) return '';
  const r = parseFloat(rating);
  if (r >= 9.0) return 'rating-high';
  if (r >= 7.0) return 'rating-medium';
  return 'rating-low';
}

function getStatusClass(status) {
    if (!status) return '';
    status = status.toLowerCase();
    if (status.includes('finished') || status.includes('completed')) {
        return 'status-finished';
    }
    if (status.includes('on-going') || status.includes('watching') || status.includes('reading')) {
        return 'status-ongoing';
    }
    if (status.includes('dropped')) {
        return 'status-dropped';
    }
    if (status.includes('on-hold')) {
        return 'status-onhold';
    }
    return ''; 
}

function MediaCard({ item }) {
  const ratingColorClass = getRatingColorClass(item.rating);
  const statusClass = getStatusClass(item.status);
  const displayRating = item.rating ? parseFloat(item.rating).toFixed(1) : 'N/A';
  
  return (
    <div className="media-card">
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span className="media-type-tag">
          {item.media_type}
        </span>
        <div style={{ textAlign: 'right' }}>
          <span className={`status-indicator ${statusClass}`}>
            {item.status}
          </span>
        </div>
      </div>
      
      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', margin: '0 0 5px 0' }}>{item.title}</h3>
      
      <p className={`rating-text ${ratingColorClass}`} style={{ margin: '5px 0 10px 0' }}>
        {displayRating} / 10
      </p>
      
      <div className="text-info">
        {item.author_artist && (
            <p style={{ margin: '0 0 5px 0' }}><span style={{ fontWeight: '600' }}>Author/Artist:</span> {item.author_artist}</p>
        )}
        {item.episode_progress && (
            <p style={{ margin: '0 0 5px 0' }}><span style={{ fontWeight: '600' }}>Progress:</span> {item.episode_progress}</p>
        )}
        {item.genres && (
            <p style={{ margin: '0 0 5px 0', fontSize: '0.8rem' }}><span style={{ fontWeight: '600' }}>Genres:</span> {item.genres}</p>
        )}
        {item.date_finished && (
            <p style={{ margin: '0' }}><span style={{ fontWeight: '600' }}>Finished:</span> {new Date(item.date_finished).toLocaleDateString()}</p>
        )}
      </div>
    </div>
  );
}

export default MediaCard;