import axios from "axios";
import React, {
    ChangeEvent,
    FunctionComponent,
    useContext,
    useEffect,
    useState,
} from "react";
import PropertyContext from "../myApp/context/PropertyContext";
import ImageToggler from "./ImageToggler";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import PriceRange from "./PriceRange";
import OrderElements from "./OrderElements";
import { FaHeart } from "react-icons/fa";
import UserContext from "../myApp/context/UserContext";

const CustomOffers: FunctionComponent = () => {
    const { state: userState, dispatch: userDispatch } =
        useContext(UserContext);
    const { state, dispatch } = useContext(PropertyContext);
    const defaultPrice: number = 10000000;
    const [price, setPrice] = useState<number>(defaultPrice);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [added, setAdded] = useState<boolean>(false);

    const fetchCustomOffers = async (): Promise<void> => {
        const response = await axios.get("/api/custom-offers");
        dispatch({
            type: "customProducts/set",
            payload: response.data,
        });
        dispatch({
            type: "searchedCustomProducts/set",
            payload: response.data,
        });
    };

    useEffect(() => {
        fetchCustomOffers();
    }, []);

    const toggleWishlist = async (id: number) => {
        try {
            const response = await axios.post("/api/toggle-wishlist", {
                product_id: id,
                user_id:
                    userState.user !== null &&
                    typeof userState.user !== "boolean" &&
                    userState.user.id,
            });
            if (Math.floor(response.status / 100) === 2) {
                setAdded((prev) => !prev);
                if (response.data.message.includes("removed")) {
                    userDispatch({
                        type: "addedProducts/unset",
                        payload: Number(id),
                    });
                }
                // fetchUserStatus();
            }
        } catch (error: any) {
            userDispatch({
                type: "spanMessage/set",
                payload: error,
            });
        }
    };

    const renderedProducts: JSX.Element[] = state.searchedCustomProducts.map(
        (prod) => (
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
                        <div
                            className="wishlist__container"
                            onClick={toggleWishlist.bind(null, prod.id)}
                        >
                            <FaHeart
                            // className={added ? "property__added" : undefined}
                            />
                            <span>
                                Add to Wishlist
                                {/* {!added ? "Add to Wishlist" : "Added to wishlish"} */}
                            </span>
                        </div>
                    </div>
                </div>
            </ul>
        )
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
            <Pagination products={renderedProducts} />
        </div>
    );
};

export default CustomOffers;
