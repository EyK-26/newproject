import axios from "axios";
import React, {
    FunctionComponent,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../myApp/context/UserContext";
import { User } from "../myApp/store/UserReducer";

const UserSettings: FunctionComponent = () => {
    const { id } = useParams();
    const { state, dispatch } = useContext(UserContext);
    const [userDetails, setUserDetails] = useState<User | null>(null);
    const navigate = useNavigate();

    const convertObject = (product: User): ReactNode =>
        Object.keys(product as Object).map(
            (attribute: string, index: number) =>
                /^name$|^email$|^created_at$/.test(attribute) && (
                    <li key={index}>
                        {attribute === "created_at"
                            ? `Member since: ${
                                  product[attribute].split(/T/)[0]
                              }`
                            : `${attribute}: ${(product as any)[attribute]}`}
                    </li>
                )
        );

    const fetchUser = async (): Promise<void> => {
        try {
            const response = await axios.get("/api/user", { params: { id } });
            if (Math.floor(response.status / 100) === 2) {
                setUserDetails(response.data);
            }
        } catch (error: any) {
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
                        onClick={(): void => {
                            navigate("/change-username");
                        }}
                    >
                        Change Name
                    </button>
                    <button
                        onClick={(): void => {
                            navigate("/reset-password");
                        }}
                    >
                        Reset Password
                    </button>
                    <button
                        onClick={(): void => {
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
