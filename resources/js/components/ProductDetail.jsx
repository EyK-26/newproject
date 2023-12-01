import React, { useContext } from "react";
import PropertyContext from "../myApp/context/PropertyContext";
import { Link } from "react-router-dom";
import ImageToggler from "./ImageToggler";

export const ProductDetail = ({ prod }) => {
    const { state } = useContext(PropertyContext);
    const styleGreen = { backgroundColor: "green" };
    const styleRed = { backgroundColor: "red" };

    return (
        <>
            {!prod ? (
                "Preview not available"
            ) : (
                <div className="selected_product">
                    <ImageToggler images={prod.images} name={prod.name} />
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
