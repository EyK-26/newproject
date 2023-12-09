import React, { useContext, useEffect, useState } from "react";
import UserContext from "../myApp/context/UserContext";
import axios from "axios";

const EnquiryForm = ({ id, setFormOpen }) => {
    const { state, dispatch } = useContext(UserContext);
    const [formData, setFormData] = useState({
        name: state.user.name,
        email: state.user.email,
        message: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/enquiry", {
                user_id: state.user.id,
                product_id: id,
                message: formData.message,
            });
            if (Math.floor(response.status / 100) === 2) {
                dispatch({
                    type: "spanMessage/set",
                    payload: response.data.message,
                });
                setFormData((prev) => ({
                    ...prev,
                    message: "",
                }));
                setFormOpen(false);
            }
        } catch (error) {
            dispatch({
                type: "spanMessage/set",
                payload: error.response.data.message.includes("SQLSTATE[23000]")
                    ? "You have already sent an enquiry about this property"
                    : "An error occured, please try again.",
            });
            setFormOpen(false);
        }
    };

    useEffect(() => {
        if (state.spanMessage) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } else {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [state.spanMessage]);

    return (
        <div className="enquiry-form__container">
            <h3>Contact Form</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={formData.name}
                        disabled
                    />
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={formData.email}
                        disabled
                    />
                    <small>
                        *your name and email address cannot be changed
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message: </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        cols="45"
                        placeholder="I am interested in this property..."
                        required
                    ></textarea>
                </div>
                <input type="submit" value="send" />
            </form>
        </div>
    );
};

export default EnquiryForm;
