interface Product {
    id: number;
}

interface User {
    created_at: string;
    email: string;
    email_verified_at: string | null;
    enquiries: Array<Object>;
    wishes: Array<Object>;
    id: number;
    name: string;
    role: string | null;
    two_factor_confirmed_at: string | null;
    two_factor_recovery_codes: string | null;
    two_factor_secret: string | null;
    updated_at: string;
}

export interface UserState {
    theme: string;
    user: User | null | boolean;
    messages: Array<string>;
    addedProducts: Array<Product>;
    spanMessage: string;
}

export type UserAction =
    | { type: "theme/set"; payload: string }
    | { type: "user/set"; payload: User | null | boolean }
    | { type: "messages/set"; payload: Array<string> }
    | { type: "messages/unset" }
    | { type: "spanMessage/set"; payload: string }
    | { type: "spanMessage/unset" }
    | { type: "addedProducts/set"; payload: Product }
    | { type: "addedProducts/unset"; payload: string };

const UserReducer = (state: UserState, action: UserAction): UserState => {
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
        case "addedProducts/unset":
            return {
                ...state,
                addedProducts: [...state.addedProducts].filter(
                    (el) => el.id !== Number(action.payload)
                ),
            };
        default:
            return state;
    }
};

export default UserReducer;
