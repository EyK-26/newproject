import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import UserContext from "../myApp/context/UserContext";
import ProfileMenu from "../components/ProfileMenu";

const Layout = () => {
    const { state } = useContext(UserContext);

    return (
        <>
            <Header />
            {state.profileMenu && <ProfileMenu />}
            <div className="content">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default Layout;
