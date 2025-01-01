import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="search-bar flex justify-center items-center pt-6 bg-[#E7E6E6] "
    style={{
      background: 'radial-gradient(50% 50% at 50% 50%, #F2CBCB 0%, #D8CDCD 47.5%, #E7E6E6 86%)',
    }}
    >
      <div className="relative w-full sm:w-96">
        <input
          type="text"
          className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 shadow-lg"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
