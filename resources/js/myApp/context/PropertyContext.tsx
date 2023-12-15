import { Dispatch, createContext } from "react";
import { PropertyAction, PropertyState } from "../store/PropertyReducer";

interface PropertyContextProps {
    state: PropertyState;
    dispatch: Dispatch<PropertyAction>;
}
const initialPropertyContextVal: PropertyContextProps = {
    state: {
        products: [],
        productsLoading: true,
        selectedIds: [],
        selectedProducts: [],
        error: "",
        searchedProducts: [],
        searchedProductsLoading: true,
        lowestPrice: () => 0,
        highestFloorArea: () => 0,
        highestLandArea: () => 0,
    },
    dispatch: () => {},
};

const PropertyContext = createContext<PropertyContextProps>(
    initialPropertyContextVal
);

export default PropertyContext;
