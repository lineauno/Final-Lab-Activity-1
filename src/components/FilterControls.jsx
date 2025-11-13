import React from 'react';

function FilterControls({ mediaTypes, selectedType, onSelectType }) {
  return (
    <div className="filter-controls">
      {mediaTypes.map(type => (
        <button
          key={type}
          onClick={() => onSelectType(type)}
          className={`filter-button ${selectedType === type ? 'selected' : ''}`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

export default FilterControls;