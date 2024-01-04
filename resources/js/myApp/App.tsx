import React, { useReducer, FunctionComponent, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import MyRoutes from "../Routes/MyRoutes";
import UserContext from "./context/UserContext";
import UserReducer from "./store/UserReducer";
import axios from "axios";

const App: FunctionComponent = () => {
    const [userContextValue, setUserContextValue] = useReducer(UserReducer, {
        theme: "light",
        user: null,
        messages: [],
        addedProducts: [],
        spanMessage: "",
        selectedLanguage: "en-gb",
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
