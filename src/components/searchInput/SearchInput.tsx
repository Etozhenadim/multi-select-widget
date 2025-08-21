import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      name="Search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-sm border border-zinc-600 bg-zinc-900/60 p-2 text-sm text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400"
    />
  );
};
