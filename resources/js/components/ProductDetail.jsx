import React, { useContext, useState } from "react";
import PropertyContext from "../myApp/context/PropertyContext";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export const ProductDetail = ({ prod }) => {
    const { state } = useContext(PropertyContext);
    const styleGreen = { backgroundColor: "green" };
    const styleRed = { backgroundColor: "red" };
    const [imageIndex, setImageIndex] = useState(0);

    console.log(prod.images);

    return (
        <>
            {!prod ? (
                "Preview not available"
            ) : (
                <div className="selected_product">
                    <div className="image__container">
                        <FaArrowLeft
                            className="arrowLeft"
                            onClick={() => {
                                if (imageIndex > 0)
                                    setImageIndex((prev) => prev - 1);
                            }}
                        />
                        <img src={prod.images[imageIndex]} alt={prod.name} />
                        <FaArrowRight
                            className="arrowRight"
                            onClick={() => {
                                if (imageIndex < prod.images.length - 1)
                                    setImageIndex((prev) => prev + 1);
                            }}
                        />
                    </div>
                    <div>{prod.name}</div>
                    <ul className="product_details">
                        <li
                            style={
                                prod.prize_czk == state.lowestPrice()
                                    ? styleGreen
                                    : styleRed
                            }
                        >
                            <div>Price</div>
                            <div>{prod.prize_czk} CZK</div>
                        </li>
                        <li>
                            <div>Locality</div>
                            <div>{prod.locality}</div>
                        </li>
                        <li
                            style={
                                prod.building_area == state.highestFloorArea()
                                    ? styleGreen
                                    : styleRed
                            }
                        >
                            <div>Floor area</div>
                            <div>
                                {prod.building_area} m<sup>2</sup>
                            </div>
                        </li>
                        <li
                            style={
                                prod.land_area == state.highestLandArea()
                                    ? styleGreen
                                    : styleRed
                            }
                        >
                            <div>Land area</div>
                            <div>
                                {prod.land_area} m<sup>2</sup>
                            </div>
                        </li>
                        <li className="product__company">
                            <img
                                src={prod?.company_logo}
                                alt={prod?.company_name}
                            />
                            <div>{prod?.company_name}</div>
                        </li>
                    </ul>
                    <Link to={`prod_view/${prod.id}`}>View Property</Link>
                </div>
            )}
        </>
    );
};
