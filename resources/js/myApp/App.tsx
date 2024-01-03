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
    });

    const fetchData = async () => {
        const apiUrl = "https://api-free.deepl.com/v2/translate";
        const authKey = "393c4bea-d902-58be-5818-ad4f90aa90e4:fx";

        const headers = {
            Authorization: `DeepL-Auth-Key ${authKey}`,
            "Content-Type": "application/json",
        };

        const data = {
            text: ["Hello, world!"],
            target_lang: "DE",
        };

        try {
            const response = await axios.post(apiUrl, data, { headers });
            console.log(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
