import React, { useContext } from "react";
import UserContext from "../myApp/context/UserContext";

const Messages = () => {
    const { state } = useContext(UserContext);

    return (
        <>
            {state.messages && (
                <ul className="messages">
                    {state.messages.map((el, idx) => (
                        <li key={idx}>{el}</li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Messages;
