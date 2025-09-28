import EmptyUserList from "../user-management/EmptyUserList";

const RequestInboxTable = ({requests, page=1, totalPages, onPageChange:setPage}) => {

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
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Request ID</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Participants Username</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Status</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Last Message</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E] truncate">
                  <div className="flex">
                    <span className="max-w-32 truncate">{r.id}</span>
                  </div>
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E] max-w-48 truncate">
                        {r.users[0].name} & {r.users[1].name}
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base">
                  {handleStatus(r.status)}
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E] max-w-48 truncate">
                    <span className="truncate">{r.lastMessage.sender}: <span className="text-[#A3A3A3]">{r.lastMessage.message}</span></span>
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-blue-600 cursor-pointer whitespace-nowrap">
                  <span className={`text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg text-[#666666]`}>
                    <p>View Chat</p>
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

export default RequestInboxTable

const handleStatus = (status)=>{
  if(status === 'Completed') return (
    <span className={`text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#F5F8FE] text-blue-800`}>
      {icons.completed}
      {status}
    </span>
  )
  else if(status === 'Flagged') return (
    <span className={`text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#FAFAFA] text-[#A3A3A3]`}>
      {icons.flagged}
      {status}
    </span>
  )
  else return (
    <span className={`text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#F6FDF9] text-[#189553]`}>
      {icons.active}
      {status}
    </span>
  )
}

const icons = {
  completed: <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.20002 1.33398C4.52669 1.33398 1.53336 4.32732 1.53336 8.00065C1.53336 11.674 4.52669 14.6673 8.20002 14.6673C11.8734 14.6673 14.8667 11.674 14.8667 8.00065C14.8667 4.32732 11.8734 1.33398 8.20002 1.33398ZM11.3867 6.46732L7.60669 10.2473C7.51336 10.3407 7.38669 10.394 7.25336 10.394C7.12002 10.394 6.99336 10.3407 6.90002 10.2473L5.01336 8.36065C4.82002 8.16732 4.82002 7.84732 5.01336 7.65398C5.20669 7.46065 5.52669 7.46065 5.72002 7.65398L7.25336 9.18732L10.68 5.76065C10.8734 5.56732 11.1934 5.56732 11.3867 5.76065C11.58 5.95398 11.58 6.26732 11.3867 6.46732Z" fill="#0D59F2"/>
</svg>,
active: <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.18 1.33398C4.5 1.33398 1.51334 4.32065 1.51334 8.00065C1.51334 11.6807 4.5 14.6673 8.18 14.6673C11.86 14.6673 14.8467 11.6807 14.8467 8.00065C14.8467 4.32065 11.8667 1.33398 8.18 1.33398ZM10.68 8.23398L8.2 11.054L7.90667 11.3873C7.5 11.8473 7.16667 11.7273 7.16667 11.1073V8.46732H6.03334C5.52 8.46732 5.38 8.15398 5.72 7.76732L8.2 4.94732L8.49334 4.61398C8.9 4.15398 9.23334 4.27398 9.23334 4.89398V7.53398H10.3667C10.88 7.53398 11.02 7.84732 10.68 8.23398Z" fill="#189553"/>
</svg>,
flagged: <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.2133 8.22065L11.4 7.40732C11.2067 7.24065 11.0933 6.99398 11.0867 6.72065C11.0733 6.42065 11.1933 6.12065 11.4133 5.90065L12.2133 5.10065C12.9067 4.40732 13.1667 3.74065 12.9467 3.21398C12.7333 2.69398 12.0733 2.40732 11.1 2.40732H4.13333V1.83398C4.13333 1.56065 3.90666 1.33398 3.63333 1.33398C3.36 1.33398 3.13333 1.56065 3.13333 1.83398V14.1673C3.13333 14.4407 3.36 14.6673 3.63333 14.6673C3.90666 14.6673 4.13333 14.4407 4.13333 14.1673V10.914H11.1C12.06 10.914 12.7067 10.6207 12.9267 10.094C13.1467 9.56732 12.8933 8.90732 12.2133 8.22065Z" fill="#A3A3A3"/>
</svg>
}