import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../myApp/context/UserContext";

const Enquiries = () => {
    const { state } = useContext(UserContext);

    const renderedEnquiries = state.user.enquiries.map((e, i) => (
        <div className="message_container" key={i}>
            <li className="message">{e.message}</li>
            <ul className="message_answers">
                {e.answers.length > 0 ? (
                    e.answers.map((a) => (
                        <li className="answer" key={a.id}>
                            {a.message}
                        </li>
                    ))
                ) : (
                    <li>"No answers yet"</li>
                )}
            </ul>
        </div>
    ));

    return (
        <div className="messages_container">
            {state.user.enquiries.length > 0 ? (
                <ul className="messages">{renderedEnquiries}</ul>
            ) : (
                <h2>No Messages sent.</h2>
            )}
        </div>
    );
};

export default Enquiries;
