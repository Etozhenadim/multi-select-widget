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
    <div className="w-full relative">
      <select
        value={value ?? ""}
        onChange={(e) => onChange(Number(e.target.value) || null)}
        name="Filter"
        className="w-full appearance-none rounded-sm border border-zinc-600 bg-zinc-900/60 p-2 pr-8 text-sm text-zinc-100 focus:outline-none focus:border-zinc-400"
      >
        <option value="">All</option>
        <option value="10">&gt; 10</option>
        <option value="50">&gt; 50</option>
        <option value="100">&gt; 100</option>
      </select>
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
};
