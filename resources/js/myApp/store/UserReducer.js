const UserReducer = (state, action) => {
    switch (action.type) {
        case "theme/set":
            return {
                ...state,
                theme: action.payload,
            };
        case "user/set":
            return {
                ...state,
                user: action.payload,
            };
        case "messages/set":
            return {
                ...state,
                messages: action.payload,
            };
        case "messages/unset":
            return {
                ...state,
                messages: [],
            };
        case "spanMessage/set":
            return {
                ...state,
                spanMessage: action.payload,
            };
        case "spanMessage/unset":
            return {
                ...state,
                spanMessage: "",
            };
        case "addedProducts/set":
            return {
                ...state,
                addedProducts: [...state.addedProducts, action.payload],
            };
        default:
            return state;
    }
};

export default UserReducer;
