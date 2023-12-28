import React, { ChangeEvent, FunctionComponent } from "react";

type OrderElementsProps = {
    handleChange(e: ChangeEvent<HTMLSelectElement>): void;
};

const OrderElements: FunctionComponent<OrderElementsProps> = ({
    handleChange,
}) => {
    return (
        <div className="order_by_container">
            <div className="order_by_element">
                <label htmlFor="order_by_price">Price</label>
                <select
                    name="order_by_price"
                    id="order_by_price"
                    onChange={handleChange}
                >
                    <option value={undefined} key="1">
                        select
                    </option>
                    <option value={"asc"} key="2">
                        Price (lowest to highest)
                    </option>
                    <option value={"desc"} key="3">
                        Price (highest to lowest)
                    </option>
                </select>
            </div>

            <div className="order_by_element">
                <label htmlFor="order_by_locality">Locality</label>
                <select
                    name="order_by_locality"
                    id="order_by_locality"
                    onChange={handleChange}
                >
                    <option value={undefined} key="1">
                        select
                    </option>
                    <option value={"asc"} key="2">
                        Locality (A-Z)
                    </option>
                    <option value={"desc"} key="3">
                        Locality (Z-A)
                    </option>
                </select>
            </div>

            <div className="order_by_element">
                <label htmlFor="order_by_title">Title</label>
                <select
                    name="order_by_title"
                    id="order_by_title"
                    onChange={handleChange}
                >
                    <option value={undefined} key="1">
                        select
                    </option>
                    <option value={"asc"} key="2">
                        Title (A-Z)
                    </option>
                    <option value={"desc"} key="3">
                        Title (Z-A)
                    </option>
                </select>
            </div>
        </div>
    );
};

export default OrderElements;
