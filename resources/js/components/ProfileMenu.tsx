import React, { FunctionComponent, useContext, useEffect, useRef } from "react";
import UserContext from "../myApp/context/UserContext";
import { Link } from "react-router-dom";

const ProfileMenu: FunctionComponent = () => {
    const { state } = useContext(UserContext);

    return (
        <div className="user_menu">
            <ul className="user_menu__name">
                <div className="user_menu__name--first">
                    <li>
                        {state.user !== null &&
                            typeof state.user !== "boolean" &&
                            state.user.name}
                    </li>
                    <li>
                        {state.user !== null &&
                            typeof state.user !== "boolean" &&
                            state.user?.email}
                    </li>
                </div>
                <li>
                    <Link
                        to={`user/${
                            state.user !== null &&
                            typeof state.user !== "boolean" &&
                            state.user.id
                        }`}
                    >
                        User Settings
                    </Link>
                </li>
            </ul>
            <ul className="user_menu__wishlist">
                <li>
                    <Link
                        to={`wishlist/${
                            state.user !== null &&
                            typeof state.user !== "boolean" &&
                            state.user.id
                        }`}
                    >
                        Your wishlist
                    </Link>
                </li>
            </ul>
            <ul className="user_menu__enquiries">
                <li>
                    <Link
                        to={`enquiries/${
                            state.user !== null &&
                            typeof state.user !== "boolean" &&
                            state.user.id
                        }`}
                    >
                        Your enquiries and Messages
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default ProfileMenu;
