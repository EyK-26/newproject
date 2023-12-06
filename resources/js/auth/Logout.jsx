import React, { useContext } from "react";
import axios from "axios";
import UserContext from "../myApp/context/UserContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const { dispatch } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("/logout");
        if (Math.floor(response.status / 100) === 2) {
            dispatch({
                type: "user/set",
                payload: null,
            });
            navigate("/");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="submit" value="logout" id="logout" />
        </form>
    );
};

export default Logout;
