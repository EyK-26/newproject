import React, { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import UserContext from "../myApp/context/UserContext";
import ProfileMenu from "./ProfileMenu";

const Profile = () => {
    const { state, dispatch } = useContext(UserContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleHover = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <div
            className="menu_container"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
        >
            <CgProfile className="profile__logo" />
            {menuOpen && <ProfileMenu />}
        </div>
    );
};

export default Profile;
