import axios from "axios";
import React, {
    FormEvent,
    FunctionComponent,
    useContext,
    useState,
} from "react";
import UserContext from "../../myApp/context/UserContext";
import { useNavigate } from "react-router-dom";

const ForgotPassword: FunctionComponent = () => {
    const [email, setEmail] = useState<string>("");
    const [sending, setSending] = useState<boolean | null>(null);
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (/.*@.*/.test(email)) {
            try {
                setSending(true);
                const response = await axios.post("/api/forgot-password", {
                    email,
                });
                if (Math.floor(response.status / 100) === 2) {
                    setSending(false);
                    dispatch({
                        type: "spanMessage/set",
                        payload: response.data.message,
                    });
                    setEmail("");
                }
            } catch (error) {
                dispatch({
                    type: "spanMessage/set",
                    payload: "Email wasn't sent. Please try again.",
                });
            }
        } else {
            dispatch({
                type: "spanMessage/set",
                payload: "Please fill the email field.",
            });
        }
    };

    return (
        <div className="reset_password">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Please insert your Email.</label>
                <small>You will receive a password reset link shortly.</small>
                <input
                    type="email"
                    onChange={(e): void => {
                        setEmail(e.target.value);
                    }}
                    id="email"
                    value={email}
                />
                <input type="submit" value="Submit" />
            </form>
            {sending === null ? (
                <span>{state.spanMessage}</span>
            ) : sending ? (
                <span>Please wait...</span>
            ) : (
                <>
                    <span>{state.spanMessage}</span>
                    <button onClick={(): void => navigate("/")}>
                        back to main page
                    </button>
                </>
            )}
        </div>
    );
};

export default ForgotPassword;
