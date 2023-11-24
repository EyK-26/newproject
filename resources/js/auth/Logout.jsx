import React, { useContext } from "react";
import Context from "../myApp/Context/Context";
import axios from "axios";

const Logout = () => {
    const { dispatch } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/logout");
            dispatch({
                type: "user/set",
                payload: null,
            });
            navigate("/");
        } catch (error) {
            dispatch({
                type: "error/add",
                payload: error.response.data.errors,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="logout">Logout</label>
            <input type="submit" value="logout" id="logout" />
        </form>
    );
};

export default Logout;
