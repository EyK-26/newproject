import axios from "axios";
import React, { useContext, useState } from "react";
import Context from "../myApp/Context/Context";

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);
    const { state, dispatch } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSending(true);
            const response = await axios.post("/api/forgot-password", {
                email,
            });
            if (Math.floor(response.status / 100) === 2) {
                setMessage("email sent");
                setSending(false);
            }
        } catch (error) {
            dispatch({
                type: "error/set",
                payload: error.response.data.errors,
            });
            navigate("/login");
        }
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <>
            {sending && <span>Please wait...</span>}
            {message && <span>message sent</span>}
            {state.error.length > 0 &&
                state.error.map((el, i) => <span key={i}>{el}</span>)}{" "}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
        </>
    );
};

export default PasswordReset;
