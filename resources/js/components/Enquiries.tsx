import axios from "axios";
import React, {
    FunctionComponent,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import UserContext from "../myApp/context/UserContext";

interface Answer {
    id: number;
    message: string;
}

interface Enquiry {
    id: number;
    message: string;
    answers: Array<Answer>;
}

const Enquiries: FunctionComponent = () => {
    const { state } = useContext(UserContext);

    const renderedEnquiries = state.user.enquiries.map(
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
