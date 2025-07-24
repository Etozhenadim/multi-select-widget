import React from "react";
interface FilterSelectProps {
  value: number | null;
  onChange: (value: number | null) => void;
}
export const FilterSelect: React.FC<FilterSelectProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="w-full border border-gray-300">
      <select
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value ? parseInt(e.target.value, 10) : null)
        }
        name="Filter"
        className="border-r-8 border-transparent p-2 w-full bg-gray-900 focus:outline-none"
      >
        <option value="">All</option>
        <option value="10">&gt; 10</option>
        <option value="50">&gt; 50</option>
        <option value="100">&gt; 100</option>
      </select>
    </div>
  );
};
