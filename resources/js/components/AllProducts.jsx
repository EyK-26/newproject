import React, { useContext } from "react";
import PropertyContext from "../myApp/context/PropertyContext";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
    const { state } = useContext(PropertyContext);
    const navigate = useNavigate();

    const renderedProducts = state.productsLoading
        ? "Loading Properties..."
        : !state.error && state.products.length > 0
        ? state.products.map((prod) => (
              <li
                  key={prod.id}
                  className="product"
                  onClick={() => navigate(`/prod_view/${prod.id}`)}
              >
                  <img src={prod.images[0]} alt={prod.name_extracted} />
                  <div className="name__container">
                      <div className="name_container--spans">
                          <span>{prod.name_extracted}</span>
                          <span>{prod.locality}</span>
                      </div>
                      <div className="price">{prod.prize_czk} CZK</div>
                  </div>
              </li>
          ))
        : "No Property available at the moment";

    return (
        <div className="products_all">
            <SearchBar />
            <ul className="products_all__container">{renderedProducts}</ul>
        </div>
    );
};

export default AllProducts;
