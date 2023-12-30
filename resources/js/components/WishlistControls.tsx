import React, {
    FunctionComponent,
    useContext,
    useEffect,
    useState,
} from "react";
import { FaHeart } from "react-icons/fa";
import UserContext from "../myApp/context/UserContext";
import { CustomProduct } from "../myApp/store/PropertyReducer";
import axios from "axios";
import { Wish } from "../myApp/store/UserReducer";

type WishlistControlsProps = {
    toggleWishlist(id: number): Promise<void>;
    prod: CustomProduct;
};

const WishlistControls: FunctionComponent<WishlistControlsProps> = ({
    toggleWishlist,
    prod,
}) => {
    const { state, dispatch } = useContext(UserContext);
    const [wishlistData, setWishlistData] = useState<number[]>([]);
    const userLoggedInState =
        state.user !== null && typeof state.user !== "boolean" && state.user.id;
    const loggedInUserWishlist =
        state.user !== null &&
        typeof state.user !== "boolean" &&
        state.user.wishes;

    // const setWishlist = async (): Promise<void> => {
    //     try {
    //         const response = await axios.get("/api/set-wishlist", {
    //             params: {
    //                 id: userLoggedInState,
    //             },
    //         });
    //         setWishlistData(response.data);
    //     } catch (error) {
    //         dispatch({
    //             type: "spanMessage/set",
    //             payload: "an error occured",
    //         });
    //     }
    // };

    // useEffect(() => {
    //     setWishlist();
    // }, [userLoggedInProductsState]);

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
                        (el: Wish) => el.product_id === prod.id
                    )
                        ? "property__added"
                        : undefined
                }
            />
            <span>
                {Array.isArray(loggedInUserWishlist) &&
                !loggedInUserWishlist.find(
                    (el: Wish) => el.product_id === prod.id
                )
                    ? "Add to Wishlist"
                    : "Added to wishlish"}
            </span>
        </div>
    );
};

export default WishlistControls;
