import React, {
    ChangeEvent,
    FunctionComponent,
    ReactElement,
    useContext,
    useEffect,
    useState,
} from "react";
import Logout from "../auth/Logout";
import UserContext from "../myApp/context/UserContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import axios from "axios";

interface Languages {
    code: string;
    name: string;
    supportsFormality: boolean;
}

type LayoutProps = {
    fetchUserStatus(): void;
};

const Navigation: FunctionComponent<LayoutProps> = ({ fetchUserStatus }) => {
    const { state: locationState, pathname } = useLocation();
    const { state, dispatch } = useContext(UserContext);
    const [languages, setLanguages] = useState<Languages[]>([]);
    const userLanguageState =
        state.user !== null &&
        typeof state.user !== "boolean" &&
        state.user.language;
    const userIdState =
        state.user !== null && typeof state.user !== "boolean" && state.user.id;
    const navigate = useNavigate();

    const fetchAllLanguages = async (): Promise<void> => {
        try {
            const response = await axios.get("/api/get-languages");
            if (Math.floor(response.status / 100) === 2) {
                setLanguages(response.data);
            }
        } catch (err: any) {
            dispatch({
                type: "spanMessage/set",
                payload: err,
            });
        }
    };

    useEffect(() => {
        if (languages.length === 0) {
            fetchAllLanguages();
        }
    }, []);

    const handleLanguageChange = async (
        e: ChangeEvent<HTMLSelectElement>
    ): Promise<void> => {
        try {
            const response = await axios.post("/api/set-language", {
                user_id: userIdState,
                user_language: e.target.value,
            });
            if (Math.floor(response.status / 100) === 2) {
                fetchUserStatus();
                navigate(pathname, {
                    state: { userLoggedIn: response.data.message },
                });
                dispatch({
                    type: "messages/set",
                    payload: response.data.message,
                });
            }
        } catch (err: any) {
            dispatch({
                type: "spanMessage/set",
                payload: err,
            });
        }
    };

    return (
        <nav className="navbar">
            <div className="select_language">
                <label htmlFor="select_language">Language </label>
                <select
                    name="select_language"
                    id="select_language"
                    value={
                        state.user
                            ? String(userLanguageState).toLowerCase()
                            : "en-gb"
                    }
                    onChange={handleLanguageChange}
                >
                    {languages.map(
                        (element: Languages, index: number): ReactElement => (
                            <option
                                value={String(element.code).toLowerCase()}
                                key={index}
                            >
                                {element.name}
                            </option>
                        )
                    )}
                </select>
            </div>
            {state.user ? <Logout /> : <Link to="/login">Login</Link>}
            {state.user && <Profile />}
        </nav>
    );
};

export default Navigation;
