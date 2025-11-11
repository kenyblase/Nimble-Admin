import Input from '../components/Input'
import { MoreVertical, Search } from 'lucide-react'
import ItemTabs from './ItemTabs';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AppealsTable = ({appeals=[], page=1, totalPages, setPage, itemsTabs, itemsActiveTab, setItemsActiveTab, search, setSearch}) => {
    const [openMenuId, setOpenMenuId] = useState(null);
    const menuRef = useRef(null)
    const navigate = useNavigate()

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
    <div className='flex flex-col gap-4 p-6 bg-[#FFFFFF] border border-[#F2E9FF] rounded-2xl'>
        <ItemTabs ItemsTabs={itemsTabs} itemsActiveTab={itemsActiveTab} setItemsActiveTab={setItemsActiveTab}/>

        <Input
            icon={Search}
            placeholder={'Search'}
            otherStyles={'h-9'}
            value={search}
            handleChange={(e)=>{
                setPage(1)
                setSearch(e.target.value)
            }}
        />

      <>
        {appeals.length > 0 ? (
            <div>
                <table className="w-full border">
                <thead className="bg-[#E9F1FF] text-[#1C5ECA]">
                    <tr className="text-left text-xs px-4">
                    <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">ID</th>
                    <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">User</th>
                    <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Category</th>
                    <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Subject</th>
                    <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Date</th>
                    <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Status</th>
                    <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {appeals.map((a, idx) => (
                        <tr key={idx} className="border-b">
                        <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-normal text-sm text-[#071832]">{a._id}</td>
                        <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-normal text-sm text-[#071832]">{a.user.firstName} {a.user.lastName}</td>
                        <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-normal text-sm text-[#071832]">{a.category}</td>
                        <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-normal text-sm text-[#071832]">{a.subject}</td>
                        <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-normal text-sm text-[#071832]">{new Date(a.createdAt).toLocaleDateString('en-GB')}</td>
                        <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-normal text-sm">
                        {handleStatus(a.status)}
                        </td>
                        <td className="p-5 border-b border-l border-r border-[#F5F5F5] font-semibold text-base relative">
                            <button
                                onClick={() =>
                                setOpenMenuId(openMenuId === a._id ? null : a._id)
                                }
                                className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                            >
                                <MoreVertical color="#414040" size={18} />
                            </button>

                            {openMenuId === a._id && (
                                <div
                                ref={menuRef}
                                className="absolute right-6 top-[70%] w-36 bg-white shadow-lg rounded-xl border border-gray-100 py-2 z-20 animate-fadeIn"
                                >
                                <button
                                    onClick={() => {
                                     navigate(`/appeals/${a._id}`)
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-[#1C357E] hover:bg-gray-50"
                                >
                                    View
                                </button>
                                 <button
                                    onClick={() => {
                                     
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-[#1C357E] hover:bg-gray-50"
                                >
                                    Open
                                </button>
                                <button
                                    onClick={() => {
                                     
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-[#1C357E] hover:bg-gray-50"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => {
                                     
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-[#1C357E] hover:bg-gray-50"
                                >
                                    Mark as resolved
                                </button>
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
            </div>
            ) : 
            <p className='text-center'>No Appeals yet</p>}
        </>
    </div>
  )
}

export default AppealsTable

const handleStatus = (status)=>{
  if(status === 'resolved') return (
    <span className={`w-fit text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#DEF9D4] text-[#348352]`}>
      {status}
    </span>
  )
  else if(status === 'closed') return (
    <span className={`w-fit text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#F9D8D4] text-[#FF640F]`}>
      {status}
    </span>
  )
  else  return (
    <span className={`w-fit text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#F9EDD4] text-[#FF8911]`}>
      {status}
    </span>
  )
}