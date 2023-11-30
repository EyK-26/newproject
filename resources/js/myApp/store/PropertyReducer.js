const PropertyReducer = (state, action) => {
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
        default:
            return state;
    }
};

export default PropertyReducer;
