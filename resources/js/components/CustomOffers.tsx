import axios from "axios";
import React, { FunctionComponent, useContext, useEffect } from "react";
import PropertyContext from "../myApp/context/PropertyContext";
import ImageToggler from "./ImageToggler";
import Pagination from "./Pagination";

const CustomOffers: FunctionComponent = () => {
    const { state, dispatch } = useContext(PropertyContext);
    const fetchCustomOffers = async (): Promise<void> => {
        const response = await axios.get("/api/custom-offers");
        console.log(response.data);
        dispatch({
            type: "customProducts/set",
            payload: response.data,
        });
    };

    useEffect(() => {
        fetchCustomOffers();
    }, []);

    const renderedProducts: JSX.Element[] = state.customProducts.map((prod) => (
        <ul key={prod.id} className="custom_product">
            <ImageToggler
                images={prod.photo_path
                    .split(", ")
                    .map((path) => `/uploads/${path}`)}
                name={prod.title}
                mainview={true}
            />
            <div className="custom_product__detail">
                <span>Item description: </span>
                <li>{prod.description}</li>
            </div>
            <div className="custom_product__detail">
                <span>Floor area: </span>
                <li>{prod.floor_area}</li>
            </div>
            <div className="custom_product__detail">
                <span>Land area: </span>
                <li>{prod.land_area}</li>
            </div>
            <div className="custom_product__detail">
                <span>Price: </span>
                <li>{prod.price}</li>
            </div>
            <div className="custom_product__detail">
                <span>Locality: </span>
                <li>{prod.locality}</li>
            </div>
        </ul>
    ));

    return <Pagination products={renderedProducts} />;
};

export default CustomOffers;
