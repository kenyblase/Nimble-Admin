import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useGetTotalCommission, useGetCategoryCommission } from "../utils/useApis/useCategoryApis/useGetCommission";
import { useGetAllCategories } from "../utils/useApis/useCategoryApis/useGetCategories";

const filters = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This Week", value: "thisWeek" },
  { label: "This Month", value: "thisMonth" },
];

export default function CommissionCards() {
  const [totalFilter, setTotalFilter] = useState("today");
  const [categoryFilter, setCategoryFilter] = useState("today");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [openFilter, setOpenFilter] = useState(null); // controls dropdown toggle

  const { data: totalData, isLoading: totalLoading } = useGetTotalCommission(totalFilter);
  const { data: categories } = useGetAllCategories();
  const { data: categoryData, isLoading: categoryLoading } = useGetCategoryCommission(
    selectedCategory,
    categoryFilter
  );

  const totalCommission = totalData?.totalCommission || 0;
  const categoryCommission = categoryData?.categoryCommission || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
      {/* TOTAL COMMISSION CARD */}
      <div className="bg-white shadow-md rounded-2xl p-5 relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Total Commission</h3>

          <div className="relative">
            <button
              onClick={() =>
                setOpenFilter(openFilter === "totalFilter" ? null : "totalFilter")
              }
              className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              {filters.find((f) => f.value === totalFilter)?.label}
              <ChevronDown size={16} />
            </button>

            {openFilter === "totalFilter" && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10 animate-fadeIn">
                {filters.map((f) => (
                  <div
                    key={f.value}
                    onClick={() => {
                      setTotalFilter(f.value);
                      setOpenFilter(null);
                    }}
                    className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {f.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="text-3xl font-bold text-black">
          ₦{totalLoading ? "..." : totalCommission.toLocaleString()}
        </p>
      </div>

      {/* CATEGORY COMMISSION CARD */}
      <div className="bg-white shadow-md rounded-2xl p-5 relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-md font-semibold text-gray-800">Category Commission</h3>

          <div className="relative">
            <button
              onClick={() =>
                setOpenFilter(openFilter === "categoryFilter" ? null : "categoryFilter")
              }
              className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              {filters.find((f) => f.value === categoryFilter)?.label}
              <ChevronDown size={16} />
            </button>

            {openFilter === "categoryFilter" && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10 animate-fadeIn">
                {filters.map((f) => (
                  <div
                    key={f.value}
                    onClick={() => {
                      setCategoryFilter(f.value);
                      setOpenFilter(null);
                    }}
                    className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {f.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
            
        <p className="text-3xl font-bold text-black mb-5">
          ₦{categoryLoading ? "..." : categoryCommission.toLocaleString()}
        </p>
        {/* CATEGORY DROPDOWN */}
        <div className="relative mb-3">
          <button
            onClick={() =>
              setOpenFilter(openFilter === "categoryDropdown" ? null : "categoryDropdown")
            }
            className="w-full flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            {selectedCategory
              ? categories?.find((c) => c._id === selectedCategory)?.name
              : "Select Category"}
            <ChevronDown size={16} />
          </button>

          {openFilter === "categoryDropdown" && (
            <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-56 overflow-y-auto z-10 animate-fadeIn">
              {categories?.length ? (
                categories.map((cat) => (
                  <div
                    key={cat._id}
                    onClick={() => {
                      setSelectedCategory(cat._id);
                      setOpenFilter(null);
                    }}
                    className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {cat.name}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500">No categories</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* THIRD CARD (Top Category or Placeholder) */}
      <div className="bg-white shadow-md rounded-2xl p-5 flex flex-col ">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Categories</h3>
        <p className="text-3xl font-bold text-black">{categories?.length || 0}</p>
      </div>
    </div>
  );
}
