import React, { useReducer } from "react";
import { BrowserRouter } from "react-router-dom";
import Context from "./Context/Context";
import MyRoutes from "../Routes/MyRoutes";
import reducer from "./store/Reducer";

const App = () => {
    const [contextValue, setContextValue] = useReducer(reducer, {
        theme: "light",
        user: null,
        error: null,
    });

    return (
        <BrowserRouter>
            <Context.Provider
                value={{ state: contextValue, dispatch: setContextValue }}
            >
                <MyRoutes />
            </Context.Provider>
        </BrowserRouter>
    );
};

export default App;
