import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../myApp/context/UserContext";

const WishList = () => {
    const { id } = useParams();
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {
        (async () => {
            dispatch({
                type: "spanMessage/set",
                payload: "Loading list...",
            });
            try {
                const outerResponse = await axios.get("/api/get-wishlist-all", {
                    params: {
                        id,
                    },
                });
                if (Math.floor(outerResponse.status / 100) === 2) {
                    let counter = 0;
                    outerResponse.data.forEach(async (prod_id) => {
                        try {
                            const innerResponse = await axios.get(
                                `https://estate-comparison.codeboot.cz/detail.php?id=${prod_id}`
                            );
                            dispatch({
                                type: "addedProducts/set",
                                payload: innerResponse.data,
                            });
                            counter++;
                        } catch (error) {
                            dispatch({
                                type: "addedProducts/set",
                                payload: "an error produced, please try again",
                            });
                        }
                        if (counter === outerResponse.data.length) {
                            console.log("run");
                            dispatch({
                                type: "spanMessage/unset",
                            });
                        }
                    });
                }
            } catch (error) {
                dispatch({
                    type: "addedProducts/set",
                    payload: "an error produced, please try again",
                });
            }
        })();
    }, []);

    return (
        <div className="wishlist_container">
            {state.spanMessage && (
                <span className="span_message">{state.spanMessage}</span>
            )}
            <ul className="wishlist_products">
                {state.addedProducts.length > 0 &&
                    state.addedProducts.map((prod) => (
                        <li key={prod.id}>{prod.name}</li>
                    ))}
            </ul>
        </div>
    );
};

export default WishList;
