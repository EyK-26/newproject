import React, {
    ChangeEvent,
    FormEvent,
    FunctionComponent,
    MouseEvent,
    useContext,
    useEffect,
    useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../myApp/context/UserContext";
import Messages from "../components/Messages";
import { BiSolidShow } from "react-icons/bi";

interface Values {
    email: string;
    password: string;
}

interface LoginProps {
    fetchUserStatus(): void;
}

const Login: FunctionComponent<LoginProps> = ({ fetchUserStatus }) => {
    const [values, setValues] = useState<Values>({
        email: "",
        password: "",
    });
    const [togglePassword, setTogglePassword] = useState<boolean>(false);
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("/login", values);
            if (Math.floor(response.status / 100) === 2) {
                fetchUserStatus();
                navigate("/", {
                    state: { userLoggedIn: `Login Successful` },
                });
            }
        } catch (error: any) {
            const { password, email } = error.response.data.errors || false;
            if (password || email) {
                dispatch({
                    type: "messages/set",
                    payload: [password, email],
                });
            }
        }
    };

    useEffect(() => {
        const resetSuccessElement =
            document.querySelector<HTMLElement>(".reset_success");

        if (resetSuccessElement) {
            setTimeout(() => {
                resetSuccessElement.style.display = "none";
            }, 5000);
        }
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleToggle = (e: MouseEvent<HTMLElement>): void => {
        setTogglePassword((prev) => !prev);
    };

    return (
        <div className="login_form">
            <form onSubmit={handleSubmit}>
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
                        type={togglePassword ? "text" : "password"}
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
                <input type="submit" value="Login" />
            </form>
            <span>
                <Link to="/forgot-password">Forgot Password</Link>
            </span>
            <span>
                You don't have an account?{" "}
                <Link to="/register">Register Now</Link>
            </span>
            <Messages />
        </div>
    );
};

export default Login;
