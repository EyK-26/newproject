import React, { FunctionComponent, useState } from "react";

interface PaginationProps {
    products: JSX.Element[];
}

const Pagination: FunctionComponent<PaginationProps> = ({ products }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [contentPerPage, setContentPerPage] = useState<number>(3);
    const totalPages = Math.ceil(products.length / contentPerPage);
    const startIndex = (currentPage - 1) * contentPerPage;
    const endIndex = startIndex + contentPerPage;
    const content = products.slice(startIndex, endIndex);

    return (
        <div>   
            {products[]}
            <button>previous</button>
            <button>next</button>
        </div>
    );
};

export default Pagination;
