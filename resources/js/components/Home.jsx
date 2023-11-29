import React, { useContext } from "react";
import Context from "../myApp/Context/Context";

const Home = () => {
    const { state } = useContext(Context);

    return <h1>Welcome {state.user?.name}</h1>;
};

export default Home;
