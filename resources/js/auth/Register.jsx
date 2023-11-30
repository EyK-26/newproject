import axios from "axios";
import React, { useContext, useState } from "react";
import Context from "../myApp/context/Context";
import { useNavigate } from "react-router-dom";

const Register = ({ fetchUserStatus }) => {
    const [values, setValues] = useState({
        email: "",
        name: "",
        password: "",
        password_confirmation: "",
    });
    const { state, dispatch } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/register", values);
            if (Math.floor(response.status / 100) === 2) {
                fetchUserStatus();
                navigate("/", { state: { userRegistered: true } });
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

    console.log(state.error);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                />
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
                <label htmlFor="password_confirmation">
                    Password Confirmation
                </label>
                <input
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    value={values.password_confirmation}
                    onChange={handleChange}
                />
                <input type="submit" value="Register" />
            </form>
            {state.error?.name?.map((el, i) => (
                <span key={i}>{el}</span>
            ))}
            {state.error?.email?.map((el, i) => (
                <span key={i}>{el}</span>
            ))}
            {state.error?.password?.map((el, i) => (
                <span key={i}>{el}</span>
            ))}
        </>
    );
};

export default Register;
