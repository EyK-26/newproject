import React, { ChangeEvent, FunctionComponent } from "react";

type SearchBarProps = {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    searchTerm: string;
};

const SearchBar: FunctionComponent<SearchBarProps> = ({
    handleChange,
    searchTerm,
}) => {
    return (
        <div className="search_bar">
            <label htmlFor="search">Search for a locality</label>
            <input
                type="text"
                name="search_locality"
                id="search"
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;
