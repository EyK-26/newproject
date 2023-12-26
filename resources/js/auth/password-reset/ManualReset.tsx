import React, {
    ChangeEvent,
    FormEvent,
    useContext,
    useState,
    FunctionComponent,
} from "react";
import UserContext from "../../myApp/context/UserContext";
import axios from "axios";
import Messages from "../../components/Messages";
import PasswordContainer from "../PasswordContainer";

export interface ManualResetValues {
    id: boolean | number | string;
    password: string;
    password_confirmation: string;
}

const ManualReset: FunctionComponent = () => {
    const { state, dispatch } = useContext(UserContext);
    const [values, setValues] = useState<ManualResetValues>({
        id:
            state.user !== null &&
            typeof state.user !== "boolean" &&
            state.user.id,
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        try {
            const response = await axios.put(
                "/api/manual-reset/action",
                values
            );
            if (Math.floor(response.status / 100) === 2) {
                dispatch({
                    type: "messages/set",
                    payload: [response.data.message],
                });
                setValues((prev) => ({
                    ...prev,
                    password: "",
                    password_confirmation: "",
                }));
            }
        } catch (error: any) {
            const { password, password_confirmation } =
                error.response.data.errors || false;
            if (password || password_confirmation) {
                dispatch({
                    type: "messages/set",
                    payload: [password, password_confirmation],
                });
            }
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="reset_password">
            <form onSubmit={handleSubmit}>
                <PasswordContainer
                    values={values}
                    handleChange={handleChange}
                />
                <button type="submit">Reset</button>
            </form>
            <Messages />
        </div>
    );
};

export default ManualReset;
