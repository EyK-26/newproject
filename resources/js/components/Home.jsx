import React, { useContext } from "react";
import Context from "../myApp/context/Context";
import { Link } from "react-router-dom";

const Home = () => {
    const { state } = useContext(Context);

    return (
        <>
            {!state.user && <Link to="/login">Login</Link>}
            {state.user && <span>Welcome {state.user.name}</span>}{" "}
        </>
    );
};

export default Home;
