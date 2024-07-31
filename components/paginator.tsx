import { FC, useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
  onPageChange,
}) => {
  const [pageInput, setPageInput] = useState(currentPage.toString());

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPageInput(value);
    }
  };

  const handleGoToPage = () => {
    const page = parseInt(pageInput, 10);
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    } else {
      alert("Invalid page number");
    }
  };

  return (
    <div className="flex flex-col items-end p-1">
      {/* Pagination Controls */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white p-1 rounded-lg disabled:opacity-50"
        >
          {/* Previous Arrow SVG */}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white p-1 rounded-lg disabled:opacity-50"
        >
          {/* Next Arrow SVG */}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <div className="flex items-center">
          <span className="text-lg mx-4">
            Page {currentPage} of {totalPages}
          </span>
          <input
            type="text"
            value={pageInput}
            onChange={handlePageInputChange}
            className="border border-gray-300 rounded-lg px-3 py-1 w-16"
            placeholder="Go to page"
          />
          <button
            onClick={handleGoToPage}
            className="bg-green-500 text-white px-4 py-1 rounded-lg ml-2"
          >
            Go
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Pagination;
