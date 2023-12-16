import React, {
    ChangeEvent,
    FunctionComponent,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import PropertyContext from "../myApp/context/PropertyContext";
import SearchBar from "./SearchBar";
import PriceRange from "./PriceRange";
import RenderProduct from "./RenderProduct";
import axios from "axios";

const SearchProductsAll: FunctionComponent = () => {
    const { state, dispatch } = useContext(PropertyContext);
    const defaultPrice: number = 5000000;
    const [price, setPrice] = useState<number>(defaultPrice);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const fetchSearchedProducts = useCallback(async (): Promise<void> => {
        try {
            const response = await axios.get(
                "https://estate-comparison.codeboot.cz/list.php"
            );
            dispatch({
                type: "searchedProducts/set",
                payload: response.data,
            });
        } catch (err: any) {
            dispatch({
                type: "error/set",
                payload: err.response,
            });
        }
    }, [dispatch]);

    useEffect(() => {
        if (state.searchedProducts.length === 0) fetchSearchedProducts();
    }, [fetchSearchedProducts]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        switch (e.target.name) {
            case "search_locality":
                setSearchTerm(e.target.value);
                if (e.target.value === "") {
                    dispatch({
                        type: "searchedProducts/set",
                        payload: [...state.products],
                    });
                } else {
                    dispatch({
                        type: "location/set",
                        payload: e.target.value,
                    });
                }
                break;
            case "price_range":
                setPrice(Number(e.target.value));
                if (Number(e.target.value) === defaultPrice) {
                    dispatch({
                        type: "searchedProducts/set",
                        payload: state.products,
                    });
                } else {
                    dispatch({
                        type: "price/set",
                        payload: Number(e.target.value),
                    });
                }
                break;
            default:
                break;
        }
    };

    const renderedSearchedProducts = !state.searchedProductsLoading ? (
        state.searchedProducts.length > 0 ? (
            state.searchedProducts.map((prod) => (
                <RenderProduct key={prod.id} prod={prod} />
            ))
        ) : (
            <span>No Property available at the moment</span>
        )
    ) : (
        <span>Loading Properties...</span>
    );

    return (
        <div className="products_all">
            <div className="filters">
                <SearchBar
                    handleChange={handleChange}
                    searchTerm={searchTerm}
                />
                <PriceRange
                    handleChange={handleChange}
                    price={price}
                    defaultPrice={defaultPrice}
                />
            </div>
            <ul className="products_all__container">
                {!state.error && renderedSearchedProducts}
            </ul>
        </div>
    );
};

export default SearchProductsAll;
