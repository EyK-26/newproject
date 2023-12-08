import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../myApp/context/UserContext";
import Messages from "../components/Messages";

const Login = ({ fetchUserStatus }) => {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/login", values);
            if (Math.floor(response.status / 100) === 2) {
                fetchUserStatus();
                navigate("/", {
                    state: { userLoggedIn: `Login Successful` },
                });
            }
        } catch (error) {
            const { password, email } = error.response.data.errors || false;
            if (password || email) {
                dispatch({
                    type: "messages/set",
                    payload: [password, email],
                });
            }
        }
    };

    useEffect(() => {
        if (document.querySelector(".reset__success")) {
            setTimeout(() => {
                document.querySelector(".reset__success").style.display =
                    "none";
            }, 5000);
        }
    }, []);

    const handleChange = (e) => {
        setValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="login_form">
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
            <span>
                <Link to="/forgot-password">Forgot Password</Link>
            </span>
            <span>
                You don't have an account?{" "}
                <Link to="/register">Register Now</Link>
            </span>
            <Messages />
        </div>
    );
};

export default Login;
