import React, { useContext, useReducer } from "react";
import PropertyContext from "../myApp/context/PropertyContext";
import UserContext from "../myApp/context/UserContext";
import PropertyReducer from "../myApp/store/PropertyReducer";
import ProductList from "./ProductList";
import SelectedProductList from "./SelectedProductList";
import { useLocation } from "react-router-dom";

const Home = () => {
    const location = useLocation();
    const { userDeleted } = location.state || false;
    const [propertyContextValue, setPropertyContextValue] = useReducer(
        PropertyReducer,
        {
            products: [],
            productsLoading: true,
            selectedIds: [],
            selectedProducts: [],
            error: "",
            lowestPrice: function () {
                if (this.selectedProducts.length > 0) {
                    return Math.min(
                        ...this.selectedProducts.map((obj) => obj.prize_czk)
                    );
                } else {
                    return 0;
                }
            },
            highestFloorArea: function () {
                if (this.selectedProducts.length > 0) {
                    return Math.max(
                        ...this.selectedProducts.map((obj) => obj.building_area)
                    );
                } else {
                    return 0;
                }
            },
            highestLandArea: function () {
                if (this.selectedProducts.length > 0) {
                    return Math.max(
                        ...this.selectedProducts.map((obj) => obj.land_area)
                    );
                } else {
                    return 0;
                }
            },
        }
    );

    return (
        <div className="home__content">
            {userDeleted && <span>User deleted successfully!</span>}
            <PropertyContext.Provider
                value={{
                    state: propertyContextValue,
                    dispatch: setPropertyContextValue,
                }}
            >
                <div className="products__content">
                    <ProductList />
                    <SelectedProductList />
                </div>
            </PropertyContext.Provider>
        </div>
    );
};

export default Home;
