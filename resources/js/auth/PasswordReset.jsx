import axios from "axios";
import React, { useContext, useState } from "react";
import UserContext from "../myApp/context/UserContext";

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [sending, setSending] = useState(null);
    const [message, setMessage] = useState("");
    const { state, dispatch } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (/.*@.*/.test(email)) {
            try {
                setSending(true);
                const response = await axios.post("/api/forgot-password", {
                    email,
                });
                if (Math.floor(response.status / 100) === 2) {
                    setMessage(response.data.message);
                    setSending(false);
                }
            } catch (error) {
                dispatch({
                    type: "error/set",
                    payload: error.response.data.errors,
                });
                navigate("/login");
            }
        } else {
            setMessage("Please fill the email.");
        }
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <>
            {sending === null ? (
                <span>{message}</span>
            ) : sending ? (
                <span>Please wait...</span>
            ) : (
                <span>{message}</span>
            )}
            {state.error?.email?.map((el, i) => (
                <span key={i}>{el}</span>
            ))}
            {state.error?.password?.map((el, i) => (
                <span key={i}>{el}</span>
            ))}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
        </>
    );
};

export default PasswordReset;
