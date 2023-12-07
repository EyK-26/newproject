import axios from "axios";
import React, { useContext, useState } from "react";
import UserContext from "../../myApp/context/UserContext";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [sending, setSending] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

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
                setMessage("Email wasn't sent. Please try again.");
            }
        } else {
            setMessage("Please fill the email field.");
        }
    };

    return (
        <div className="reset_password">
            {sending === null ? (
                <span>{message}</span>
            ) : sending ? (
                <span>Please wait...</span>
            ) : (
                <>
                    <span>{message}</span>
                    <button onClick={() => navigate("/")}>
                        back to main page
                    </button>
                </>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Please insert your Email.</label>
                <small>You will receive a password reset link shortly.</small>
                <input
                    type="email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    id="email"
                    value={email}
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default ForgotPassword;
