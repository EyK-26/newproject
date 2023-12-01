import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageToggler from "./ImageToggler";
import { FaRegHeart } from "react-icons/fa";

const ProductView = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const addToWishlist = () => {};

    useEffect(() => {
        (async () => {
            const response = await axios.get(
                `https://estate-comparison.codeboot.cz/detail.php?id=${id}`
            );
            setProduct(response.data);
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
                        onClick={addToWishlist}
                    >
                        <FaRegHeart />
                        <span>Add to Wishlist</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductView;
