import React, { FunctionComponent, useContext } from "react";
import { FaHeart } from "react-icons/fa";
import UserContext from "../myApp/context/UserContext";
import { CustomProduct } from "../myApp/store/PropertyReducer";

type WishlistControlsProps = {
    toggleWishlist(id: number): Promise<void>;
    prod: CustomProduct;
};

const WishlistControls: FunctionComponent<WishlistControlsProps> = ({
    toggleWishlist,
    prod,
}) => {
    const { state: userState, dispatch: userDispatch } =
        useContext(UserContext);
    return (
        <div
            className="wishlist__container"
            onClick={() => {
                toggleWishlist(prod.id);
            }}
        >
            <FaHeart
                className={
                    userState.addedProducts.find(
                        (el) => Number(el.id) === Number(prod.id)
                    )
                        ? "property__added"
                        : undefined
                }
            />
            <span>
                {!userState.addedProducts.find(
                    (el) => Number(el.id) === Number(prod.id)
                )
                    ? "Add to Wishlist"
                    : "Added to wishlish"}
            </span>
        </div>
    );
};

export default WishlistControls;
