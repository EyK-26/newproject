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
}

export interface PropertyState {
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
    | { type: "price/set"; payload: number };

const PropertyReducer = (
    state: PropertyState,
    action: PropertyAction
): PropertyState => {
    switch (action.type) {
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
        case "price/set":
            return {
                ...state,
                searchedProducts: [...state.searchedProducts].filter(
                    (prod) => prod.prize_czk <= action.payload
                ),
            };
        default:
            return state;
    }
};

export default PropertyReducer;
