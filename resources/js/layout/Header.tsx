import React from "react";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <Link to="/">Home</Link>
            <Link to="/properties">List All Properties</Link>
            <Link to="/custom-offers">List All Custom Offers</Link>
            <Navigation />
        </div>
    );
};

export default Header;
