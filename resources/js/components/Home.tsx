import React, { FunctionComponent, useContext, useEffect } from "react";
import UserContext from "../myApp/context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import CustomOffers from "./CustomOffers";

type HomeProps = {
    fetchUserStatus(): void;
};

const Home: FunctionComponent<HomeProps> = ({ fetchUserStatus }) => {
    const { state: locationState, pathname } = useLocation();
    const navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext);
    const { userDeleted, userRegistered, userLoggedIn, userLoggedOut } =
        locationState || false;

    useEffect(() => {
        if (locationState) {
            dispatch({
                type: "spanMessage/set",
                payload:
                    userRegistered ||
                    userLoggedIn ||
                    userLoggedOut ||
                    userDeleted,
            });
            navigate(pathname, { state: null });
        }
    }, [locationState]);

    return (
        <div className="home__content">
            {state.spanMessage && (
                <span className="span_message">{state.spanMessage}</span>
            )}
            <div className="products__content">
                <CustomOffers fetchUserStatus={fetchUserStatus} />
                {/* <SelectedProductList /> */}
            </div>
        </div>
    );
};

export default Home;
