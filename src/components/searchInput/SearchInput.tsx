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
      className="border border-gray-300 rounded p-2 w-full bg-gray-900 focus:outline-none"
    />
  );
};
