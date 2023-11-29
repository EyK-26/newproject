import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Register from "../auth/Register";
import Logout from "../auth/Logout";
import Login from "../auth/Login";
import Context from "../myApp/Context/Context";
import axios from "axios";
import Unauthorized from "../auth/Unauthorized";
import Home from "../components/Home";
import PasswordReset from "../auth/PasswordReset";

const MyRoutes = () => {
    const { state, dispatch } = useContext(Context);
    const navigate = useNavigate();

    const fetchUserStatus = async () => {
        try {
            const response = await axios.get("/api/user");
            if (Math.floor(response.status / 100) === 2) {
                dispatch({
                    type: "user/set",
                    payload: response.data,
                });
            } else if (response.status === 401) {
                dispatch({
                    type: "user/set",
                    payload: false,
                });
                navigate("/login");
            }
        } catch (error) {
            navigate("/login");
        }
    };

    useEffect(() => {
        if (state.user === null) fetchUserStatus();
    }, [state.user]);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {state.user && <Route index element={<Home />} />}
                {!state.user && (
                    <Route
                        path="/register"
                        element={<Register fetchUserStatus={fetchUserStatus} />}
                    />
                )}
                {!state.user && (
                    <Route
                        path="/login"
                        element={<Login fetchUserStatus={fetchUserStatus} />}
                    />
                )}
                {!state.user && (
                    <Route
                        path="/forgot-password"
                        element={<PasswordReset />}
                    />
                )}
                {state.user && <Route path="/logout" element={<Logout />} />}
                <Route path="*" element={<Unauthorized />} />
            </Route>
        </Routes>
    );
};

export default MyRoutes;
