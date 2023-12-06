import React, { useContext, useEffect, useRef } from "react";
import UserContext from "../myApp/context/UserContext";
import WishList from "./WishList";
import Enquiries from "./Enquiries";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
    const { state } = useContext(UserContext);

    return (
        <div className="user_menu">
            <ul className="user_menu__name">
                <div className="user_menu__name--first">
                    <li>{state.user?.name}</li>
                    <li>{state.user?.email}</li>
                </div>
                <li>
                    <Link to={`user/${state.user?.id}`}>User Settings</Link>
                </li>
            </ul>
            <ul className="user_menu__wishlist">
                <li>
                    <WishList />
                </li>
            </ul>
            <ul className="user_menu__enquiries">
                <li>
                    <Enquiries />
                </li>
            </ul>
        </div>
    );
};

export default ProfileMenu;
