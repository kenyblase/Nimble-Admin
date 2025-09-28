const DisputeAuditTable = ({logs, page=1, totalPages, onPageChange:setPage}) => {

  const getPaginationRange = () => {
  const range = [];
  const delta = 1; // neighbors each side of current page
  const totalNumbers = delta * 2 + 1; // current + neighbors
  const totalBlocks = totalNumbers + 2; // first & last

  if (totalPages <= totalBlocks) {
    // small page count, show all
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const left = Math.max(2, page - delta);
  const right = Math.min(totalPages - 1, page + delta);

  range.push(1);

  if (left > 2) {
    range.push("prev-ellipsis");
  }

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < totalPages - 1) {
    range.push("next-ellipsis");
  }

  range.push(totalPages);

  return range;
};


  return (
    <>
      {logs.length > 0 && (
      <div>
        <table className="w-full border-collapse border">
          <thead className="bg-[#F5F5F5] text-[#666666]">
            <tr className="text-left">
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Admin ID</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Request Id</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Meeting Creator</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Meeting Type</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Action Taken</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Admin Reason</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Date</th>            
            </tr>
          </thead>
          <tbody>
            {logs.map((l, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E] max-w-40 truncate">
                  <span >{l.adminId}</span>
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E] max-w-40 truncate">
                    <span >{l.requestId}</span>
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base">
                {l.creator}
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base">
                {l.meetingType}
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base">
                {l.action}
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E] max-w-72 truncate">
                    <span >{l.reason}</span>
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E]">{l.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-2 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50 flex items-center"
          >
            ← Previous
          </button>

          {getPaginationRange().map((p, idx) => {
            if (p === "prev-ellipsis") {
              return (
                <span
                  key={`${idx}b`}
                  onClick={() => setPage(Math.max(1, page - 3))}
                  className="px-2 text-gray-500 cursor-pointer hover:text-gray-700"
                >
                  ...
                </span>
              );
            }
            if (p === "next-ellipsis") {
              return (
                <span
                  key={`${idx}a`}
                  onClick={() => setPage(Math.min(totalPages, page + 3))}
                  className="px-2 text-gray-500 cursor-pointer hover:text-gray-700"
                >
                  ...
                </span>
              );
            }
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded ${
                  p === page ? "bg-blue-100 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"
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
      </div>)}
    </>
  );
};

export default DisputeAuditTable