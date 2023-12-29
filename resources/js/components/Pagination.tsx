import React, { ChangeEvent, FunctionComponent, useState } from "react";

type PaginationProps = {
    products: JSX.Element[];
};

const Pagination: FunctionComponent<PaginationProps> = ({ products }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [contentPerPage, setContentPerPage] = useState<number>(5);
    const totalPages: number = Math.ceil(products.length / contentPerPage);
    const startIndex: number = (currentPage - 1) * contentPerPage;
    const endIndex: number = startIndex + contentPerPage;
    const content: Array<JSX.Element> = products.slice(startIndex, endIndex);

    return (
        <>
            <div className="pagination_controls">
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
                <div className="content_per_page_controller">
                    <label htmlFor="contentPerPage">
                        Number of Results per Page
                    </label>
                    <select
                        name="contentPerPage"
                        id="contentPerPage"
                        defaultValue={contentPerPage}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            setCurrentPage(1);
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
                </div>
                <span>Results: {`${currentPage} of ${totalPages}`}</span>
            </div>
            {content.length > 0 ? content : <span>no property available</span>}
        </>
    );
};

export default Pagination;
