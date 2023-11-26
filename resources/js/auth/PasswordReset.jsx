import axios from "axios";
import React, { useState } from "react";

const PasswordReset = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/forgot-password", {
                email,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" onChange={handleChange} />
            <input type="submit" value="Submit" />
        </form>
    );
};

export default PasswordReset;
