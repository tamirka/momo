
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pageNumbers = [];
  // Logic to show a limited number of pages, e.g., first, last, current, and neighbors
  const pagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + pagesToShow - 1);
  if (endPage - startPage + 1 < pagesToShow) {
    startPage = Math.max(1, endPage - pagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-8 flex items-center justify-between" aria-label="Pagination">
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{' '}
          <span className="font-medium">{totalItems}</span> results
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <div className="hidden md:flex items-center mx-4">
            {startPage > 1 && (
                <>
                    <button onClick={() => handlePageClick(1)} className="px-4 py-2 text-sm text-gray-500">1</button>
                    {startPage > 2 && <span className="px-2 py-2 text-sm text-gray-500">...</span>}
                </>
            )}
            {pageNumbers.map((page) => (
                <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                    currentPage === page ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                >
                {page}
                </button>
            ))}
            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="px-2 py-2 text-sm text-gray-500">...</span>}
                    <button onClick={() => handlePageClick(totalPages)} className="px-4 py-2 text-sm text-gray-500">{totalPages}</button>
                </>
            )}
        </div>
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
