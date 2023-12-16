import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageToggler from "./ImageToggler";
import { FaHeart } from "react-icons/fa";
import UserContext from "../myApp/context/UserContext";
import EnquiryForm from "./EnquiryForm";

const ProductView = ({ fetchUserStatus }) => {
    const { id } = useParams();
    const { state, dispatch } = useContext(UserContext);
    const [product, setProduct] = useState(null);
    const [added, setAdded] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const navigate = useNavigate(-1);

    const toggleWishlist = async () => {
        try {
            const response = await axios.post("/api/toggle-wishlist", {
                product_id: id,
                user_id: state.user.id,
            });
            if (Math.floor(response.status / 100) === 2) {
                setAdded((prev) => !prev);
                if (response.data.message.includes("removed")) {
                    dispatch({
                        type: "addedProducts/unset",
                        payload: id,
                    });
                }
                fetchUserStatus();
            }
        } catch (error) {
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
            } catch (error) {
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
                        product_id: id,
                        user_id: state.user.id,
                    },
                });
                if (Math.floor(response.status / 100) === 2) {
                    setAdded(response.data);
                }
            } catch (error) {
                dispatch({
                    type: "spanMessage/set",
                    payload: error,
                });
            }
        })();
    }, []);

    const convertObject = (product) =>
        Object.keys(product).map((attribute, index) => {
            if (typeof product[attribute] !== "object") {
                return (
                    attribute !== "company_logo" &&
                    attribute !== "id" &&
                    attribute !== "lat" &&
                    attribute !== "lon" &&
                    attribute !== "name_extracted" && (
                        <li key={index}>
                            {attribute}: {product[attribute] || "unknown"}
                        </li>
                    )
                );
            } else if (attribute !== "images") {
                return product[attribute] && convertObject(product[attribute]);
            }
        });

    return (
        <>
            {state.spanMessage && (
                <span className="span_message">{state.spanMessage}</span>
            )}
            <button onClick={() => navigate(-1)}>Back</button>
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
                                    onClick={() => {
                                        setFormOpen((prev) => !prev);
                                    }}
                                >
                                    Make Enquiry
                                </button>
                            </div>
                            {formOpen && (
                                <EnquiryForm
                                    id={id}
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
