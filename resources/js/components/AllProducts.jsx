import React, { useContext, useState } from "react";
import PropertyContext from "../myApp/context/PropertyContext";
import SearchBar from "./SearchBar";
import PriceRange from "./PriceRange";
import RenderProduct from "./RenderProduct";

const AllProducts = () => {
    const { state, dispatch } = useContext(PropertyContext);
    const defaultPrice = 7000000;
    const [price, setPrice] = useState(defaultPrice);
    const [iscleared, setIsCleared] = useState(true);

    const handleChange = (e) => {
        if (e.target.name === "search_locality") {
            if (e.target.value !== "") {
                setIsCleared(false);
                dispatch({
                    type: "search/set",
                    payload: e.target.value,
                });
            } else {
                setIsCleared(true);
            }
        } else if (e.target.name === "price_range") {
            setPrice(e.target.value);
        }
    };

    const renderedProducts =
        state.products.length > 0 ? (
            state.products.map((prod) => (
                <RenderProduct key={prod.id} prod={prod} />
            ))
        ) : (
            <span>No Property available at the moment</span>
        );

    const renderedSearchedProducts =
        state.searchedProducts.length > 0 ? (
            state.searchedProducts.map((prod) => (
                <RenderProduct key={prod.id} prod={prod} />
            ))
        ) : (
            <span>No Property available at the moment</span>
        );

    return (
        <div className="products_all">
            <div className="filters">
                <SearchBar
                    setIsCleared={setIsCleared}
                    handleChange={handleChange}
                />
                <PriceRange
                    handleChange={handleChange}
                    price={price}
                    defaultPrice={defaultPrice}
                />
            </div>
            <ul className="products_all__container">
                {iscleared ? renderedProducts : renderedSearchedProducts}
            </ul>
        </div>
    );
};

export default AllProducts;
