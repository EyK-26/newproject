import axios from "axios";
import React, {
    ChangeEvent,
    FunctionComponent,
    MutableRefObject,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import PropertyContext from "../myApp/context/PropertyContext";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import PriceRange from "./PriceRange";
import OrderElements from "./OrderElements";
import UserContext from "../myApp/context/UserContext";
import { CustomProduct } from "../myApp/store/PropertyReducer";
import WishlistControls from "./WishlistControls";
import { useNavigate } from "react-router-dom";
import ImageToggler from "./ImageToggler";

type CustomOffersProps = {
    fetchUserStatus(): void;
};

const CustomOffers: FunctionComponent<CustomOffersProps> = ({
    fetchUserStatus,
}) => {
    const { state: userState, dispatch: userDispatch } =
        useContext(UserContext);
    const { state, dispatch } = useContext(PropertyContext);
    const defaultPrice: number = 10000000;
    const [price, setPrice] = useState<number>(defaultPrice);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const userLoggedInState =
        userState.user !== null &&
        typeof userState.user !== "boolean" &&
        userState.user.id;

    const fetchCustomOffers = async (): Promise<void> => {
        try {
            const response = await axios.get("/api/custom-offers");
            dispatch({
                type: "customProducts/set",
                payload: response.data,
            });
            dispatch({
                type: "searchedCustomProducts/set",
                payload: response.data,
            });
        } catch (err) {
            userDispatch({
                type: "spanMessage/set",
                payload: "an error occured",
            });
        }
    };

    // const handleClick = (e, prod_id: number) => {
    //     //console.log(e);

    //     //console.log(!wishlistRef.current.contains(e.target));
    //     //console.log(!ImageTogglerRef.current.contains(e.target));
    //     console.log(ImageTogglerRef.current.contains(e.target));

    //     // if (cardRef.current && !cardRef.current.contains(e.target)) {
    //     //     console.log("dsadasda");
    //     //     return;
    //     // } else {
    //     //     navigate(`/prod_view/${prod_id}`);
    //     // }
    // };

    useEffect(() => {
        if (
            !(state.customProducts.length > 0) &&
            !(state.searchedCustomProducts.length > 0)
        ) {
            fetchCustomOffers();
        }
        // document.addEventListener("click", handleClick, true);
        // return () => {
        //     document.removeEventListener("click", handleClick, true);
        // };
    }, []);

    const toggleWishlist = async (id: number): Promise<void> => {
        try {
            const response = await axios.post("/api/toggle-wishlist", {
                offer_id: id,
                user_id: userLoggedInState,
            });
            if (Math.floor(response.status / 100) === 2) {
                if (response.data.message === "removed") {
                    userDispatch({
                        type: "addedProducts/unset",
                        payload: Number(id),
                    });
                } else if (response.data.message === "added") {
                    userDispatch({
                        type: "addedProducts/set",
                        payload: state.customProducts.find(
                            (el: CustomProduct) => Number(el.id) === Number(id)
                        ),
                    });
                }
                fetchUserStatus();
            }
        } catch (error: any) {
            userDispatch({
                type: "spanMessage/set",
                payload: error,
            });
        }
    };

    const renderedProducts: JSX.Element[] | JSX.Element =
        !state.searchedCustomProductsLoading ? (
            state.searchedCustomProducts.map((prod) => (
                <ul key={prod.id} className="custom_product">
                    <h4>{prod.title}</h4>
                    <ImageToggler
                        images={prod.photo_path
                            .split(", ")
                            .map((path) => `/uploads/${path}`)}
                        name={prod.title}
                        mainview={true}
                    />
                    <div className="custom_product_detail__container">
                        <div className="custom_product_detail">
                            <span>Item description: </span>
                            <li>{prod.description}</li>
                        </div>
                        <div className="details_controls">
                            <div>
                                <div className="custom_product_detail">
                                    <span>Floor area: </span>
                                    <li>{prod.floor_area}</li>
                                </div>
                                <div className="custom_product_detail">
                                    <span>Land area: </span>
                                    <li>{prod.land_area}</li>
                                </div>
                                <div className="custom_product_detail">
                                    <span>Price: </span>
                                    <li>{prod.price}</li>
                                </div>
                                <div className="custom_product_detail">
                                    <span>Locality: </span>
                                    <li>{prod.locality}</li>
                                </div>
                            </div>
                            {userLoggedInState && (
                                <WishlistControls
                                    toggleWishlist={toggleWishlist}
                                    prod={prod}
                                />
                            )}
                        </div>
                    </div>
                </ul>
            ))
        ) : (
            <span>Loading Products</span>
        );

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ): void => {
        switch (e.target.name) {
            case "search_locality":
                setSearchTerm(e.target.value);
                dispatch({
                    type: "customProductLocation/set",
                    payload: e.target.value,
                });
                break;
            case "price_range":
                setPrice(Number(e.target.value));
                dispatch({
                    type: "customProductPrice/set",
                    payload: Number(e.target.value),
                });
                break;
            case "order_by_price":
                dispatch({
                    type: "customProductPriceOrder/set",
                    payload: e.target.value,
                });
                break;
            case "order_by_locality":
                dispatch({
                    type: "customProductLocalityOrder/set",
                    payload: e.target.value,
                });
                break;
            case "order_by_title":
                dispatch({
                    type: "customProductTitleOrder/set",
                    payload: e.target.value,
                });
                break;
            default:
                break;
        }
    };

    return (
        <div className="custom_product__container">
            <div className="filters">
                <SearchBar
                    handleChange={handleChange}
                    searchTerm={searchTerm}
                />
                <PriceRange
                    handleChange={handleChange}
                    price={price}
                    defaultPrice={defaultPrice}
                />
                <OrderElements handleChange={handleChange} />
            </div>
            {!userState.spanMessage && (
                <Pagination products={renderedProducts} />
            )}
        </div>
    );
};

export default CustomOffers;
