import React, { useContext, useEffect, useReducer } from "react";
import PropertyContext from "../myApp/context/PropertyContext";
import UserContext from "../myApp/context/UserContext";
import PropertyReducer from "../myApp/store/PropertyReducer";
import ProductList from "./ProductList";
import SelectedProductList from "./SelectedProductList";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
    const { state: locationState, pathname, history } = useLocation();
    const navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext);
    const { userDeleted, userRegistered, userLoggedIn, userLoggedOut } =
        locationState || false;
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

    useEffect(() => {
        if (locationState) {
            dispatch({
                type: "spanMessage/set",
                payload:
                    userRegistered ||
                    userLoggedIn ||
                    userLoggedOut ||
                    userDeleted,
            });
            navigate(pathname, { state: null });
        }
    }, [locationState]);

    return (
        <div className="home__content">
            {state.spanMessage && (
                <span className="span_message">{state.spanMessage}</span>
            )}
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
