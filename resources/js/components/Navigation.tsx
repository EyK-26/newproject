import React, {
    FunctionComponent,
    ReactElement,
    useContext,
    useEffect,
    useState,
} from "react";
import Logout from "../auth/Logout";
import UserContext from "../myApp/context/UserContext";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import axios from "axios";

interface Languages {
    code: string;
    name: string;
    supportsFormality: boolean;
}

const Navigation: FunctionComponent = () => {
    const { state, dispatch } = useContext(UserContext);
    const [languages, setLanguages] = useState<Languages[]>([]);

    const fetchAllLanguages = async (): Promise<void> => {
        try {
            const response = await axios.get("/api/get-languages");
            if (Math.floor(response.status / 100) === 2) {
                setLanguages(response.data);
                console.log(response.data);
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

    // const handleLanguageChange =

    return (
        <nav className="navbar">
            <div className="select_language">
                <label htmlFor="select_language">Language </label>
                <select
                    name="select_language"
                    id="select_language"
                    // onChange={handleLanguageChange}
                >
                    {languages.map(
                        (element: Languages, index: number): ReactElement => (
                            <option value={element.code} key={index}>
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
