import axios from "axios";
import React, {
    FunctionComponent,
    useContext,
    useEffect,
    useState,
} from "react";
import PropertyContext from "../myApp/context/PropertyContext";
import ImageToggler from "./ImageToggler";
import { render } from "react-dom";

const CustomOffers: FunctionComponent = () => {
    const { state, dispatch } = useContext(PropertyContext);
    const [page, setPage] = useState<number>(0);
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

    const renderedProducts = state.customProducts.map((prod) => (
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
            {renderedProducts[page]}
            <button
                onClick={() => {
                    setPage((prev) => prev - 1);
                }}
            >
                previous
            </button>
            <button
                onClick={() => {
                    setPage((prev) => prev + 1);
                }}
            >
                next
            </button>
            <span>
                page {page + 1} / {renderedProducts.length}
            </span>
        </div>
    );
};

export default CustomOffers;
