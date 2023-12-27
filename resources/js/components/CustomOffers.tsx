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
        <div key={prod.id} className="custom_products__container">
            <ul className="custom_product">
                <li>{prod.description}</li>
                <li>{prod.floor_area}</li>
                <li>{prod.land_area}</li>
                <li>{prod.price}</li>
                <li>{prod.locality}</li>
                <ImageToggler
                    images={prod.photo_path
                        .split(", ")
                        .map((path) => `/uploads/${path}`)}
                    name={prod.title}
                    mainview={false}
                />
            </ul>
        </div>
    ));

    return (
        <div>
            <Pagination products={renderedProducts} />
        </div>
    );
};

export default CustomOffers;
