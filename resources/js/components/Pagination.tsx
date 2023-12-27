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
        <>
            {content}
            {currentPage > 1 && (
                <button
                    onClick={(): void => {
                        setCurrentPage((prev): number => prev - 1);
                    }}
                >
                    previous
                </button>
            )}
            {currentPage < totalPages && (
                <button
                    onClick={(): void => {
                        setCurrentPage((prev): number => prev + 1);
                    }}
                >
                    next
                </button>
            )}
            <label htmlFor="contentPerPage">Number of Results per Page</label>
            <select
                name="contentPerPage"
                id="contentPerPage"
                defaultValue={contentPerPage}
                onChange={(e) => {
                    setContentPerPage(Number(e.target.value));
                }}
            >
                <option value={3} key="1">
                    3
                </option>
                <option value={5} key="2">
                    5
                </option>
                <option value={10} key="3">
                    10
                </option>
                <option value={20} key="4">
                    20
                </option>
            </select>
            <hr />
            <span>Results: {`${currentPage} of ${totalPages}`}</span>
        </>
    );
};

export default Pagination;
