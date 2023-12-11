import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../myApp/context/UserContext";

const WishList = () => {
    const { state, dispatch } = useContext(UserContext);

    const fetchProperty = async () => {
        state.user.wishes
            .map((el) => el.product_id)
            .forEach(async (prod_id) => {
                if (!state.addedProducts.find((el) => el.id === prod_id)) {
                    try {
                        const innerResponse = await axios.get(
                            `https://estate-comparison.codeboot.cz/detail.php?id=${prod_id}`
                        );
                        dispatch({
                            type: "addedProducts/set",
                            payload: innerResponse.data,
                        });
                    } catch (error) {
                        dispatch({
                            type: "spanMessage/set",
                            payload: "An error occurred, please try again",
                        });
                    }
                }
            });
    };

    useEffect(() => {
        fetchProperty();
    }, []);

    return (
        <ul className="wishlist_container">
            {state.spanMessage && (
                <span className="span_message">{state.spanMessage}</span>
            )}
            {state.addedProducts.length > 0 ? (
                state.addedProducts.map((prod) => (
                    <div className="wishlist_product" key={prod.id}>
                        <li>{prod.name}</li>
                        <img src={prod.images[0]} alt={prod.name} />
                        <Link to={`/prod_view/${prod.id}`}>See Property</Link>
                    </div>
                ))
            ) : (
                <h2>Your Wishlist is empty.</h2>
            )}
        </ul>
    );
};

export default WishList;
