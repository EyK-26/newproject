import React, { useReducer } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import PropertyContext from "../myApp/context/PropertyContext";
import PropertyReducer from "../myApp/store/PropertyReducer";

const Layout = () => {
    const [propertyContextValue, setPropertyContextValue] = useReducer(
        PropertyReducer,
        {
            products: [],
            productsLoading: true,
            selectedIds: [],
            selectedProducts: [],
            error: "",
            searchedProducts: [],
            searchedProductsLoading: true,
            lowestPrice: function () {
                return this.selectedProducts.length > 0
                    ? Math.min(
                          ...this.selectedProducts.map((obj) => obj.prize_czk)
                      )
                    : 0;
            },
            highestFloorArea: function () {
                return this.selectedProducts.length > 0
                    ? Math.max(
                          ...this.selectedProducts.map(
                              (obj) => obj.building_area
                          )
                      )
                    : 0;
            },
            highestLandArea: function () {
                return this.selectedProducts.length > 0
                    ? Math.max(
                          ...this.selectedProducts.map((obj) => obj.land_area)
                      )
                    : 0;
            },
        }
    );

    return (
        <>
            <Header />
            <PropertyContext.Provider
                value={{
                    state: propertyContextValue,
                    dispatch: setPropertyContextValue,
                }}
            >
                <div className="content">
                    <Outlet />
                </div>
            </PropertyContext.Provider>
            <Footer />
        </>
    );
};

export default Layout;
