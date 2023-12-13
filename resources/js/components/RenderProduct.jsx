import React from "react";
import { useNavigate } from "react-router-dom";

const RenderProduct = ({ prod }) => {
    const navigate = useNavigate();

    return (
        <li
            className="product"
            onClick={() => navigate(`/prod_view/${prod.id}`)}
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
