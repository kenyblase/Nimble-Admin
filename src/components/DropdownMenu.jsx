import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CsvPdfDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [format, setFormat] = useState("CSV / PDF");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectFormat = (value) => {
    setFormat(value);
    setIsOpen(false);
  };

  return (
    <div className="relative max-h-12 inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-[10px] bg-white border border-gray-200 rounded-lg shadow-sm text-gray-500 font-semibold text-xl hover:shadow-md"
      >
        {format}
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <button
            onClick={() => selectFormat("CSV / PDF")}
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            CSV / PDF
          </button>
          <button
            onClick={() => selectFormat("CSV")}
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            CSV
          </button>
          <button
            onClick={() => selectFormat("PDF")}
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            PDF
          </button>
        </div>
      )}
    </div>
  );
}