import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageToggler from "./ImageToggler";
import { FaHeart } from "react-icons/fa";
import UserContext from "../myApp/context/UserContext";
import EnquiryForm from "./EnquiryForm";

const ProductView = () => {
    const { id } = useParams();
    const { state } = useContext(UserContext);
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
            }
        } catch (error) {
            console.log(err);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    `https://estate-comparison.codeboot.cz/detail.php?id=${id}`
                );
                setProduct(response.data);
            } catch (err) {
                console.log(err);
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
                console.log(err);
            }
        })();
    }, []);

    const convertObject = (product) =>
        Object.keys(product).map((attribute, index) => {
            if (typeof product[attribute] !== "object") {
                return (
                    attribute !== "company_logo" && (
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
            <button onClick={() => navigate(-1)}>Back</button>
            <div className="product_view__container">
                {product && (
                    <>
                        <div className="controls__main">
                            <ImageToggler
                                images={product.images}
                                name={product.name}
                                mainview
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
                            {formOpen && <EnquiryForm id={id} />}
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
