import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Register from "../auth/Register";
import Logout from "../auth/Logout";
import Login from "../auth/Login";
import Context from "../myApp/context/UserContext";
import axios from "axios";
import Unauthorized from "../auth/Unauthorized";
import Home from "../components/Home";
import PasswordReset from "../auth/password-reset/PasswordReset";
import ProductView from "../components/ProductView";
import UserSettings from "../auth/UserSettings";

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
            }
        } catch (error) {
            dispatch({
                type: "user/set",
                payload: false,
            });
        }
    };

    useEffect(() => {
        if (state.user === null) fetchUserStatus();
    }, [state.user]);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                {!state.user ? (
                    <>
                        <Route
                            path="/register"
                            element={
                                <Register fetchUserStatus={fetchUserStatus} />
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <Login fetchUserStatus={fetchUserStatus} />
                            }
                        />
                        <Route
                            path="/forgot-password"
                            element={<PasswordReset />}
                        />
                    </>
                ) : (
                    <>
                        <Route path="/logout" element={<Logout />} />
                        <Route
                            path="/prod_view/:id"
                            element={<ProductView />}
                        />
                        <Route path="/user/:id" element={<UserSettings />} />
                        <Route
                            path="/reset-password"
                            element={<PasswordReset />}
                        />
                    </>
                )}
                <Route path="*" element={<Unauthorized />} />
            </Route>
        </Routes>
    );
};

export default MyRoutes;
