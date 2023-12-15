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
        lowestPrice: function (): number {
            return 0;
        },
        highestFloorArea: function (): number {
            return 0;
        },
        highestLandArea: function (): number {
            return 0;
        },
    },
    dispatch: () => {},
};

const PropertyContext = createContext<PropertyContextProps>(
    initialPropertyContextVal
);

export default PropertyContext;
