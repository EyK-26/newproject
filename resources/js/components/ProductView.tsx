import axios from "axios";
import React, {
    FunctionComponent,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageToggler from "./ImageToggler";
import { FaHeart } from "react-icons/fa";
import UserContext from "../myApp/context/UserContext";
import EnquiryForm from "./EnquiryForm";
import { Product } from "../myApp/store/PropertyReducer";

interface ProductViewProps {
    fetchUserStatus(): void;
}

const ProductView: FunctionComponent<ProductViewProps> = ({
    fetchUserStatus,
}) => {
    const { id } = useParams();
    const { state, dispatch } = useContext(UserContext);
    const [product, setProduct] = useState<Product | null>(null);
    const [added, setAdded] = useState<boolean>(false);
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const toggleWishlist = async () => {
        try {
            const response = await axios.post("/api/toggle-wishlist", {
                offer_id: id,
                user_id:
                    state.user !== null &&
                    typeof state.user !== "boolean" &&
                    state.user.id,
            });
            if (Math.floor(response.status / 100) === 2) {
                setAdded((prev) => !prev);
                if (response.data.message.includes("removed")) {
                    dispatch({
                        type: "addedProducts/unset",
                        payload: Number(id),
                    });
                }
                fetchUserStatus();
            }
        } catch (error: any) {
            dispatch({
                type: "spanMessage/set",
                payload: error,
            });
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    `https://estate-comparison.codeboot.cz/detail.php?id=${id}`
                );
                setProduct(response.data);
            } catch (error: any) {
                dispatch({
                    type: "spanMessage/set",
                    payload: error,
                });
            }
        })();
        (async () => {
            try {
                const response = await axios.get("/api/get-wishlist", {
                    params: {
                        offer_id: id,
                        user_id:
                            state.user !== null &&
                            typeof state.user !== "boolean" &&
                            state.user.id,
                    },
                });
                if (Math.floor(response.status / 100) === 2) {
                    setAdded(response.data);
                }
            } catch (error: any) {
                dispatch({
                    type: "spanMessage/set",
                    payload: error,
                });
            }
        })();
    }, []);

    const convertObject: any = (product: Product) =>
        Object.keys(product).map((attribute: string, index: number) => {
            if (typeof product[attribute as keyof Product] !== "object") {
                return (
                    attribute !== "company_logo" &&
                    attribute !== "id" &&
                    attribute !== "lat" &&
                    attribute !== "lon" &&
                    attribute !== "name_extracted" && (
                        <li key={index}>
                            {attribute}:{" "}
                            {product[attribute as keyof Product] || "unknown"}
                        </li>
                    )
                );
            } else if (attribute !== "images") {
                return (
                    product[attribute as keyof Product] &&
                    convertObject(product[attribute as keyof Product])
                );
            }
        });

    return (
        <>
            {state.spanMessage && (
                <span className="span_message">{state.spanMessage}</span>
            )}
            <button onClick={(): void => navigate(-1)}>Back</button>
            <div className="product_view__container">
                {product && (
                    <>
                        <div className="controls__main">
                            <ImageToggler
                                images={product.images}
                                name={product.name}
                                mainview={true}
                            />
                            <div className="controls_wishlist">
                                <div
                                    className="wishlist__container"
                                    onClick={toggleWishlist}
                                >
                                    <FaHeart
                                        className={
                                            added
                                                ? "property__added"
                                                : undefined
                                        }
                                    />
                                    <span>
                                        {!added
                                            ? "Add to Wishlist"
                                            : "Added to wishlish"}
                                    </span>
                                </div>
                                <button
                                    onClick={(): void => {
                                        setFormOpen((prev): boolean => !prev);
                                    }}
                                >
                                    Make Enquiry
                                </button>
                            </div>
                            {formOpen && (
                                <EnquiryForm
                                    id={Number(id)}
                                    setFormOpen={setFormOpen}
                                    fetchUserStatus={fetchUserStatus}
                                />
                            )}
                        </div>
                        <div className="property__details">
                            <h3>Property Details</h3>
                            <ul>{convertObject(product)}</ul>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default ProductView;
