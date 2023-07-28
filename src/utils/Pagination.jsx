import React, { useState } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [pageLimit, setPageLimit] = useState(5);

  function handlePageClick(pageNumber) {
    onPageChange(pageNumber);
  }

  function renderPageNumbers() {
    const pageNumbers = [];
    const ellipsis = <span>...</span>;
    let startEllipsis = false;
    let endEllipsis = false;

    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage) {
        pageNumbers.push(
          <button
            className="bg-mainRed text-white rounded w-7 h-7"
            key={i}
            onClick={() => handlePageClick(i)}
            // disabled
          >
            {i}
          </button>
        );
      } else if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - pageLimit && i <= currentPage + pageLimit)
      ) {
        pageNumbers.push(
          <button
            className="shadow rounded  w-7 h-7"
            key={i}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      } else if (i < currentPage && !startEllipsis) {
        pageNumbers.push(ellipsis);
        startEllipsis = true;
      } else if (i > currentPage && !endEllipsis) {
        pageNumbers.push(ellipsis);
        endEllipsis = true;
      }
    }

    return pageNumbers;
  }
  return (
    <div className="flex  items-center justify-end space-x-2">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        className={currentPage === 1 && "cursor-not-allowed  text-gray-200"}
        disabled={currentPage === 1 ? true : false}
      >
        <i className="bx bx-md bx-chevron-left "></i>{" "}
      </button>

      {renderPageNumbers()}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        className={
          currentPage === totalPages && "cursor-not-allowed  text-gray-200"
        }
        disabled={currentPage === totalPages ? true : false}
      >
        <i className="bx bx-md bx-chevron-right "></i>
      </button>
    </div>
  );
};

export default Pagination;
