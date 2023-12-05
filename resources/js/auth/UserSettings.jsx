import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../myApp/context/UserContext";

const UserSettings = () => {
    const { id } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const { dispatch } = useContext(UserContext);

    const convertObject = (product) =>
        Object.keys(product).map(
            (attribute, index) =>
                /^name$|^email$|^created_at$/.test(attribute) && (
                    <li key={index}>
                        {attribute === "created_at"
                            ? `Member since: ${
                                  product[attribute].split(/T/)[0]
                              }`
                            : `${attribute}: ${product[attribute]}`}
                    </li>
                )
        );

    const fetchUser = async () => {
        try {
            const response = await axios.get("/api/user", { params: { id } });
            console.log(response.data);
            if (Math.floor(response.status / 100) === 2) {
                setUserDetails(response.data);
            }
        } catch (error) {
            console.log(error);
            // dispatch({
            //     type: "error/set",
            //     payload: error.response.data.errors,
            // });
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);
    return <ul>{userDetails && convertObject(userDetails)}</ul>;
};

export default UserSettings;
