import React, { useContext } from "react";
import Logout from "../auth/Logout";
import UserContext from "../myApp/context/UserContext";
import { Link } from "react-router-dom";

const Navigation = () => {
    const { state } = useContext(UserContext);
    return (
        <div className="navbar">
            {state.user ? <Logout /> : <Link to="/login">Login</Link>}
        </div>
    );
};

export default Navigation;
