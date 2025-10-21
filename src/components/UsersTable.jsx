import { useState, useRef, useEffect } from "react";
import Input from "../components/Input";
import { MoreVertical, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const UsersTable = ({
  users = [],
  page = 1,
  totalPages,
  setPage,
  search,
  setSearch,
}) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate()
  const queryClient = useQueryClient()

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
        {users.length > 0 ? (
          <div className="relative">
            <table className="w-full border">
              <thead className="bg-[#E9F1FF] text-[#1C5ECA]">
                <tr className="text-left text-xs px-4">
                  <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">
                    Full Name
                  </th>
                  <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">
                    User Id
                  </th>
                  <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">
                    Email
                  </th>
                  <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">
                    Phone
                  </th>
                  <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">
                    Verification
                  </th>
                  <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">
                    Listing
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
                {users.map((user) => (
                  <tr key={user._id} className="border-b relative">
                    <td className="p-5 border-b border-l border-r border-[#F5F5F5] text-sm text-[#071832]">
                      {user?.firstName} {user?.lastName}
                    </td>
                    <td className="p-1 border-b border-l border-r border-[#F5F5F5] text-sm text-[#071832] max-w-20 truncate">
                      {user?._id.toUpperCase()}
                    </td>
                    <td className="p-5 border-b border-l border-r border-[#F5F5F5] text-sm text-[#071832]">
                      {user?.email}
                    </td>
                    <td className="p-5 border-b border-l border-r border-[#F5F5F5] text-sm text-[#071832]">
                      {user?.phoneNumber || 'N/A'}
                    </td>
                    <td className="p-5 border-b border-l border-r border-[#F5F5F5] text-sm text-[#071832]">
                      {user?.isVerified ? 'Verified' : 'Unverified'}
                    </td>
                    <td className="p-5 border-b border-l border-r border-[#F5F5F5] text-sm text-[#071832]">
                      {user?.listedItems}
                    </td>
                    <td className="p-5 border-b border-l border-r border-[#F5F5F5] text-sm text-[#071832]">
                      {handleStatus(user?.status)}
                    </td>
                    <td className="p-5 border-b border-l border-r border-[#F5F5F5] text-center relative">
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === user._id ? null : user._id)
                        }
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <MoreVertical color="#414040" size={18} />
                      </button>

                      {openMenuId === user._id && (
                        <div
                          ref={menuRef}
                          className="absolute right-6 top-[70%] w-36 bg-white shadow-lg rounded-xl border border-gray-100 py-2 z-20 animate-fadeIn"
                        >
                          <button
                            onClick={() => {navigate(`/users/${user._id}`)}}
                            className="block w-full text-left px-4 py-2 text-sm text-[#1C357E] hover:bg-gray-50"
                          >
                            View
                          </button>
                          <button
                            onClick={() =>{}}
                            className="block w-full text-left px-4 py-2 text-sm text-[#1C357E] hover:bg-gray-50"
                          >
                            Edit
                          </button>
                          <hr className="my-1 border-gray-200" />
                          <button
                            onClick={() =>{ }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                          >
                            Remove
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
          <p className="text-center">No Users Found</p>
        )}
      </>
    </div>
  );
};

export default UsersTable;

const handleStatus = (status)=>{
  if(status === 'active') return (
    <span className={`w-fit text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#DEF9D4] text-[#348352]`}>
      {status}
    </span>
  )
  else if(status === 'banned') return (
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