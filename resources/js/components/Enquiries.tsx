import React, { FunctionComponent, ReactNode, useContext } from "react";
import UserContext from "../myApp/context/UserContext";
import { Enquiry } from "../myApp/store/UserReducer";

const Enquiries: FunctionComponent = () => {
    const { state } = useContext(UserContext);

    if (typeof state.user === "boolean") {
        return;
    }

    const renderedEnquiries = state.user?.enquiries.map(
        (e: Enquiry, i: number): ReactNode => (
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
        )
    );

    return (
        <>
            {state.user === null ? (
                <div></div>
            ) : (
                <div className="messages_container">
                    {state.user.enquiries.length > 0 ? (
                        <ul className="messages">{renderedEnquiries}</ul>
                    ) : (
                        <h2>No Messages sent.</h2>
                    )}
                </div>
            )}
        </>
    );
};

export default Enquiries;
