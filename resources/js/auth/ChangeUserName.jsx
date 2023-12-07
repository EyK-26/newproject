import axios from "axios";
import React, { useContext, useState } from "react";
import UserContext from "../myApp/context/UserContext";

const ChangeUserName = ({ fetchUserStatus }) => {
    const [name, setName] = useState("");
    const { state, dispatch } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put("api/change-username", {
                id: state.user.id,
                name: name.trim(),
            });
            if (Math.floor(response.status / 100) === 2) {
                fetchUserStatus();
                dispatch({
                    type: "spanMessage/set",
                    payload: response.data.message,
                });
                setName("");
            }
        } catch (error) {
            dispatch({
                type: "spanMessage/set",
                payload: "Couldn't update, please try again.",
            });
        }
    };

    return (
        <div className="name_change">
            <div className="name_change--current">
                <span htmlFor="currentname">
                    Current Username: {state.user.name}
                </span>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="newname">New Username</label>
                    <input
                        value={name}
                        type="text"
                        id="newname"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        required
                    />
                </div>
                <input type="submit" value="Confirm" />
            </form>
            {state.spanMessage && (
                <span className="spanMessage">{state.spanMessage}</span>
            )}
        </div>
    );
};

export default ChangeUserName;
