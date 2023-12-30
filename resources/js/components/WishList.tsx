import axios from "axios";
import React, { FunctionComponent, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../myApp/context/UserContext";

const WishList: FunctionComponent = () => {
    const { state } = useContext(UserContext);

    const userWishlist =
        state.user !== null &&
        typeof state.user !== "boolean" &&
        state.user.wishes;

    return (
        <ul className="wishlist_container">
            {state.spanMessage && (
                <span className="span_message">{state.spanMessage}</span>
            )}
            {Array.isArray(userWishlist) && userWishlist.length > 0 ? (
                userWishlist.map((prod) => (
                    <div className="wishlist_product" key={prod.offer.id}>
                        <li>{prod.offer.title}</li>
                        <img
                            src={`/uploads/${
                                prod.offer.photo_path.split(/,\s/)[0]
                            }`}
                            alt={prod.offer.title}
                        />
                        <Link to={`/prod_view/${prod.offer.id}`}>
                            See Property
                        </Link>
                    </div>
                ))
            ) : (
                <h2>Your Wishlist is empty.</h2>
            )}
        </ul>
    );
};

export default WishList;
