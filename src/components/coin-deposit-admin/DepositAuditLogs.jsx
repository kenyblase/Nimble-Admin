const DepositAuditLogs = ({logs, page=1, totalPages, onPageChange:setPage}) => {

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
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">User ID</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Amount</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Admin Reason</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Date</th>           
            </tr>
          </thead>
          <tbody>
            {logs.map((l, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E] truncate">
                  <div className="flex items-center gap-1">
                    <span className="max-w-20 truncate">ADMIN-{l.adminId}</span>
                    <span>{handleAdminIcon(l.role)}</span>
                  </div>
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E]">
                  <div className="flex items-center gap-2">
                    <span className="max-w-20 truncate">{l.userId}</span>
                    <span>{icons.crown}</span>
                  </div>
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E]">
                  <div className="flex">
                    <span className="max-w-40 truncate">{l.amount} Coins</span>
                  </div>
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E]">
                  <div className="flex">
                    <span className="max-w-40 truncate">{l.reason}</span>
                  </div>
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

export default DepositAuditLogs

const handleAdminIcon = (role)=>{
    if(role === 'Super Admin') return(
        icons.superAdmin
    )
    else if(role === 'Moderator') return(
        icons.moderator
    )
    else return(
        icons.support
    )
}


const icons = {
  crown: 
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.3334 14.6665H4.66669C4.39335 14.6665 4.16669 14.4398 4.16669 14.1665C4.16669 13.8932 4.39335 13.6665 4.66669 13.6665H11.3334C11.6067 13.6665 11.8334 13.8932 11.8334 14.1665C11.8334 14.4398 11.6067 14.6665 11.3334 14.6665Z" fill="#FF9358"/>
    <path d="M13.5667 3.67986L10.9 5.58653C10.5467 5.83986 10.04 5.68653 9.88669 5.27986L8.62669 1.91986C8.41336 1.33986 7.59336 1.33986 7.38002 1.91986L6.11336 5.2732C5.96002 5.68653 5.46002 5.83986 5.10669 5.57986L2.44002 3.6732C1.90669 3.29986 1.20002 3.82653 1.42002 4.44653L4.19336 12.2132C4.28669 12.4799 4.54002 12.6532 4.82002 12.6532H11.1734C11.4534 12.6532 11.7067 12.4732 11.8 12.2132L14.5734 4.44653C14.8 3.82653 14.0934 3.29986 13.5667 3.67986ZM9.66669 9.8332H6.33336C6.06002 9.8332 5.83336 9.60653 5.83336 9.3332C5.83336 9.05986 6.06002 8.8332 6.33336 8.8332H9.66669C9.94002 8.8332 10.1667 9.05986 10.1667 9.3332C10.1667 9.60653 9.94002 9.8332 9.66669 9.8332Z" fill="#FF9358"/>
    </svg>,

      superAdmin: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.9667 8.94948L16.8333 7.63281C16.6167 7.38281 16.4417 6.91615 16.4417 6.58281V5.16615C16.4417 4.28281 15.7167 3.55781 14.8333 3.55781H13.4167C13.0917 3.55781 12.6167 3.38281 12.3667 3.16615L11.05 2.03281C10.475 1.54115 9.53334 1.54115 8.95 2.03281L7.64167 3.17448C7.39167 3.38281 6.91667 3.55781 6.59167 3.55781H5.15C4.26667 3.55781 3.54167 4.28281 3.54167 5.16615V6.59115C3.54167 6.91615 3.36667 7.38281 3.15834 7.63281L2.03334 8.95781C1.55 9.53281 1.55 10.4661 2.03334 11.0411L3.15834 12.3661C3.36667 12.6161 3.54167 13.0828 3.54167 13.4078V14.8328C3.54167 15.7161 4.26667 16.4411 5.15 16.4411H6.59167C6.91667 16.4411 7.39167 16.6161 7.64167 16.8328L8.95834 17.9661C9.53334 18.4578 10.475 18.4578 11.0583 17.9661L12.375 16.8328C12.625 16.6161 13.0917 16.4411 13.425 16.4411H14.8417C15.725 16.4411 16.45 15.7161 16.45 14.8328V13.4161C16.45 13.0911 16.625 12.6161 16.8417 12.3661L17.975 11.0495C18.4583 10.4745 18.4583 9.52448 17.9667 8.94948ZM13.4667 8.42448L9.44167 12.4495C9.325 12.5661 9.16667 12.6328 9 12.6328C8.83334 12.6328 8.675 12.5661 8.55834 12.4495L6.54167 10.4328C6.3 10.1911 6.3 9.79115 6.54167 9.54948C6.78334 9.30781 7.18334 9.30781 7.425 9.54948L9 11.1245L12.5833 7.54115C12.825 7.29948 13.225 7.29948 13.4667 7.54115C13.7083 7.78281 13.7083 8.18281 13.4667 8.42448Z" fill="url(#paint0_linear_1324_55277)"/>
<defs>
<linearGradient id="paint0_linear_1324_55277" x1="10.0037" y1="1.66406" x2="10.0037" y2="18.3349" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF9358"/>
<stop offset="1" stop-color="#FFE418"/>
</linearGradient>
</defs>
</svg>,
moderator: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.9667 8.94948L16.8333 7.63281C16.6167 7.38281 16.4417 6.91615 16.4417 6.58281V5.16615C16.4417 4.28281 15.7167 3.55781 14.8333 3.55781H13.4167C13.0917 3.55781 12.6167 3.38281 12.3667 3.16615L11.05 2.03281C10.475 1.54115 9.53334 1.54115 8.95 2.03281L7.64167 3.17448C7.39167 3.38281 6.91667 3.55781 6.59167 3.55781H5.15C4.26667 3.55781 3.54167 4.28281 3.54167 5.16615V6.59115C3.54167 6.91615 3.36667 7.38281 3.15834 7.63281L2.03334 8.95781C1.55 9.53281 1.55 10.4661 2.03334 11.0411L3.15834 12.3661C3.36667 12.6161 3.54167 13.0828 3.54167 13.4078V14.8328C3.54167 15.7161 4.26667 16.4411 5.15 16.4411H6.59167C6.91667 16.4411 7.39167 16.6161 7.64167 16.8328L8.95834 17.9661C9.53334 18.4578 10.475 18.4578 11.0583 17.9661L12.375 16.8328C12.625 16.6161 13.0917 16.4411 13.425 16.4411H14.8417C15.725 16.4411 16.45 15.7161 16.45 14.8328V13.4161C16.45 13.0911 16.625 12.6161 16.8417 12.3661L17.975 11.0495C18.4583 10.4745 18.4583 9.52448 17.9667 8.94948ZM13.9 9.99948L12.925 12.9661C12.8 13.4578 12.275 13.8578 11.7417 13.8578H10.2C9.93334 13.8578 9.55834 13.7661 9.39167 13.5995L8.16667 12.6411C8.14167 13.1745 7.9 13.3995 7.30834 13.3995H6.90834C6.29167 13.3995 6.04167 13.1578 6.04167 12.5745V8.59115C6.04167 8.00781 6.29167 7.76615 6.90834 7.76615H7.31667C7.93334 7.76615 8.18334 8.00781 8.18334 8.59115V8.89115L9.8 6.49115C9.96667 6.23281 10.3917 6.04948 10.75 6.19115C11.1417 6.32448 11.3917 6.75781 11.3083 7.14115L11.1083 8.44115C11.0917 8.55781 11.1167 8.66615 11.1917 8.74948C11.2583 8.82448 11.3583 8.87448 11.4667 8.87448H13.0917C13.4083 8.87448 13.675 8.99948 13.8333 9.22448C13.975 9.44115 14 9.71615 13.9 9.99948Z" fill="#0057FF"/>
</svg>,
support: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 1.66797H5C3.61667 1.66797 2.5 2.7763 2.5 4.14297V13.2346C2.5 14.6013 3.61667 15.7096 5 15.7096H5.63333C6.3 15.7096 6.93333 15.968 7.4 16.4346L8.825 17.843C9.475 18.4846 10.5333 18.4846 11.1833 17.843L12.6083 16.4346C13.075 15.968 13.7167 15.7096 14.375 15.7096H15C16.3833 15.7096 17.5 14.6013 17.5 13.2346V4.14297C17.5 2.7763 16.3833 1.66797 15 1.66797ZM10.2333 12.468C10.1083 12.5096 9.9 12.5096 9.76667 12.468C8.68333 12.093 6.25 10.5513 6.25 7.9263C6.25833 6.76797 7.18333 5.83464 8.33333 5.83464C9.01667 5.83464 9.61667 6.15964 10 6.66797C10.3833 6.15964 10.9833 5.83464 11.6667 5.83464C12.8167 5.83464 13.75 6.76797 13.75 7.9263C13.7417 10.5513 11.3167 12.093 10.2333 12.468Z" fill="#2AC472"/>
</svg>,
}