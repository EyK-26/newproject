import React, {
    FunctionComponent,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomProduct } from "../myApp/store/PropertyReducer";
import UserContext from "../myApp/context/UserContext";
import axios from "axios";
import ImageToggler from "./ImageToggler";
import { FaHeart } from "react-icons/fa";
import EnquiryForm from "./EnquiryForm";
import PropertyContext from "../myApp/context/PropertyContext";

type CustomProductViewProps = {
    fetchUserStatus(): void;
};

const CustomProductView: FunctionComponent<CustomProductViewProps> = ({
    fetchUserStatus,
}) => {
    const { id } = useParams();
    const { state: userState, dispatch: userDispatch } =
        useContext(UserContext);
    const { state } = useContext(PropertyContext);
    const [product, setProduct] = useState<CustomProduct | null>(null);
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [added] = useState<boolean>(false);
    const navigate = useNavigate();
    const userLoggedInState =
        userState.user !== null &&
        typeof userState.user !== "boolean" &&
        userState.user.id;
    const userLoggedInLanguage =
        userState.user !== null &&
        typeof userState.user !== "boolean" &&
        userState.user.language;

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
            }
        } catch (error: any) {
            userDispatch({
                type: "spanMessage/set",
                payload: error,
            });
        }
    };

    const fetchCustomProduct = async (): Promise<void> => {
        try {
            const response = await axios.get("/api/custom-product/", {
                params: {
                    id,
                },
            });
            if (Math.floor(response.status / 100) === 2) {
                setProduct(response.data);
            }
        } catch (error: any) {
            userDispatch({
                type: "spanMessage/set",
                payload: error,
            });
        }
    };

    useEffect(() => {
        fetchCustomProduct();
    }, [userLoggedInLanguage]);

    const convertObject: any = (product: CustomProduct): ReactNode =>
        Object.keys(product).map((attribute: string, index: number) => {
            if (typeof product[attribute as keyof CustomProduct] !== "object") {
                if (attribute === "name") {
                    return (
                        <li key={index}>
                            Owner:{" "}
                            {String(
                                product[attribute as keyof CustomProduct]
                            ) || "unknown"}
                        </li>
                    );
                } else if (attribute === "created_at") {
                    const regex = /^(\d{4})-(\d+)-(\d+)T.*$/;
                    const match: string[] | null = String(
                        product[attribute as keyof CustomProduct]
                    ).match(regex);
                    return (
                        <li key={index}>
                            {match &&
                                `Posted at ${match[3]}/${match[2]}/${match[1]}`}
                        </li>
                    );
                }
                return (
                    attribute !== "photo_path" &&
                    attribute !== "id" &&
                    attribute !== "updated_at" && (
                        <li key={index}>
                            {attribute}:{" "}
                            {String(
                                product[attribute as keyof CustomProduct]
                            ) || "unknown"}
                        </li>
                    )
                );
            } else {
                return (
                    product[attribute as keyof CustomProduct] &&
                    convertObject(product[attribute as keyof CustomProduct])
                );
            }
        });

    return (
        <>
            {userState.spanMessage && (
                <span className="span_message">{userState.spanMessage}</span>
            )}
            <button onClick={(): void => navigate(-1)}>Back</button>
            <div className="product_view__container">
                {product && (
                    <>
                        <div className="controls__main">
                            <ImageToggler
                                images={product.photo_path
                                    .split(", ")
                                    .map((path) => `/uploads/${path}`)}
                                name={product.title}
                                mainview={true}
                            />
                            <div className="controls_wishlist">
                                <div
                                    className="wishlist__container"
                                    onClick={() => {
                                        toggleWishlist;
                                    }}
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

export default CustomProductView;
