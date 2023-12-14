import { createContext, Dispatch } from "react";
import { UserState, UserAction } from "../store/UserReducer";

interface UserContextProps {
    state: UserState;
    dispatch: Dispatch<UserAction>;
}
const initialUserContextVal: UserContextProps = {
    state: {
        theme: "light",
        user: null,
        messages: [],
        addedProducts: [],
        spanMessage: "",
    },
    dispatch: () => {},
};

const UserContext = createContext<UserContextProps>(initialUserContextVal);

export default UserContext;
