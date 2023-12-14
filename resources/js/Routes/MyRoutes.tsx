import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Register from "../auth/Register";
import Logout from "../auth/Logout";
import Login from "../auth/Login";
import axios from "axios";
import Unauthorized from "../auth/Unauthorized";
import Home from "../components/Home";
import PasswordReset from "../auth/password-reset/PasswordReset";
import ProductView from "../components/ProductView";
import UserSettings from "../auth/UserSettings";
import DeleteAccount from "../auth/DeleteAccount";
import ChangeUserName from "../auth/ChangeUserName";
import WishList from "../components/WishList";
import Enquiries from "../components/Enquiries";
import UserContext from "../myApp/context/UserContext";
import SearchProductsAll from "../components/SearchProductsAll";

const MyRoutes = () => {
    const { state, dispatch } = useContext(UserContext);

    const fetchUserStatus = async (): Promise<void> => {
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
        if (state.user === null) {
            fetchUserStatus();
        }
        if (state.messages.length > 0) {
            setTimeout(() => {
                dispatch({
                    type: "messages/unset",
                });
            }, 5000);
        }
        if (state.spanMessage) {
            setTimeout(() => {
                dispatch({
                    type: "spanMessage/unset",
                });
            }, 5000);
        }
    }, [state.user, state.messages, state.spanMessage]);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/properties" element={<SearchProductsAll />} />
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
                            element={
                                <ProductView
                                    fetchUserStatus={fetchUserStatus}
                                />
                            }
                        />
                        <Route path="/user/:id" element={<UserSettings />} />
                        <Route
                            path="/reset-password"
                            element={<PasswordReset />}
                        />
                        <Route
                            path="/account-delete"
                            element={
                                <DeleteAccount
                                    fetchUserStatus={fetchUserStatus}
                                />
                            }
                        />
                        <Route
                            path="/change-username"
                            element={
                                <ChangeUserName
                                    fetchUserStatus={fetchUserStatus}
                                />
                            }
                        />
                        <Route path="/wishlist/:id" element={<WishList />} />
                        <Route path="/enquiries/:id" element={<Enquiries />} />
                    </>
                )}
                <Route path="*" element={<Unauthorized />} />
            </Route>
        </Routes>
    );
};

export default MyRoutes;
