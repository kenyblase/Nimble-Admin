export default function UserTabs({ activeTab, onChange }) {
  const tabs = ["User list", "User post"];

  return (
    <div className="flex">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-6 py-3 text-sm font-medium w-1/2 rounded-lg ${
            activeTab === tab
              ? "bg-[#0057FF] text-[#EBF2FF] font-semibold text-lg"
              : "bg-[#FAFAFA] text-[#BFBFBF]"
          }`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
