import { User } from "./UserReducer";

export interface CustomProduct {
    floor_area: number;
    description: string;
    id: number;
    land_area: number;
    locality: string;
    photo_path: string;
    price: number;
    title: string;
    user_id: number;
    user?: User;
}

export interface PropertyState {
    customProducts: Array<CustomProduct>;
    customProductsLoading: boolean;
    selectedCustomProducts: Array<CustomProduct>;
    selectedCustomProductIds: number[];
    searchedCustomProducts: Array<CustomProduct>;
    searchedCustomProductsLoading: boolean;
    error: string;
    lowestPrice(): number;
    highestFloorArea(): number;
    highestLandArea(): number;
}

export type PropertyAction =
    | { type: "error/set"; payload: string }
    | { type: "customProducts/set"; payload: Array<CustomProduct> }
    | { type: "customProductLocation/set"; payload: string }
    | { type: "customProductPrice/set"; payload: number }
    | { type: "searchedCustomProducts/set"; payload: Array<CustomProduct> }
    | { type: "customProductPriceOrder/set"; payload: string }
    | { type: "customProductLocalityOrder/set"; payload: string }
    | { type: "customProductTitleOrder/set"; payload: string };

const PropertyReducer = (
    state: PropertyState,
    action: PropertyAction
): PropertyState => {
    switch (action.type) {
        case "customProducts/set":
            return {
                ...state,
                customProducts: action.payload,
                searchedCustomProductsLoading: false,
            };
        case "error/set":
            return {
                ...state,
                error: action.payload,
                searchedCustomProductsLoading: false,
            };
        case "searchedCustomProducts/set":
            return {
                ...state,
                searchedCustomProducts: action.payload,
                searchedCustomProductsLoading: false,
            };
        case "customProductLocation/set":
            return {
                ...state,
                searchedCustomProducts: [...state.customProducts].filter(
                    (prod) =>
                        prod.locality
                            .trim()
                            .toLowerCase()
                            .includes(action.payload.trim().toLowerCase())
                ),
            };
        case "customProductPrice/set":
            return {
                ...state,
                searchedCustomProducts: [...state.customProducts].filter(
                    (prod) => prod.price <= action.payload
                ),
            };
        case "customProductPriceOrder/set":
            return {
                ...state,
                searchedCustomProducts: [...state.searchedCustomProducts].sort(
                    (a, b) =>
                        action.payload !== undefined && action.payload === "asc"
                            ? a.price > b.price
                                ? 1
                                : -1
                            : a.price > b.price
                            ? -1
                            : 1
                ),
            };
        case "customProductLocalityOrder/set":
            return {
                ...state,
                searchedCustomProducts: [...state.searchedCustomProducts].sort(
                    (a, b) =>
                        action.payload !== undefined && action.payload === "asc"
                            ? a.locality > b.locality
                                ? 1
                                : -1
                            : a.locality > b.locality
                            ? -1
                            : 1
                ),
            };
        case "customProductTitleOrder/set":
            return {
                ...state,
                searchedCustomProducts: [...state.searchedCustomProducts].sort(
                    (a, b) =>
                        action.payload !== undefined && action.payload === "asc"
                            ? a.title > b.title
                                ? 1
                                : -1
                            : a.title > b.title
                            ? -1
                            : 1
                ),
            };
        default:
            return state;
    }
};

export default PropertyReducer;
