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
            {content}
            <button
                onClick={(): void => {
                    setCurrentPage((prev): number => prev - 1);
                }}
            >
                previous
            </button>
            <button
                onClick={(): void => {
                    setCurrentPage((prev): number => prev + 1);
                }}
            >
                next
            </button>
            <span>Results: {`${currentPage} of ${totalPages}`}</span>
        </div>
    );
};

export default Pagination;
