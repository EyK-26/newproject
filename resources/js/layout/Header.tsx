import React, { useContext } from "react";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import UserContext from "../myApp/context/UserContext";

const Header = () => {
    const { state } = useContext(UserContext);
    const userState =
        state.user !== null &&
        typeof state.user !== "boolean" &&
        state.user.role;

    return (
        <div className="header">
            <Link to="/">Home</Link>
            <Link to="/properties">List All Properties</Link>
            <Link to="/custom-offers">List All Custom Offers</Link>
            {userState === "admin" && <a href="/offers">Admin Page</a>}
            <Navigation />
        </div>
    );
};

export default Header;
