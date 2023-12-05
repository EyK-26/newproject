import React, { useReducer } from "react";
import { BrowserRouter } from "react-router-dom";
import MyRoutes from "../Routes/MyRoutes";
import UserContext from "./context/UserContext";
import UserReducer from "./store/UserReducer";

const App = () => {
    const [userContextValue, setUserContextValue] = useReducer(UserReducer, {
        theme: "light",
        user: null,
        error: null,
        profileMenu: false,
    });

    return (
        <BrowserRouter>
            <UserContext.Provider
                value={{
                    state: userContextValue,
                    dispatch: setUserContextValue,
                }}
            >
                <MyRoutes />
            </UserContext.Provider>
        </BrowserRouter>
    );
};

export default App;
