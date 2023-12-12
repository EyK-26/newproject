import React from "react";

const PriceRange = ({ handleChange }) => {
    return (
        <div className="price_range__container">
            <label htmlFor="price_range">Price Range</label>
            <input
                type="range"
                min={1}
                max={10000000}
                step={1}
                defaultValue={10000000}
                name="price_range"
                className="price_range"
                id="price_range"
                onChange={handleChange}
            />
        </div>
    );
};

export default PriceRange;
