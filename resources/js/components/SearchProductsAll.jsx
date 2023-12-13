import React, { useCallback, useContext, useEffect, useState } from "react";
import PropertyContext from "../myApp/context/PropertyContext";
import SearchBar from "./SearchBar";
import PriceRange from "./PriceRange";
import RenderProduct from "./RenderProduct";
import axios from "axios";

const SearchProductsAll = () => {
    const { state, dispatch } = useContext(PropertyContext);
    const defaultPrice = 7000000;
    const [price, setPrice] = useState(defaultPrice);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchSearchProducts = useCallback(async () => {
        try {
            const response = await axios.get(
                "https://estate-comparison.codeboot.cz/list.php"
            );
            dispatch({
                type: "searchedProducts/set",
                payload: response.data,
            });
        } catch (err) {
            dispatch({
                type: "error/set",
                payload: err.response,
            });
        }
    }, [dispatch]);

    useEffect(() => {
        if (!state.searchedProducts.length) fetchSearchProducts();
    }, [fetchSearchProducts]);

    const handleChange = (e) => {
        if (e.target.name === "search_locality") {
            setSearchTerm(e.target.value);
            dispatch({
                type: "location/set",
                payload: e.target.value,
            });
        }
        if (e.target.name === "price_range") {
            setPrice(e.target.value);
            dispatch({
                type: "price/set",
                payload: e.target.value,
            });
        }
    };

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
                    handleChange={handleChange}
                    searchTerm={searchTerm}
                />
                <PriceRange
                    handleChange={handleChange}
                    price={price}
                    defaultPrice={defaultPrice}
                />
            </div>
            <ul className="products_all__container">
                {!state.error && renderedSearchedProducts}
            </ul>
        </div>
    );
};

export default SearchProductsAll;
