import React, { useContext } from "react";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import UserContext from "../myApp/context/UserContext";

const Header = () => {
    const { state } = useContext(UserContext);
    const userAdminState =
        state.user !== null &&
        typeof state.user !== "boolean" &&
        state.user.role;

    return (
        <div className="header">
            <Link to="/">Home</Link>
            {userAdminState === "admin" && <a href="/offers">Admin Page</a>}
            <Navigation />
        </div>
    );
};

export default Header;
