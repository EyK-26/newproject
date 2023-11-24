import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => (
    <>
        <Header />
        <div className="content">
            <Outlet />
        </div>
        <Footer />
    </>
);

export default Layout;
