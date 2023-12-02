import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageToggler from "./ImageToggler";
import { FaRegHeart } from "react-icons/fa";
import UserContext from "../myApp/context/UserContext";

const ProductView = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { state } = useContext(UserContext);
    const [added, setAdded] = useState(false);

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
        <div className="product_view__container">
            {product && (
                <>
                    <ImageToggler
                        images={product.images}
                        name={product.name}
                        mainview
                    />
                    <ul>{convertObject(product)}</ul>
                    <div
                        className="wishlist__container"
                        onClick={toggleWishlist}
                    >
                        <FaRegHeart
                            className={added ? "property__added" : undefined}
                        />
                        <span>Add to Wishlist</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductView;
