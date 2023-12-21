import axios from "axios";
import React, {
    ChangeEvent,
    MouseEvent,
    FormEvent,
    FunctionComponent,
    useContext,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../myApp/context/UserContext";
import Messages from "../components/Messages";
import { BiSolidShow } from "react-icons/bi";

interface Values {
    email: string;
    name: string;
    password: string;
    password_confirmation: string;
}

interface RegisterProps {
    fetchUserStatus(): void;
}

interface Password {
    show_password: boolean;
    show_password_confirmation: boolean;
}

const Register: FunctionComponent<RegisterProps> = ({ fetchUserStatus }) => {
    const [values, setValues] = useState<Values>({
        email: "",
        name: "",
        password: "",
        password_confirmation: "",
    });

    const [togglePassword, setTogglePassword] = useState<Password>({
        show_password: false,
        show_password_confirmation: false,
    });

    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        try {
            const response = await axios.post("/register", values);
            if (Math.floor(response.status / 100) === 2) {
                fetchUserStatus();
                navigate("/", {
                    state: { userRegistered: `Registration Successful` },
                });
            }
        } catch (error: any) {
            const { email, name, password } =
                error.response.data.errors || false;
            if (email || name || password) {
                dispatch({
                    type: "messages/set",
                    payload: [email, name, password],
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

    const handleToggle = (e: MouseEvent<HTMLElement>): void => {
        if (e.currentTarget.id === "show_password") {
            setTogglePassword((prev) => ({
                ...prev,
                show_password: !prev.show_password,
            }));
        } else if (e.currentTarget.id === "show_password_confirmation") {
            setTogglePassword((prev) => ({
                ...prev,
                show_password_confirmation: !prev.show_password_confirmation,
            }));
        } else {
            return;
        }
    };

    return (
        <div className="register_form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <div className="password__container">
                    <input
                        type={
                            togglePassword.show_password ? "text" : "password"
                        }
                        name="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    <div
                        id="show_password"
                        onClick={(e) => {
                            handleToggle(e);
                        }}
                    >
                        <BiSolidShow />
                    </div>
                </div>
                <label htmlFor="password_confirmation">
                    Password Confirmation
                </label>
                <div className="password_confirmation__container">
                    <input
                        type={
                            togglePassword.show_password_confirmation
                                ? "text"
                                : "password"
                        }
                        name="password_confirmation"
                        id="password_confirmation"
                        value={values.password_confirmation}
                        onChange={handleChange}
                    />
                    <div
                        id="show_password_confirmation"
                        onClick={(e) => {
                            handleToggle(e);
                        }}
                    >
                        <BiSolidShow />
                    </div>
                </div>
                <input type="submit" value="Register" />
            </form>
            <Messages />
        </div>
    );
};

export default Register;
