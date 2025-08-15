const Pagination = ({
  currentPage,
  totalItem,
  limit,
  onPageChange,
}: {
  currentPage: number;
  totalItem: number;
  limit: number;
  onPageChange: (page: number) => void;
}) => {
  const totalPage = Math.ceil(totalItem / limit);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPage <= 9) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(currentPage - 4, 2);
      let end = Math.min(currentPage + 4, totalPage - 1);

      if (currentPage <= 5) {
        start = 2;
        end = 9;
      }

      if (currentPage >= totalPage - 4) {
        start = totalPage - 8;
        end = totalPage - 1;
      }

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPage - 1) {
        pages.push("...");
      }

      pages.push(totalPage);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center mt-8 mb-4 gap-4">
      <button
        className="bg-primary text-white px-2 py-1"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      {pageNumbers.map((num, idx) =>
        num === "..." ? (
          <span key={idx} className="px-2 py-1">
            ...
          </span>
        ) : (
          <button
            key={num}
            className={`px-2 py-1 border border-primary ${
              currentPage === num ? "bg-primary text-white" : ""
            }`}
            onClick={() => onPageChange(num as number)}
          >
            {num}
          </button>
        )
      )}

      <button
        className="bg-primary px-2 py-1 text-white"
        disabled={currentPage === totalPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
