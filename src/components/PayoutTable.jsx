import { useState, useRef, useEffect } from "react";
import Input from "../components/Input";
import { MoreVertical, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRejectPayout } from "../utils/useApis/usePayoutApis/useRejectPayout";
import { useApprovePayout } from "../utils/useApis/usePayoutApis/useApprovePayout";

const PayoutsTable = ({
  payouts = [],
  page = 1,
  totalPages,
  setPage,
  search,
  setSearch,
}) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate()

  const { approvePayout, isApproving } = useApprovePayout()
  const { rejectPayout, isRejecting } = useRejectPayout()

  // close menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <div>
      <Input
        icon={Search}
        placeholder={"Search"}
        otherStyles={"h-9"}
        value={search}
        handleChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />

      <>
        {payouts.length > 0 ? (
          <div className="relative">
            <table className="w-full border">
              <thead className="bg-[#E9F1FF] text-[#1C5ECA]">
                <tr className="text-left text-xs px-4">
                  <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">
                    Order ID
                  </th>
                  <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">
                    User
                  </th>
                  <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">
                    Date
                  </th>
                  <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">
                    Amount
                  </th>
                  <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">
                    Status
                  </th>
                  <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {payouts.map((payout) => (
                  <tr key={payout._id} className="border-b relative">
                    <td className="p-5 border-b border-l border-r border-[#F5F5F5] text-sm text-[#071832] max-w-20 truncate">
                      {payout?._id.toUpperCase()}
                    </td>
                    <td className="p-5 border-b border-l border-r border-[#F5F5F5] text-sm text-[#071832]">
                      {payout?.user?.firstName} {payout?.user?.lastName}
                    </td>
                    <td className="p-5 border-b border-l border-r border-[#F5F5F5] text-sm text-[#071832]">
                      {formatDate(payout?.createdAt)}
                    </td>
                    <td className="p-5 border-b border-l border-r border-[#F5F5F5] text-sm text-[#071832]">
                      ₦{payout?.amount}
                    </td>
                    <td className="p-5 border-b border-l border-r border-[#F5F5F5] text-sm text-[#071832]">
                      {handleStatus(payout?.status)}
                    </td>
                    <td className="p-5 border-b border-l border-r border-[#F5F5F5] text-center relative">
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === payout._id ? null : payout._id)
                        }
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <MoreVertical color="#414040" size={18} />
                      </button>

                      {openMenuId === payout._id && (
                        <div
                          ref={menuRef}
                          className="absolute right-6 top-[70%] w-36 bg-white shadow-lg rounded-xl border border-gray-100 py-2 z-20 animate-fadeIn"
                        >
                          <button
                            onClick={() => {
                              navigate(`/payouts/${payout._id}`)
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-[#1C357E] hover:bg-gray-50"
                          >
                            View
                          </button>
                          {/* <button
                            onClick={async()=>{
                              await togglepayoutStatus(payout._id, 'suspended')
                              setOpenMenuId(null)
                            }} 
                            className="block w-full text-left px-4 py-2 text-sm text-[#1C357E] hover:bg-gray-50"
                          >
                            Edit
                          </button> */}
                         {payout?.status === 'PENDING' &&
                         <> 
                          <button
                              onClick={async()=>{
                                await approvePayout(payout._id)
                                setOpenMenuId(null)
                              }} 
                              disabled={isApproving}
                              className="block w-full text-left px-4 py-2 text-sm text-[#1C357E] hover:bg-gray-50"
                            >
                              Approve
                            </button>
                            <button
                              onClick={async()=>{
                                await rejectPayout(payout._id)
                                setOpenMenuId(null)
                              }} 
                              disabled={isRejecting}
                              className="block w-full text-left px-4 py-2 text-sm text-[#DC2626] hover:bg-gray-50"
                            >
                              Reject
                            </button>
                          </>
                          }
                        </div>
                      )}
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
          </div>
        ) : (
          <p className="text-center">No Payouts Found</p>
        )}
      </>
    </div>
  );
};

export default PayoutsTable;

const handleStatus = (status)=>{
  if(status === 'APPROVED' || status === 'SUCCESS') return (
    <span className={`w-fit text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#DEF9D4] text-[#348352]`}>
      {status?.toLowerCase()}
    </span>
  )
  else if(status === 'REJECTED' || status === 'FAILED') return (
    <span className={`w-fit text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#F9D8D4] text-[#FF640F]`}>
      {status?.toLowerCase()}
    </span>
  )
  else  return (
    <span className={`w-fit text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#F9EDD4] text-[#FF8911]`}>
      {status?.toLowerCase()}
    </span>
  )
}

const formatDate = (date) => {
  if (!date) return '';

  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};