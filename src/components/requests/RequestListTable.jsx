import EmptyUserList from "../user-management/EmptyUserList";

const RequestListTable = ({requests, page=1, totalPages, onPageChange:setPage}) => {

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
      {requests.length > 0 ? (
      <div>
        <table className="w-full border-collapse border">
          <thead className="bg-[#0057FF] text-white">
            <tr className="text-left">
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Created By</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Gender / Age range</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Creator Location</th>
              <th className="p-3 border-t border-l border-r border-[#EBEBEB] font-semibold text-base whitespace-nowrap">Meeting Type</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base whitespace-nowrap">Meeting Venue</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Status</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Creation Date</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E] truncate">
                  <div className="flex">
                    <span className="max-w-32 truncate">{r.name}</span>
                  </div>
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E]">
                  <div className="flex">
                    <span className="max-w-40 truncate">{r.gender} / {r.minAge} - {r.maxAge}</span>
                  </div>
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E]">
                  <div className="flex">
                    <span className="max-w-40 truncate">{r.creatorCity}, {r.creatorState}</span>
                  </div>
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E]">{r.meetingType}</td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base">
                    <div className="flex">
                    <span className="max-w-40 truncate">{r.meetingCity}, {r.meetingState}</span>
                  </div>
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base">
                  {handleStatus(r.status)}
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base">{r.createdAt}</td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-blue-600 cursor-pointer whitespace-nowrap">
                  <span className={`text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg text-[#666666]`}>
                    <p>View Details</p>
                    {icons.details}
                  </span>
                </td>
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
      </div>) : <EmptyUserList/>}
    </>
  );
};

export default RequestListTable

const handleStatus = (status)=>{
  if(status === 'Open') return (
    <span className={`text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#F5F8FE] text-blue-800`}>
      {icons.open}
      {status}
    </span>
  )
  else if(status === 'Matched') return (
    <span className={`text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#F6FDF9] text-[#189553]`}>
      {icons.matched}
      {status}
    </span>
  )
  else if(status === 'Closed') return (
    <span className={`text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#FAFAFA] text-[#A3A3A3]`}>
      {icons.closed}
      {status}
    </span>
  )
  else return (
    <span className={`text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#FFF8F5] text-[#FF640F]`}>
      {icons.pending}
      {status}
    </span>
  )
}

const icons = {
  pending: 
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1.3335C4.32667 1.3335 1.33334 4.32683 1.33334 8.00016C1.33334 11.6735 4.32667 14.6668 8 14.6668C11.6733 14.6668 14.6667 11.6735 14.6667 8.00016C14.6667 4.32683 11.6733 1.3335 8 1.3335ZM10.9 10.3802C10.8067 10.5402 10.64 10.6268 10.4667 10.6268C10.38 10.6268 10.2933 10.6068 10.2133 10.5535L8.14667 9.32016C7.63334 9.0135 7.25334 8.34016 7.25334 7.74683V5.0135C7.25334 4.74016 7.48 4.5135 7.75334 4.5135C8.02667 4.5135 8.25334 4.74016 8.25334 5.0135V7.74683C8.25334 7.98683 8.45334 8.34016 8.66 8.46016L10.7267 9.6935C10.9667 9.8335 11.0467 10.1402 10.9 10.3802Z" fill="#FF8B4B"/>
    </svg>,
  details: 
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.00001 1.3335C4.32001 1.3335 1.33334 4.32016 1.33334 8.00016C1.33334 11.6802 4.32001 14.6668 8.00001 14.6668C11.68 14.6668 14.6667 11.6802 14.6667 8.00016" stroke="#1C63F3" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.66666 7.33337L14.1333 1.8667" stroke="#1C63F3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14.6667 4.5535V1.3335H11.4467" stroke="#1C63F3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>,
  open: <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.49967 1.33398C4.81967 1.33398 1.83301 4.32065 1.83301 8.00065C1.83301 11.6807 4.81967 14.6673 8.49967 14.6673C12.1797 14.6673 15.1663 11.6807 15.1663 8.00065C15.1663 4.32065 12.1797 1.33398 8.49967 1.33398ZM8.71967 11.334C8.59967 11.374 8.39301 11.374 8.27301 11.334C7.23301 10.9807 4.89967 9.49398 4.89967 6.97398C4.89967 5.86065 5.79301 4.96065 6.89967 4.96065C7.55301 4.96065 8.13301 5.27398 8.49967 5.76732C8.85967 5.28065 9.44634 4.96065 10.0997 4.96065C11.2063 4.96065 12.0997 5.86065 12.0997 6.97398C12.0997 9.49398 9.76634 10.9807 8.71967 11.334Z" fill="#0D59F2"/>
</svg>,
matched: <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9666 8.26758C10.1999 8.26758 8.7666 9.70091 8.7666 11.4676C8.7666 12.0676 8.93327 12.6342 9.23327 13.1142C9.7866 14.0409 10.7999 14.6676 11.9666 14.6676C13.1333 14.6676 14.1533 14.0409 14.6999 13.1142C14.9933 12.6342 15.1666 12.0676 15.1666 11.4676C15.1666 9.70091 13.7333 8.26758 11.9666 8.26758ZM13.5533 11.0476L11.8466 12.6209C11.7533 12.7076 11.6266 12.7542 11.5066 12.7542C11.3799 12.7542 11.2533 12.7076 11.1533 12.6076L10.3666 11.8209C10.1733 11.6276 10.1733 11.3076 10.3666 11.1142C10.5599 10.9209 10.8799 10.9209 11.0733 11.1142L11.5199 11.5609L12.8733 10.3076C13.0733 10.1209 13.3933 10.1342 13.5799 10.3342C13.7666 10.5409 13.7533 10.8609 13.5533 11.0476Z" fill="#189553"/>
<path d="M15.1663 5.82042C15.1663 6.61375 15.0397 7.34708 14.8197 8.02708C14.7797 8.16708 14.613 8.20708 14.493 8.12042C13.7663 7.58042 12.8797 7.29375 11.9663 7.29375C9.65301 7.29375 7.76634 9.18042 7.76634 11.4937C7.76634 12.2137 7.95301 12.9204 8.30634 13.5471C8.41301 13.7338 8.28634 13.9738 8.08634 13.9004C6.47967 13.3538 3.23301 11.3604 2.17967 8.02708C1.95967 7.34708 1.83301 6.61375 1.83301 5.82042C1.83301 3.76042 3.49301 2.09375 5.53967 2.09375C6.74634 2.09375 7.82634 2.68042 8.49967 3.58042C9.17301 2.68042 10.253 2.09375 11.4597 2.09375C13.5063 2.09375 15.1663 3.76042 15.1663 5.82042Z" fill="#189553"/>
</svg>,
closed: <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.49967 1.33398C4.82634 1.33398 1.83301 4.32732 1.83301 8.00065C1.83301 11.674 4.82634 14.6673 8.49967 14.6673C12.173 14.6673 15.1663 11.674 15.1663 8.00065C15.1663 4.32732 12.173 1.33398 8.49967 1.33398ZM10.7397 9.53399C10.933 9.72732 10.933 10.0473 10.7397 10.2407C10.6397 10.3407 10.513 10.3873 10.3863 10.3873C10.2597 10.3873 10.133 10.3407 10.033 10.2407L8.49967 8.70732L6.96634 10.2407C6.86634 10.3407 6.73967 10.3873 6.61301 10.3873C6.48634 10.3873 6.35967 10.3407 6.25968 10.2407C6.06634 10.0473 6.06634 9.72732 6.25968 9.53399L7.79301 8.00065L6.25968 6.46732C6.06634 6.27398 6.06634 5.95398 6.25968 5.76065C6.45301 5.56732 6.77301 5.56732 6.96634 5.76065L8.49967 7.29398L10.033 5.76065C10.2263 5.56732 10.5463 5.56732 10.7397 5.76065C10.933 5.95398 10.933 6.27398 10.7397 6.46732L9.20634 8.00065L10.7397 9.53399Z" fill="#A3A3A3"/>
</svg>
}