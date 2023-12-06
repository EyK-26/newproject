import React from "react";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <Link to="/">Home</Link>
            <Navigation />
        </div>
    );
};

export default Header;
