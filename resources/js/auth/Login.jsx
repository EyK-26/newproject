import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../myApp/context/UserContext";

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
                navigate("/", { state: { userLoggedIn: true } });
            }
        } catch (error) {
            dispatch({
                type: "error/set",
                payload: error.response.data.errors,
            });
        }
    };

    useEffect(() => {
        if (document.querySelector(".reset__success") !== undefined) {
            setTimeout(() => {
                document.querySelector(".reset__success").style.display =
                    "none";
            }, 3000);
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
        </div>
    );
};

export default Login;
