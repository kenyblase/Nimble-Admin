export default function TableHeader({ title, isFiltering=true, filter, onFilterChange }) {
  const filters = ["All", "Premium users", "Free users"];

  return (
    <div className="flex items-center gap-5 mt-4 mb-2">
      <h2 className="text-3xl font-bold text-[#2E2E2E]">{title}</h2>
      {isFiltering && <div className="flex gap-1">
        {filters.map((f) => (
          <button
            key={f}
            className={`h-10 px-4 py-1 text-sm rounded-lg ${
              filter === f
                ? "bg-[#EBF1FE] text-[#0D59F2] font-medium text-sm"
                : "text-[#BFBFBF]"
            }`}
            onClick={() => onFilterChange(f)}
          >
            {f}
          </button>
        ))}
      </div>}
    </div>
  );
}