import React from "react";

const SearchBar = () => {
    return (
        <div className="search_bar">
            <label htmlFor="search">Search for a locality </label>
            <input type="text" name="search" id="search" />
        </div>
    );
};

export default SearchBar;
