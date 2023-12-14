import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../myApp/context/UserContext";

const UserSettings = () => {
    const { id } = useParams();
    const { state, dispatch } = useContext(UserContext);
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();

    const convertObject = (product) =>
        Object.keys(product).map(
            (attribute, index) =>
                /^name$|^email$|^created_at$/.test(attribute) && (
                    <li key={index}>
                        {attribute === "created_at"
                            ? `Member since: ${
                                  product[attribute].split(/T/)[0]
                              }`
                            : `${attribute}: ${product[attribute]}`}
                    </li>
                )
        );

    const fetchUser = async () => {
        try {
            const response = await axios.get("/api/user", { params: { id } });
            if (Math.floor(response.status / 100) === 2) {
                setUserDetails(response.data);
            }
        } catch (error) {
            dispatch({
                type: "spanMessage/set",
                payload: error,
            });
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            {state.spanMessage && (
                <span className="span_message">{state.spanMessage}</span>
            )}
            <ul className="user_settings_container">
                {userDetails && (
                    <div className="user_settings__details">
                        {convertObject(userDetails)}
                    </div>
                )}
                <div className="user_settings--controls">
                    <button
                        onClick={() => {
                            navigate("/change-username");
                        }}
                    >
                        Change Name
                    </button>
                    <button
                        onClick={() => {
                            navigate("/reset-password");
                        }}
                    >
                        Reset Password
                    </button>
                    <button
                        onClick={() => {
                            navigate("/account-delete");
                        }}
                    >
                        Delete Account
                    </button>
                </div>
            </ul>
        </>
    );
};

export default UserSettings;
