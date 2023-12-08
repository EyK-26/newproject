import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const WishList = () => {
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/get-wishlist-all", {
                    params: {
                        id,
                    },
                });
                if (Math.floor(response.status / 100) === 2) {
                    console.log(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return <div>WishList</div>;
};

export default WishList;
