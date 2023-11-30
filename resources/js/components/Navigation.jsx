import React, { useContext } from "react";
import Logout from "../auth/Logout";
import UserContext from "../myApp/context/UserContext";

const Navigation = () => {
    const { state } = useContext(UserContext);
    return <>{state.user && <Logout />}</>;
};

export default Navigation;
