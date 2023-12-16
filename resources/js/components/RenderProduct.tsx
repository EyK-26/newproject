import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../myApp/store/PropertyReducer";

interface RenderProductProps {
    prod: Product;
}

const RenderProduct: FunctionComponent<RenderProductProps> = ({ prod }) => {
    const navigate = useNavigate();

    return (
        <li
            className="product"
            onClick={(): void => navigate(`/prod_view/${prod.id}`)}
        >
            <img src={prod.images[0]} alt={prod.name_extracted} />
            <div className="name__container">
                <div className="name_container--spans">
                    <span>{prod.name_extracted} </span>
                    <span>{prod.locality}</span>
                </div>
                <div className="price">{prod.prize_czk} CZK</div>
            </div>
        </li>
    );
};

export default RenderProduct;
