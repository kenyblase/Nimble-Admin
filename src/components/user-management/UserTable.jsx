import EmptyUserList from './EmptyUserList'

const UserTable = ({users, page=1, totalPages, onPageChange:setPage}) => {

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
      {users.length > 0 ? (
      <div>
        <table className="w-full border-collapse border">
          <thead className="bg-[#0057FF] text-white">
            <tr className="text-left">
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">User ID</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Name</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Email Address</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Phone number</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Join Date</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Status</th>
              <th className="p-3 border-t border-l border-r border-[#EBEBEB] font-semibold text-base whitespace-nowrap">Verification Status</th>
              <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E] max-w-48 truncate">
                  <div className="flex w-full items-center gap-2">
                    <span className="max-w-[80%] truncate">{u.id}</span>
                    <span>{icons.crown}</span>
                  </div>
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E] max-w-48 truncate">
                      {u.name}
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E] max-w-48 truncate">
                  {u.email}
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E] max-w-48 truncate">
                  {u.phone}
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base text-[#2E2E2E]">{u.joinDate}</td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base">
                  {handleStatus(u.status)}
                </td>
                <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base">
                  {handleVerificationStatus(u.verification)}
                </td>
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

export default UserTable

const handleStatus = (status)=>{
  if(status === 'Active') return (
    <span className={`text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#F6FDF9] text-[#189553]`}>
      {icons.active}
      {status}
    </span>
  )
  else return (
    <span className={`text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#FFF8F5] text-[#FF640F]`}>
      {icons.suspended}
      {status}
    </span>
  )
}
const handleVerificationStatus = (status)=>{
  if(status === 'Verified') return (
    <span className={`text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#F5F8FE] text-blue-700`}>
      {icons.verified}
      {status}
    </span>
  )
  else if(status === 'Pending') return (
    <span className={`text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#FFFCFA] text-[#FF8B4B]`}>
      {icons.pending}
      {status}
    </span>
  )
  else return (
    <span className={`text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#FAFAFA] text-[#949494]`}>
      {icons.unverified}
      {status}
    </span>
  )
}

const icons = {
  crown: 
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.3334 14.6665H4.66669C4.39335 14.6665 4.16669 14.4398 4.16669 14.1665C4.16669 13.8932 4.39335 13.6665 4.66669 13.6665H11.3334C11.6067 13.6665 11.8334 13.8932 11.8334 14.1665C11.8334 14.4398 11.6067 14.6665 11.3334 14.6665Z" fill="#FF9358"/>
    <path d="M13.5667 3.67986L10.9 5.58653C10.5467 5.83986 10.04 5.68653 9.88669 5.27986L8.62669 1.91986C8.41336 1.33986 7.59336 1.33986 7.38002 1.91986L6.11336 5.2732C5.96002 5.68653 5.46002 5.83986 5.10669 5.57986L2.44002 3.6732C1.90669 3.29986 1.20002 3.82653 1.42002 4.44653L4.19336 12.2132C4.28669 12.4799 4.54002 12.6532 4.82002 12.6532H11.1734C11.4534 12.6532 11.7067 12.4732 11.8 12.2132L14.5734 4.44653C14.8 3.82653 14.0934 3.29986 13.5667 3.67986ZM9.66669 9.8332H6.33336C6.06002 9.8332 5.83336 9.60653 5.83336 9.3332C5.83336 9.05986 6.06002 8.8332 6.33336 8.8332H9.66669C9.94002 8.8332 10.1667 9.05986 10.1667 9.3332C10.1667 9.60653 9.94002 9.8332 9.66669 9.8332Z" fill="#FF9358"/>
    </svg>,
  active: 
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1.3335C4.32667 1.3335 1.33333 4.32683 1.33333 8.00016C1.33333 11.6735 4.32667 14.6668 8 14.6668C11.6733 14.6668 14.6667 11.6735 14.6667 8.00016C14.6667 4.32683 11.6733 1.3335 8 1.3335ZM11.1867 6.46683L7.40667 10.2468C7.31333 10.3402 7.18667 10.3935 7.05333 10.3935C6.92 10.3935 6.79333 10.3402 6.7 10.2468L4.81333 8.36016C4.62 8.16683 4.62 7.84683 4.81333 7.6535C5.00667 7.46016 5.32667 7.46016 5.52 7.6535L7.05333 9.18683L10.48 5.76016C10.6733 5.56683 10.9933 5.56683 11.1867 5.76016C11.38 5.9535 11.38 6.26683 11.1867 6.46683Z" fill="#189553"/>
    </svg>,
  suspended: 
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.98 1.3335C4.3 1.3335 1.31333 4.32016 1.31333 8.00016C1.31333 11.6802 4.3 14.6668 7.98 14.6668C11.66 14.6668 14.6467 11.6802 14.6467 8.00016C14.6467 4.32016 11.6667 1.3335 7.98 1.3335ZM10.82 8.82016C10.82 9.92683 9.92666 10.8202 8.82 10.8202H7.18C6.07333 10.8202 5.18 9.92683 5.18 8.82016V7.18016C5.18 6.0735 6.07333 5.18016 7.18 5.18016H8.82C9.92666 5.18016 10.82 6.0735 10.82 7.18016V8.82016Z" fill="#FF640F"/>
    </svg>,
  verified: 
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.3733 7.15988L13.4667 6.10654C13.2933 5.90654 13.1533 5.53321 13.1533 5.26654V4.13321C13.1533 3.42654 12.5733 2.84654 11.8667 2.84654H10.7333C10.4733 2.84654 10.0933 2.70654 9.89334 2.53321L8.84 1.62654C8.38 1.23321 7.62667 1.23321 7.16 1.62654L6.11334 2.53988C5.91334 2.70654 5.53334 2.84654 5.27334 2.84654H4.12C3.41334 2.84654 2.83334 3.42654 2.83334 4.13321V5.27321C2.83334 5.53321 2.69334 5.90654 2.52667 6.10654L1.62667 7.16654C1.24 7.62654 1.24 8.37321 1.62667 8.83321L2.52667 9.89321C2.69334 10.0932 2.83334 10.4665 2.83334 10.7265V11.8665C2.83334 12.5732 3.41334 13.1532 4.12 13.1532H5.27334C5.53334 13.1532 5.91334 13.2932 6.11334 13.4665L7.16667 14.3732C7.62667 14.7665 8.38 14.7665 8.84667 14.3732L9.9 13.4665C10.1 13.2932 10.4733 13.1532 10.74 13.1532H11.8733C12.58 13.1532 13.16 12.5732 13.16 11.8665V10.7332C13.16 10.4732 13.3 10.0932 13.4733 9.89321L14.38 8.83988C14.7667 8.37988 14.7667 7.61988 14.3733 7.15988ZM10.7733 6.73988L7.55334 9.95988C7.46 10.0532 7.33334 10.1065 7.2 10.1065C7.06667 10.1065 6.94 10.0532 6.84667 9.95988L5.23334 8.34654C5.04 8.15321 5.04 7.83321 5.23334 7.63988C5.42667 7.44654 5.74667 7.44654 5.94 7.63988L7.2 8.89988L10.0667 6.03321C10.26 5.83988 10.58 5.83988 10.7733 6.03321C10.9667 6.22654 10.9667 6.54654 10.7733 6.73988Z" fill="#1C63F3"/>
    </svg>,
  pending: 
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1.3335C4.32667 1.3335 1.33334 4.32683 1.33334 8.00016C1.33334 11.6735 4.32667 14.6668 8 14.6668C11.6733 14.6668 14.6667 11.6735 14.6667 8.00016C14.6667 4.32683 11.6733 1.3335 8 1.3335ZM10.9 10.3802C10.8067 10.5402 10.64 10.6268 10.4667 10.6268C10.38 10.6268 10.2933 10.6068 10.2133 10.5535L8.14667 9.32016C7.63334 9.0135 7.25334 8.34016 7.25334 7.74683V5.0135C7.25334 4.74016 7.48 4.5135 7.75334 4.5135C8.02667 4.5135 8.25334 4.74016 8.25334 5.0135V7.74683C8.25334 7.98683 8.45334 8.34016 8.66 8.46016L10.7267 9.6935C10.9667 9.8335 11.0467 10.1402 10.9 10.3802Z" fill="#FF8B4B"/>
    </svg>,
  unverified:
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.08 4.6535L11.3467 1.92016C11.0267 1.60016 10.3867 1.3335 9.93334 1.3335H6.06667C5.61334 1.3335 4.97334 1.60016 4.65334 1.92016L1.92 4.6535C1.6 4.9735 1.33334 5.6135 1.33334 6.06683V9.9335C1.33334 10.3868 1.6 11.0268 1.92 11.3468L4.65334 14.0802C4.97334 14.4002 5.61334 14.6668 6.06667 14.6668H9.93334C10.3867 14.6668 11.0267 14.4002 11.3467 14.0802L14.08 11.3468C14.4 11.0268 14.6667 10.3868 14.6667 9.9335V6.06683C14.6667 5.6135 14.4 4.9735 14.08 4.6535ZM10.6867 9.98016C10.88 10.1735 10.88 10.4935 10.6867 10.6868C10.5867 10.7868 10.46 10.8335 10.3333 10.8335C10.2067 10.8335 10.08 10.7868 9.98 10.6868L8 8.70683L6.02 10.6868C5.92 10.7868 5.79334 10.8335 5.66667 10.8335C5.54 10.8335 5.41334 10.7868 5.31334 10.6868C5.12 10.4935 5.12 10.1735 5.31334 9.98016L7.29334 8.00016L5.31334 6.02016C5.12 5.82683 5.12 5.50683 5.31334 5.3135C5.50667 5.12016 5.82667 5.12016 6.02 5.3135L8 7.2935L9.98 5.3135C10.1733 5.12016 10.4933 5.12016 10.6867 5.3135C10.88 5.50683 10.88 5.82683 10.6867 6.02016L8.70667 8.00016L10.6867 9.98016Z" fill="#949494"/>
    </svg>,
  details: 
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.00001 1.3335C4.32001 1.3335 1.33334 4.32016 1.33334 8.00016C1.33334 11.6802 4.32001 14.6668 8.00001 14.6668C11.68 14.6668 14.6667 11.6802 14.6667 8.00016" stroke="#1C63F3" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.66666 7.33337L14.1333 1.8667" stroke="#1C63F3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14.6667 4.5535V1.3335H11.4467" stroke="#1C63F3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
}