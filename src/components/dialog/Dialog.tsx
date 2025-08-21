import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import {selectedElementsStore} from "@/stores/selectedElementsStore";
import {useDebounce} from "@/hooks/useDebounce";
import {FilterSelect, SearchInput, CurrentSelectedList} from "@/components";
import {ElementI} from "@/types/elements";

interface DialogProps {
  setIsDialogOpen: (open: boolean) => void;
  elementsList: ElementI[];
}
export const Dialog = observer(
  ({setIsDialogOpen, elementsList}: DialogProps) => {
    const [selectedElements, setSelectedElements] = useState<ElementI[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterValue, setFilterValue] = useState<number | null>(null);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const idToLowerLabel = React.useMemo(() => {
      const map = new Map<number, string>();
      for (const el of elementsList) map.set(el.id, el.label.toLowerCase());
      return map;
    }, [elementsList]);

    const selectedIdSet = React.useMemo(() => {
      return new Set(selectedElements.map((e) => e.id));
    }, [selectedElements]);

    const normalizedSearch = React.useMemo(
      () => debouncedSearchTerm.toLowerCase(),
      [debouncedSearchTerm]
    );

    const filteredElements = React.useMemo(() => {
      const n = normalizedSearch;
      return elementsList.filter((el) => {
        const lower = idToLowerLabel.get(el.id) ?? "";
        const matchesSearch = lower.includes(n);
        const matchesFilter = filterValue ? el.id > filterValue : true;
        return matchesSearch && matchesFilter;
      });
    }, [elementsList, idToLowerLabel, normalizedSearch, filterValue]);

    const handleToggle = React.useCallback((item: ElementI) => {
      setSelectedElements((prev) => {
        const exists = prev.some((el) => el.id === item.id);
        if (exists) return prev.filter((el) => el.id !== item.id);
        if (prev.length < 3) return [...prev, item];
        return prev;
      });
    }, []);

    const handleRemove = React.useCallback((id: number) => {
      setSelectedElements((prev) => prev.filter((el) => el.id !== id));
    }, []);

    const handleSave = React.useCallback(() => {
      selectedElementsStore.setElements(selectedElements);
      setIsDialogOpen(false);
    }, [selectedElements, setIsDialogOpen]);

    const baseItemClass = "flex items-center p-2 size-full hover:bg-gray-900";

    return (
      <div className="flex flex-col gap-5 relative bg-[#373737] text-white size-full p-4">
        <div className="flex items-center justify-between">
          <h2>Select items</h2>
          <button
            className="p-2 cursor-pointer text-white hover:text-gray-400"
            onClick={() => setIsDialogOpen(false)}
          >
            X
          </button>
        </div>
        <div className="flex items-center justify-between gap-5">
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
          <FilterSelect value={filterValue} onChange={setFilterValue} />
        </div>
        <ul className="flex-1 min-h-0 max-h-[280px] overflow-y-auto w-full border border-gray-300">
          {filteredElements.map((element) => {
            const isSelected = selectedIdSet.has(element.id);
            const disableOthers = selectedElements.length >= 3 && !isSelected;
            return (
              <li key={element.id}>
                <label
                  htmlFor={`checkbox-${element.id}`}
                  className={`${baseItemClass} ${
                    disableOthers
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                >
                  <input
                    type="checkbox"
                    id={`checkbox-${element.id}`}
                    checked={isSelected}
                    onChange={() => handleToggle(element)}
                    disabled={disableOthers}
                    className="mr-2"
                  />
                  {element.label}
                </label>
              </li>
            );
          })}
        </ul>

        <CurrentSelectedList
          selectedElements={selectedElements}
          onRemove={handleRemove}
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-2 py-1"
          >
            Save
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-2 py-1"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
);
