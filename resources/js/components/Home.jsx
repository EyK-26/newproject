import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../myApp/context/UserContext";

const Home = () => {
    const { state } = useContext(UserContext);

    return (
        <>
            {!state.user && <Link to="/login">Login</Link>}
            {state.user && <span>Welcome {state.user.name}</span>}{" "}
        </>
    );
};

export default Home;
