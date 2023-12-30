import React, { FunctionComponent, useContext } from "react";
import PropertyContext from "../myApp/context/PropertyContext";
import ImageToggler from "./ImageToggler";
import WishlistControls from "./WishlistControls";

type RenderedCustomOffersProps = {
    userLoggedInState: number | false;
    toggleWishlist(id: number): Promise<void>;
};

const RenderedCustomOffers: FunctionComponent<RenderedCustomOffersProps> = ({
    userLoggedInState,
    toggleWishlist,
}) => {
    const { state, dispatch } = useContext(PropertyContext);

    const renderedProducts: JSX.Element[] | JSX.Element =
        !state.searchedCustomProductsLoading ? (
            state.searchedCustomProducts.map((prod) => (
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
                            {userLoggedInState && (
                                <WishlistControls
                                    toggleWishlist={toggleWishlist}
                                    prod={prod}
                                />
                            )}
                        </div>
                    </div>
                </ul>
            ))
        ) : (
            <span>Loading Products</span>
        );

    return renderedProducts;
};

export default RenderedCustomOffers;
