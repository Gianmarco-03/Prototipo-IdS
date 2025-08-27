import React, { useState } from "react";

const SearchBar = ({ search, setSearch, filters, setFilters }) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Cerca..."
        className="searchInput"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="button"
        className="filterButton"
        onClick={() => setShowFilters((s) => !s)}
      >
        Filtri
      </button>
      {showFilters && (
        <div className="filterMenu">
          <div>
            <input
              type="checkbox"
              name="includeDescription"
              checked={filters.includeDescription}
              onChange={handleChange}
            />
            Cerca nella descrizione
          </div>
          <label>
            Min partecipanti:
            <input
              className="F-input"
              type="number"
              name="minPartecipanti"
              value={filters.minPartecipanti}
              onChange={handleChange}
            />
          </label>
          <label>
            Max partecipanti:
            <input
              className="F-input"
              type="number"
              name="maxPartecipanti"
              value={filters.maxPartecipanti}
              onChange={handleChange}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
