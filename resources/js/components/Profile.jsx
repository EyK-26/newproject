import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import UserContext from "../myApp/context/UserContext";

const Profile = () => {
    const { state, dispatch } = useContext(UserContext);

    const handleClick = () => {
        dispatch({
            type: "profileMenu/toggle",
            payload: !state.profileMenu,
        });
    };

    return <CgProfile className="profile__logo" onClick={handleClick} />;
};

export default Profile;
