import React, { useContext, FunctionComponent } from "react";
import UserContext from "../../myApp/context/UserContext";
import ForgotPassword from "./ForgotPassword";
import ManualReset from "./ManualReset";

const PasswordReset: FunctionComponent = () => {
    const { state } = useContext(UserContext);
    const userState = state.user;

    return !userState ? <ForgotPassword /> : <ManualReset />;
};

export default PasswordReset;
