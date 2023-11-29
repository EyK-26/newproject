import React, { useContext } from "react";
import Context from "../myApp/Context/Context";
import axios from "axios";

const Logout = () => {
    const { dispatch } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("/logout");
        dispatch({
            type: "user/set",
            payload: null,
        });
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="submit" value="logout" id="logout" />
        </form>
    );
};

export default Logout;
