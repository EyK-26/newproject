import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../myApp/context/UserContext";

const WishList = () => {
    const { id } = useParams();
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/get-wishlist-all", {
                    params: {
                        id,
                    },
                });
                if (Math.floor(response.status / 100) === 2) {
                    response.data.forEach(async (prod_id) => {
                        try {
                            const response = await axios.get(
                                `https://estate-comparison.codeboot.cz/detail.php?id=${prod_id}`
                            );
                            console.log(response.data);
                            dispatch({
                                type: "addedProducts/set",
                                payload: response.data,
                            });
                        } catch (error) {
                            console.log(error);
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <ul className="wishlist_products">
            {state.addedProducts.length > 0 &&
                state.addedProducts.map((prod) => (
                    <li key={prod.id}>{prod.name}</li>
                ))}
        </ul>
    );
};

export default WishList;
