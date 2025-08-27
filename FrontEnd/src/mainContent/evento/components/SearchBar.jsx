import React, { useState } from "react";
import "../styles/SearchBar.css";

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
              type="number"
              name="minPartecipanti"
              value={filters.minPartecipanti}
              onChange={handleChange}
              className="F-input"
            />
          </label>
          <label>
            Max partecipanti:
            <input
              type="number"
              name="maxPartecipanti"
              value={filters.maxPartecipanti}
              onChange={handleChange}
              className="F-input"
              min={1}
            />
          </label>
          <label>
            Dal:
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
              className="F-input"
              min={1}
            />
          </label>
          <label>
            Al:
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
              className="F-input"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default SearchBar;