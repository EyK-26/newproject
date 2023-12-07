import React, { useContext, useState } from "react";
import UserContext from "../../myApp/context/UserContext";
import axios from "axios";
import Messages from "../../components/Messages";

const ManualReset = () => {
    const { state, dispatch } = useContext(UserContext);
    const [values, setValues] = useState({
        id: state.user.id,
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                "/api/manual-reset/action",
                values
            );
            if (Math.floor(response.status / 100) === 2) {
                dispatch({
                    type: "messages/set",
                    payload: [response.data.message],
                });
            }
        } catch (error) {
            const { password, password_confirmation } =
                error.response.data.errors || undefined;
            if (password || password_confirmation) {
                dispatch({
                    type: "messages/set",
                    payload: [password, password_confirmation],
                });
            }
        }
    };

    const handleChange = (e) => {
        setValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="reset_password">
            <form onSubmit={handleSubmit}>
                <label htmlFor="password">New password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={values.password}
                />
                <label htmlFor="password_confirmation">
                    Confirm new password
                </label>
                <input
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    onChange={handleChange}
                    value={values.password_confirmation}
                />
                <button type="submit">Reset</button>
            </form>
            <Messages />
        </div>
    );
};

export default ManualReset;
