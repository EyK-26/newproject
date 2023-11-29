export default function reducer(state, action) {
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
        default:
            return state;
    }
}
