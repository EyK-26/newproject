import axios from "axios";
import React, {
    FormEvent,
    FunctionComponent,
    useContext,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../myApp/context/UserContext";

interface ChangeUserNameProps {
    fetchUserStatus(): void;
}

const DeleteAccount: FunctionComponent<ChangeUserNameProps> = ({
    fetchUserStatus,
}) => {
    const { state, dispatch } = useContext(UserContext);
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        if (confirmed) {
            dispatch({
                type: "spanMessage/set",
                payload: "deleting account...",
            });
            try {
                const response = await axios.delete("/api/user-delete", {
                    params: {
                        id: typeof state.user === "object" && state.user?.id,
                    },
                });
                if (Math.floor(response.status / 100) === 2) {
                    dispatch({
                        type: "spanMessage/set",
                        payload: "Account Deleted.",
                    });
                    fetchUserStatus();
                    navigate("/", {
                        state: { userDeleted: response.data.message },
                    });
                }
            } catch (error) {
                dispatch({
                    type: "spanMessage/set",
                    payload: "Couldn't delete, please try again.",
                });
            }
        } else {
            dispatch({
                type: "spanMessage/set",
                payload: "Please agree in order to delete your account.",
            });
        }
    };

    return (
        <div className="delete_account">
            <form onSubmit={handleSubmit}>
                <textarea
                    name="conditions"
                    id="conditions"
                    cols={30}
                    rows={10}
                    disabled
                    defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum autem nihil officia a error quis similique repellat vel modi facere, id sapiente voluptates eaque! Minima nam inventore deleniti accusantium quis."
                ></textarea>
                <div className="confirmation">
                    <div className="confirmation_action">
                        <label htmlFor="confirm">
                            Yes, delete my account
                            <input
                                type="checkbox"
                                name="confirm"
                                id="confirm"
                                defaultChecked={confirmed}
                                value={confirmed.toString()}
                                onChange={(): void =>
                                    setConfirmed((prev) => !prev)
                                }
                            />
                        </label>
                    </div>
                    <input type="submit" value="Delete Account" />
                </div>
            </form>
            {state.spanMessage && <span>{state.spanMessage}</span>}
        </div>
    );
};

export default DeleteAccount;
