import React from "react";
import "./styles/SearchBar.css";

const SearchBar = ({ search, setSearch, filter, setFilter }) => {
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Cerca..."
        className="searchInput"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="select"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">Tutti i filtri</option>
        <option value="Gruppo A">Gruppo A</option>
        <option value="Gruppo B">Gruppo B</option>
        <option value="Gruppo C">Gruppo C</option>
      </select>
    </div>
  );
};

export default SearchBar;
