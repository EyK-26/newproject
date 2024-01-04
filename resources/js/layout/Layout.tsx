import React, { useReducer, FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import PropertyContext from "../myApp/context/PropertyContext";
import PropertyReducer, { CustomProduct } from "../myApp/store/PropertyReducer";

const Layout: FunctionComponent = () => {
    const [propertyContextValue, setPropertyContextValue] = useReducer(
        PropertyReducer,
        {
            customProducts: [],
            customProductsLoading: true,
            selectedCustomProducts: [],
            selectedCustomProductIds: [],
            searchedCustomProducts: [],
            searchedCustomProductsLoading: true,
            error: "",
            lowestPrice: function (): number {
                return this.selectedCustomProducts.length > 0
                    ? Math.min(
                          ...this.selectedCustomProducts.map(
                              (obj: CustomProduct) => obj.price
                          )
                      )
                    : 0;
            },
            highestFloorArea: function (): number {
                return this.selectedCustomProducts.length > 0
                    ? Math.max(
                          ...this.selectedCustomProducts.map(
                              (obj: CustomProduct) => obj.floor_area
                          )
                      )
                    : 0;
            },
            highestLandArea: function (): number {
                return this.selectedCustomProducts.length > 0
                    ? Math.max(
                          ...this.selectedCustomProducts.map(
                              (obj: CustomProduct) => obj.land_area
                          )
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
