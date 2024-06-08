import { IPagination } from "@/interfaces/product";
import React from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const Pagination = ({
  pagination,
  setPage,
}: {
  pagination?: IPagination;
  setPage: (page: number) => void;
}) => {
  if (!pagination) return null;

  const { currentPage, totalPages } = pagination;

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  const displayRange = 3;
  const showEllipsis = totalPages > displayRange * 2 + 1;

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={handlePrevClick}
          className={`${
            currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
          } relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextClick}
          className={`${
            currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
          } relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * pagination.limit + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(currentPage * pagination.limit, pagination.totalItems)}
            </span>{" "}
            of <span className="font-medium">{pagination.totalItems}</span>{" "}
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={handlePrevClick}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <FaAngleLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            {[...Array(totalPages)].map((_, index) => {
              if (
                index === 0 ||
                index === totalPages - 1 ||
                (index >= currentPage - displayRange &&
                  index <= currentPage + displayRange)
              ) {
                return (
                  <button
                    key={index}
                    onClick={() => setPage(index + 1)}
                    className={`${
                      currentPage === index + 1
                        ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              }
              if (
                showEllipsis &&
                (index === currentPage + displayRange + 1 ||
                  index === currentPage - displayRange - 1)
              ) {
                return (
                  <span key={index} className="px-2 py-2 text-gray-400">
                    ...
                  </span>
                );
              }
              return null;
            })}
            <button
              onClick={handleNextClick}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <FaAngleRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
