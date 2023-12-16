import React, { FunctionComponent, useState } from "react";
import { CgProfile } from "react-icons/cg";
import ProfileMenu from "./ProfileMenu";

const Profile: FunctionComponent = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const handleHover = (): void => {
        setMenuOpen((prev): boolean => !prev);
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
