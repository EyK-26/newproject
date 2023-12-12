import React, { useContext, useState } from "react";
import PropertyContext from "../myApp/context/PropertyContext";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
    const { state } = useContext(PropertyContext);
    const [iscleared, setIsCleared] = useState(true);
    const navigate = useNavigate();

    const renderedProducts =
        state.products.length > 0
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

    const renderedSearchedProducts =
        state.searchedProducts.length > 0
            ? state.searchedProducts.map((prod) => (
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
            : "No Property found";

    return (
        <div className="products_all">
            <SearchBar setIsCleared={setIsCleared} />
            <ul className="products_all__container">
                {iscleared ? renderedProducts : renderedSearchedProducts}
            </ul>
        </div>
    );
};

export default AllProducts;
