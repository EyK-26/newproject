import React, { useContext } from "react";
import PropertyContext from "../myApp/context/PropertyContext";

const SearchBar = ({ setIsCleared }) => {
    const { dispatch } = useContext(PropertyContext);
    
    const handleChange = (e) => {
        if (e.target.value !== "") {
            setIsCleared(false);
            dispatch({
                type: "search/set",
                payload: e.target.value,
            });
        } else {
            setIsCleared(true);
        }
    };

    return (
        <div className="search_bar">
            <label htmlFor="search">Search for a locality</label>
            <input
                type="text"
                name="search"
                id="search"
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;
