import React, { useContext } from "react";
import Context from "../myApp/context/Context";
import axios from "axios";

const Logout = () => {
    const { dispatch } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("/logout");
        if (Math.floor(response.status / 100) === 2) {
            dispatch({
                type: "user/set",
                payload: null,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="submit" value="logout" id="logout" />
        </form>
    );
};

export default Logout;
