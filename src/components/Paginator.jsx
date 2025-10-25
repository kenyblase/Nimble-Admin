// components/Paginator.jsx
const Paginator = ({ page, totalPages, setPage }) => {
  const getPaginationRange = () => {
    const range = [];
    const delta = 1;
    const totalNumbers = delta * 2 + 1;
    const totalBlocks = totalNumbers + 2;
    if (totalPages <= totalBlocks) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const left = Math.max(2, page - delta);
    const right = Math.min(totalPages - 1, page + delta);
    range.push(1);
    if (left > 2) range.push("prev-ellipsis");
    for (let i = left; i <= right; i++) range.push(i);
    if (right < totalPages - 1) range.push("next-ellipsis");
    range.push(totalPages);
    return range;
  };

  return (
    <div className="flex justify-end items-center gap-2 mt-6">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="text-gray-400 hover:text-gray-600 disabled:opacity-50 flex items-center"
      >
        ← Previous
      </button>

      {getPaginationRange().map((p, idx) => {
        if (p === "prev-ellipsis")
          return (
            <span
              key={`${idx}b`}
              onClick={() => setPage(Math.max(1, page - 3))}
              className="px-2 text-gray-500 cursor-pointer hover:text-gray-700"
            >
              ...
            </span>
          );
        if (p === "next-ellipsis")
          return (
            <span
              key={`${idx}a`}
              onClick={() => setPage(Math.min(totalPages, page + 3))}
              className="px-2 text-gray-500 cursor-pointer hover:text-gray-700"
            >
              ...
            </span>
          );
        return (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded ${
              p === page
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        );
      })}

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="text-gray-400 hover:text-gray-600 disabled:opacity-50 flex items-center"
      >
        Next →
      </button>
    </div>
  );
};

export default Paginator;