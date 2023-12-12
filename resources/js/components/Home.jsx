import React, { useContext, useEffect, useReducer } from "react";
import PropertyContext from "../myApp/context/PropertyContext";
import UserContext from "../myApp/context/UserContext";
import PropertyReducer from "../myApp/store/PropertyReducer";
import ProductList from "./ProductList";
import SelectedProductList from "./SelectedProductList";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
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
                <ProductList />
                <SelectedProductList />
            </div>
        </div>
    );
};

export default Home;
