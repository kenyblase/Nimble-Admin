import { useState } from "react";
import Input from "../components/Input";
import { Edit2, Trash2, Search } from "lucide-react";
import EditAdminModal from "../components/EditAdminModal";

const CategoriesTable = ({
  admins = [],
  page = 1,
  totalPages,
  setPage,
  search,
  setSearch,
}) => {
  const [selectedAdminToEdit, setSelectedAdminToEdit] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(null);

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
    <div className="flex flex-col gap-4 p-6 bg-[#FFFFFF] border border-[#F2E9FF] rounded-2xl relative">
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
        {admins.length > 0 ? (
          <div className="relative">
            <table className="w-full border">
              <thead className="bg-[#E9F1FF] text-[#1C5ECA]">
                <tr className="text-left text-xs px-4">
                  <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">
                    Full Name
                  </th>
                  <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">
                    Admin ID
                  </th>
                  <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">
                    Email
                  </th>
                  <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">
                    Role
                  </th>
                  <th className="p-4 border-t border-l border-r border-[#EBEBEB] font-semibold text-base">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin._id} className="border-b relative">
                    <td className="p-5 border-b border-l border-r border-[#F5F5F5] text-sm text-[#071832]">
                      {admin?.firstName} {admin?.lastName}
                    </td>
                    <td className="p-5 border-b border-l border-r border-[#F5F5F5] text-sm text-[#071832]">
                      {(admin?._id).toUpperCase()}
                    </td>
                    <td className="p-5 border-b border-l border-r border-[#F5F5F5] text-sm text-[#071832]">
                      {admin?.email}
                    </td>
                    <td className="p-5 border-b border-l border-r border-[#F5F5F5] text-sm text-[#071832]">
                      {admin?.role}
                    </td>
                    <td className="p-5 border-b border-l border-r border-[#F5F5F5]">
                      <div className="flex items-center justify-center gap-4">
                        <Edit2 onClick={()=>{
                          setSelectedAdminToEdit(admin)
                          setOpenEditModal(true)
                        }} size={20} color="#3652AD" className="cursor-pointer"/>
                        <Trash2 size={20} color="#B72240" className="cursor-pointer"/>
                      </div>
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
          <p className="text-center">No Admin Found</p>
        )}
      </>
      <EditAdminModal
        isOpen={selectedAdminToEdit && openEditModal}
        onClose={()=>{
          setSelectedAdminToEdit(null)
          setOpenEditModal(false)
        }}
        adminData={selectedAdminToEdit}
        setAdminData={setSelectedAdminToEdit}
      />
    </div>
  );
};

export default CategoriesTable;