import React, { useContext } from "react";
import Context from "../myApp/Context/Context";
import Logout from "../auth/Logout";

const Navigation = () => {
    const { state } = useContext(Context);
    return <>{state.user && <Logout />}</>;
};

export default Navigation;
