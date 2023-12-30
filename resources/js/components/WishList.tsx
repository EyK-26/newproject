import axios from "axios";
import React, {
    FunctionComponent,
    useContext,
    useEffect,
    useState,
} from "react";
import { Link } from "react-router-dom";
import UserContext from "../myApp/context/UserContext";

const WishList: FunctionComponent = () => {
    const { state, dispatch } = useContext(UserContext);
    const userLoggedInState =
        state.user !== null && typeof state.user !== "boolean" && state.user.id;
    const [wishlistData, setWishlistData] = useState<number[]>([]);

    const setWishlist = async (): Promise<void> => {
        try {
            const response = await axios.get("/api/set-wishlist", {
                params: {
                    id: userLoggedInState,
                },
            });
            console.log(response.data);

            setWishlistData(response.data);
        } catch (error) {
            dispatch({
                type: "spanMessage/set",
                payload: "an error occured",
            });
        }
    };

    useEffect(() => {
        setWishlist();
    }, []);

    return (
        <ul className="wishlist_container">
            {state.spanMessage && (
                <span className="span_message">{state.spanMessage}</span>
            )}
            {wishlistData.length > 0 ? (
                state.addedProducts.map((prod) => (
                    <div className="wishlist_product" key={prod.id}>
                        {/* <li>{prod?.title}</li>
                        <img src={prod?.images[0]} alt={prod?.name} />
                        <Link to={`/prod_view/${prod?.id}`}>See Property</Link> */}
                    </div>
                ))
            ) : (
                <h2>Your Wishlist is empty.</h2>
            )}
        </ul>
    );
};

export default WishList;
