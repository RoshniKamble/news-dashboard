import React from 'react';

const SearchFilter = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="search-filter">
      <label>Search Articles:</label>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;
