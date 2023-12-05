import React, { useContext } from "react";
import Logout from "../auth/Logout";
import UserContext from "../myApp/context/UserContext";
import { Link } from "react-router-dom";
import Profile from "./Profile";

const Navigation = () => {
    const { state } = useContext(UserContext);
    return (
        <div className="navbar">
            {state.user ? <Logout /> : <Link to="/login">Login</Link>}
            {state.user && <Profile />}
        </div>
    );
};

export default Navigation;
