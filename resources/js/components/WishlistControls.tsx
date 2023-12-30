import React, { FunctionComponent, LegacyRef, useContext } from "react";
import { FaHeart } from "react-icons/fa";
import UserContext from "../myApp/context/UserContext";
import { CustomProduct } from "../myApp/store/PropertyReducer";
import { Wish } from "../myApp/store/UserReducer";

type WishlistControlsProps = {
    toggleWishlist(id: number): Promise<void>;
    prod: CustomProduct;
};

const WishlistControls: FunctionComponent<WishlistControlsProps> = ({
    toggleWishlist,
    prod,
}) => {
    const { state } = useContext(UserContext);
    const loggedInUserWishlist =
        state.user !== null &&
        typeof state.user !== "boolean" &&
        state.user.wishes;

    return (
        <div
            className="wishlist__container"
            onClick={() => {
                toggleWishlist(prod.id);
            }}
        >
            <FaHeart
                className={
                    Array.isArray(loggedInUserWishlist) &&
                    loggedInUserWishlist.find(
                        (el: Wish) => el.offer_id === prod.id
                    )
                        ? "property__added"
                        : undefined
                }
            />
            <span>
                {Array.isArray(loggedInUserWishlist) &&
                !loggedInUserWishlist.find(
                    (el: Wish) => el.offer_id === prod.id
                )
                    ? "Add to Wishlist"
                    : "Added to wishlish"}
            </span>
        </div>
    );
};

export default WishlistControls;
