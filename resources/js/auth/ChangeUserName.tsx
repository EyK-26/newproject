import axios from "axios";
import React, {
    FormEvent,
    FunctionComponent,
    useContext,
    useState,
} from "react";
import UserContext from "../myApp/context/UserContext";

interface ChangeUserNameProps {
    fetchUserStatus: () => {};
}

const ChangeUserName: FunctionComponent<ChangeUserNameProps> = ({
    fetchUserStatus,
}) => {
    const [name, setName] = useState<string>("");
    const { state, dispatch } = useContext(UserContext);

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        try {
            const response = await axios.put("api/change-username", {
                id: typeof state.user === "object" && state.user?.id,
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
                <span>
                    Current Username:{" "}
                    {typeof state.user === "object" && state.user?.name}
                </span>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="newname">New Username</label>
                    <input
                        value={name}
                        type="text"
                        id="newname"
                        onChange={(e): void => {
                            setName(e.target.value);
                        }}
                        required
                    />
                </div>
                <input type="submit" value="Confirm" />
            </form>
            {state.spanMessage && <span>{state.spanMessage}</span>}
        </div>
    );
};

export default ChangeUserName;
