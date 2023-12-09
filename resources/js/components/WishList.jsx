import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../myApp/context/UserContext";

const WishList = () => {
    const { id } = useParams();
    const { state, dispatch } = useContext(UserContext);

    const fetchProperty = async () => {
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
                    if (
                        !state.addedProducts.find((prod) => prod.id === prod_id)
                    ) {
                        try {
                            const innerResponse = await axios.get(
                                `https://estate-comparison.codeboot.cz/detail.php?id=${prod_id}`
                            );
                            dispatch({
                                type: "addedProducts/set",
                                payload: innerResponse.data,
                            });
                            counter++;
                            if (counter === outerResponse.data.length) {
                                dispatch({
                                    type: "spanMessage/unset",
                                });
                            }
                        } catch (error) {
                            dispatch({
                                type: "addedProducts/set",
                                payload: "an error produced, please try again",
                            });
                        }
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: "addedProducts/set",
                payload: "an error produced, please try again",
            });
        }
    };

    useEffect(() => {
        fetchProperty();
    }, []);

    return (
        <ul className="wishlist_container">
            {state.spanMessage && (
                <span className="span_message">{state.spanMessage}</span>
            )}
            {state.addedProducts.length > 0 &&
                state.addedProducts.map((prod) => (
                    <div className="wishlist_product" key={prod.id}>
                        <li>{prod.name}</li>
                        <img src={prod.images[0]} alt={prod.name} />
                        <Link to={`/prod_view/${prod.id}`}>See Property</Link>
                    </div>
                ))}
        </ul>
    );
};

export default WishList;
