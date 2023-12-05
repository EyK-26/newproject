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
        case "error/set":
            return {
                ...state,
                error: action.payload,
            };
        case "profileMenu/toggle":
            return {
                ...state,
                profileMenu: action.payload,
            };
        default:
            return state;
    }
};

export default UserReducer;
