import React, { ChangeEvent, FunctionComponent } from "react";

type OrderElementsProps = {
    handleOrderChange(e: ChangeEvent<HTMLSelectElement>): void;
};

const OrderElements: FunctionComponent<OrderElementsProps> = ({
    handleOrderChange,
}) => {
    return (
        <div className="order_by_container">
            <div className="order_by_element">
                <label htmlFor="order_by_price">Price</label>
                <select
                    name="order_by_price"
                    id="order_by_price"
                    onChange={handleOrderChange}
                >
                    <option value="price_asc" key="1">
                        Price (lowest to highest)
                    </option>
                    <option value="price_desc" key="1">
                        Price (highest to lowest)
                    </option>
                </select>
            </div>

            <div className="order_by_element">
                <label htmlFor="order_by_locality">Locality</label>
                <select
                    name="order_by_locality"
                    id="order_by_locality"
                    onChange={handleOrderChange}
                >
                    <option value="locality_asc" key="2">
                        Locality (A-Z)
                    </option>
                    <option value="locality_desc" key="2">
                        Locality (Z-A)
                    </option>
                </select>
            </div>

            <div className="order_by_element">
                <label htmlFor="order_by_title">Title</label>
                <select
                    name="order_by_title"
                    id="order_by_title"
                    onChange={handleOrderChange}
                >
                    <option value="title_asc" key="3">
                        Title (A-Z)
                    </option>
                    <option value="title_desc" key="3">
                        Title (Z-A)
                    </option>
                </select>
            </div>
        </div>
    );
};

export default OrderElements;
