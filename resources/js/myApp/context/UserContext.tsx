import { createContext, Dispatch } from "react";
import { UserState, UserAction } from "../store/UserReducer";

interface UserContextProps {
    state: UserState;
    dispatch: Dispatch<UserAction>;
}
const initialUserContextVal: UserContextProps = {
    state: {
        theme: "",
        user: null,
        messages: [],
        addedProducts: [],
        spanMessage: "",
        selectedLanguage: "",
    },
    dispatch: () => {},
};

const UserContext = createContext<UserContextProps>(initialUserContextVal);

export default UserContext;
