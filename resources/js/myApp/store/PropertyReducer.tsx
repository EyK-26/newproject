import { User } from "./UserReducer";

export interface Product {
    id: number;
    locality: string;
    prize_czk: number;
    building_area: number;
    land_area: number;
    images: string[];
    name: string;
    company_logo: string;
    company_name: string;
    name_extracted: string;
}

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
    user: User;
}

export interface PropertyState {
    customProducts: Array<CustomProduct>;
    customProductsLoading: boolean;
    selectedCustomProducts: Array<CustomProduct>;
    selectedCustomProductIds: number[];
    searchedCustomProducts: Array<CustomProduct>;
    searchedCustomProductsLoading: boolean;
    products: Array<Product>;
    productsLoading: boolean;
    selectedIds: number[];
    selectedProducts: Array<Product>;
    error: string;
    searchedProducts: Array<Product>;
    searchedProductsLoading: boolean;
    lowestPrice(): number;
    highestFloorArea(): number;
    highestLandArea(): number;
}

export type PropertyAction =
    | { type: "products/set"; payload: Array<Product> }
    | { type: "error/set"; payload: string }
    | { type: "id/add"; payload: number }
    | { type: "id/remove"; payload: number }
    | { type: "product/add"; payload: Product }
    | { type: "searchedProducts/set"; payload: Array<Product> }
    | { type: "location/set"; payload: string }
    | { type: "price/set"; payload: number }
    | { type: "customProducts/set"; payload: Array<CustomProduct> }
    | { type: "customProductLocation/set"; payload: string }
    | { type: "customProductPrice/set"; payload: number };

const PropertyReducer = (
    state: PropertyState,
    action: PropertyAction
): PropertyState => {
    switch (action.type) {
        case "customProducts/set":
            return {
                ...state,
                customProducts: action.payload,
                productsLoading: false,
            };
        case "products/set":
            return {
                ...state,
                products: action.payload,
                productsLoading: false,
            };
        case "error/set":
            return {
                ...state,
                error: action.payload,
                productsLoading: false,
            };
        case "id/add":
            return {
                ...state,
                selectedIds: [...state.selectedIds, action.payload],
            };
        case "id/remove":
            return {
                ...state,
                selectedIds: [...state.selectedIds].filter(
                    (num) => num !== action.payload
                ),
                selectedProducts: [...state.selectedProducts].filter(
                    (prod) => prod.id !== action.payload
                ),
            };
        case "product/add":
            return {
                ...state,
                selectedProducts: [...state.selectedProducts, action.payload],
            };
        case "searchedProducts/set":
            return {
                ...state,
                searchedProducts: action.payload,
                searchedProductsLoading: false,
            };
        case "location/set":
            return {
                ...state,
                searchedProducts: [...state.searchedProducts].filter((prod) =>
                    prod.locality
                        .trim()
                        .toLowerCase()
                        .includes(action.payload.trim().toLowerCase())
                ),
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
        case "price/set":
            return {
                ...state,
                searchedProducts: [...state.searchedProducts].filter(
                    (prod) => prod.prize_czk <= action.payload
                ),
            };
        case "customProductPrice/set":
            return {
                ...state,
                searchedCustomProducts: [...state.customProducts].filter(
                    (prod) => prod.price <= action.payload
                ),
            };
        default:
            return state;
    }
};

export default PropertyReducer;
