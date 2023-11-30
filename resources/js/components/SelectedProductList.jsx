import React, { useCallback, useContext, useEffect } from "react";
import axios from "axios";
import { ProductDetail } from "./ProductDetail";
import PropertyContext from "../myApp/context/PropertyContext";

const SelectedProductList = () => {
    const { state, dispatch } = useContext(PropertyContext);

    const fetchSelectedProducts = useCallback(() => {
        state.selectedIds.forEach(async (id) => {
            if (!state.selectedProducts.find((prod) => prod.id === id)) {
                try {
                    const response = await axios.get(
                        `https://estate-comparison.codeboot.cz/detail.php?id=${id}`
                    );
                    dispatch({
                        type: "product/add",
                        payload: response.data,
                    });
                } catch (err) {
                    dispatch({
                        type: "error/set",
                        payload: err.response,
                    });
                }
            }
        });
    }, [dispatch, state.selectedIds, state.selectedProducts]);

    useEffect(() => {
        fetchSelectedProducts();
    }, [fetchSelectedProducts]);

    return (
        <div className="selection_container">
            {!state.error &&
                state.selectedProducts.length > 0 &&
                state.selectedProducts.map((prod, idx) => (
                    <ProductDetail key={idx} prod={prod} />
                ))}
        </div>
    );
};

export default SelectedProductList;
