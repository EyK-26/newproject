import axios from "axios";
import React, { FunctionComponent, useCallback, useEffect } from "react";

const CustomOffers: FunctionComponent = () => {
    const fetchCustomOffers = async (): Promise<void> => {
        const response = await axios.get("/api/custom-offers");
        console.log(response.data);
    };

    useEffect(() => {
        fetchCustomOffers();
    }, []);

    

    return <div>CustomOffers</div>;
};

export default CustomOffers;
