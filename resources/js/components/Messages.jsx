import React, { useContext } from "react";
import UserContext from "../myApp/context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Messages = () => {
    const { state } = useContext(UserContext);

    return (
        <>
            {state.messages.length > 0 && (
                <ul className="messages">
                    {state.messages.map((el, idx) => (
                        <li key={idx}>{el}</li>
                    ))}
                    <Link to="/">back to homepage</Link>
                </ul>
            )}
        </>
    );
};

export default Messages;
