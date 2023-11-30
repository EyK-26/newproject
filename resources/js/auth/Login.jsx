import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../myApp/context/Context";

import axios from "axios";

const Login = ({ fetchUserStatus }) => {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const { state, dispatch } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/login", values);
            if (Math.floor(response.status / 100) === 2) {
                fetchUserStatus();
                navigate("/", { state: { userLoggedIn: true } });
            }
        } catch (error) {
            dispatch({
                type: "error/set",
                payload: error.response.data.errors,
            });
        }
    };

    const handleChange = (e) => {
        setValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                />
                <input type="submit" value="Login" />
            </form>
            {state.error?.email?.map((el, i) => (
                <span key={i}>{el}</span>
            ))}
            {state.error?.password?.map((el, i) => (
                <span key={i}>{el}</span>
            ))}
            <span>
                <Link to="/forgot-password">Forgot Password</Link>
            </span>
            <span>
                You don't have an account?{" "}
                <Link to="/register">Register Now</Link>
            </span>
        </>
    );
};

export default Login;
