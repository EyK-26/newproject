import React, { useContext } from "react";
import Logout from "../auth/Logout";
import Context from "../myApp/context/Context";

const Navigation = () => {
    const { state } = useContext(Context);
    return <>{state.user && <Logout />}</>;
};

export default Navigation;
