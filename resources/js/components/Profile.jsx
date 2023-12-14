import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import ProfileMenu from "./ProfileMenu";

const Profile = () => {
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
