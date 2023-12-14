import { createContext, Dispatch } from "react";
import { UserState, UserAction } from "../store/UserReducer";

interface UserContextProps {
    state: UserState;
    dispatch: Dispatch<UserAction>;
}

const UserContext = createContext<UserContextProps | null>(null);

export default UserContext;
