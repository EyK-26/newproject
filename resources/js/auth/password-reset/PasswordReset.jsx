import React, { useContext } from "react";
import UserContext from "../../myApp/context/UserContext";
import ForgotPassword from "./ForgotPassword";
import ManualReset from "./ManualReset";

const PasswordReset = ({ fetchUserStatus }) => {
    const { state } = useContext(UserContext);
    const userState = state.user;

    return !userState ? (
        <ForgotPassword />
    ) : (
        <ManualReset fetchUserStatus={fetchUserStatus} />
    );
};

export default PasswordReset;
