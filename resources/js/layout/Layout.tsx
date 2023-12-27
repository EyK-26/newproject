import React, { useReducer, FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import PropertyContext from "../myApp/context/PropertyContext";
import PropertyReducer, { Product } from "../myApp/store/PropertyReducer";

const Layout: FunctionComponent = () => {
    const [propertyContextValue, setPropertyContextValue] = useReducer(
        PropertyReducer,
        {
            customProducts: [],
            selectedCustomProducts: [],
            selectedCustomProductIds: [],
            products: [],
            productsLoading: true,
            selectedIds: [],
            selectedProducts: [],
            error: "",
            searchedProducts: [],
            searchedProductsLoading: true,
            lowestPrice: function (): number {
                return this.selectedProducts.length > 0
                    ? Math.min(
                          ...this.selectedProducts.map(
                              (obj: Product) => obj.prize_czk
                          )
                      )
                    : 0;
            },
            highestFloorArea: function (): number {
                return this.selectedProducts.length > 0
                    ? Math.max(
                          ...this.selectedProducts.map(
                              (obj: Product) => obj.building_area
                          )
                      )
                    : 0;
            },
            highestLandArea: function (): number {
                return this.selectedProducts.length > 0
                    ? Math.max(
                          ...this.selectedProducts.map(
                              (obj: Product) => obj.land_area
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
