import axios from "axios";
import React, { useCallback, useContext, useEffect } from "react";
import PropertyContext from "../myApp/context/PropertyContext";

const ProductList = () => {
    const { state, dispatch } = useContext(PropertyContext);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get(
                "https://estate-comparison.codeboot.cz/list.php"
            );
            dispatch({
                type: "products/set",
                payload: response.data,
            });
        } catch (err) {
            dispatch({
                type: "error/set",
                payload: err.response,
            });
        }
    }, [dispatch]);

    const addToCompare = (id) => {
        if (state.selectedIds.indexOf(id) === -1) {
            dispatch({
                type: "id/add",
                payload: id,
            });
        } else {
            dispatch({
                type: "id/remove",
                payload: id,
            });
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const renderedProducts = state.productsLoading
        ? "Loading Properties..."
        : !state.error && state.products.length > 0
        ? state.products.map((prod) => (
              <li
                  key={prod.id}
                  onClick={addToCompare.bind(null, prod.id)}
                  className={
                      state.selectedIds.includes(prod.id)
                          ? "product selected"
                          : "product"
                  }
              >
                  <img src={prod.images[0]} alt={prod.name_extracted} />
                  <div className="name__container">
                      <span>{prod.name_extracted}</span>
                      <span>{prod.locality}</span>
                  </div>
              </li>
          ))
        : "No Property available at the moment";

    return (
        <div className="product_list--container">
            <h2>Click to compare properties.</h2>
            <ul className="product_list">{renderedProducts}</ul>
        </div>
    );
};

export default ProductList;
