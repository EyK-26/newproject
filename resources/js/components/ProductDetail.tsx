import React, { FunctionComponent, useContext } from "react";
import PropertyContext from "../myApp/context/PropertyContext";
import { Link } from "react-router-dom";
import ImageToggler from "./ImageToggler";
import { Product } from "../myApp/store/PropertyReducer";

interface ProductDetailProps {
    prod: Product;
}

export const ProductDetail: FunctionComponent<ProductDetailProps> = ({
    prod,
}) => {
    const { state } = useContext(PropertyContext);

    return (
        <>
            {!prod ? (
                "Preview not available"
            ) : (
                <div className="selected_product">
                    <ImageToggler
                        images={prod.images}
                        name={prod.name}
                        mainview={false}
                    />
                    <div>{prod.name}</div>
                    <ul className="product_details">
                        <li
                            className={
                                prod.prize_czk === state.lowestPrice()
                                    ? "advantage"
                                    : "disadvantage"
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
                            className={
                                prod.building_area === state.highestFloorArea()
                                    ? "advantage"
                                    : "disadvantage"
                            }
                        >
                            <div>Floor area</div>
                            <div>
                                {prod.building_area} m<sup>2</sup>
                            </div>
                        </li>
                        <li
                            className={
                                prod.land_area === state.highestLandArea()
                                    ? "advantage"
                                    : "disadvantage"
                            }
                        >
                            <div>Land area</div>
                            <div>
                                {prod.land_area} m<sup>2</sup>
                            </div>
                        </li>
                        <li className="product__company">
                            {prod.company_logo && prod.company_name ? (
                                <>
                                    <img
                                        src={prod.company_logo}
                                        alt={prod.company_name}
                                    />
                                    <div>{prod.company_name}</div>
                                </>
                            ) : (
                                <div>No agency info</div>
                            )}
                        </li>
                    </ul>
                    <Link to={`prod_view/${prod.id}`}>View Property</Link>
                </div>
            )}
        </>
    );
};
