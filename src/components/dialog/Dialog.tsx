import React, { useState, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { selectedElementsStore } from "@/stores/selectedElementsStore";
import { useDebounce } from "@/hooks/useDebounce";
import { FilterSelect, SearchInput, CurrentSelectedList } from "@/components";
import { ElementI } from "@/types/elements";
interface DialogProps {
  setIsDialogOpen: (open: boolean) => void;
  elementsList: ElementI[];
}
export const Dialog = observer(
  ({ setIsDialogOpen, elementsList }: DialogProps) => {
    const [selectedElements, setSelectedElements] = useState<ElementI[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterValue, setFilterValue] = useState<number | null>(null);
    // Debounce the searchInput term to avoid excessive re-renders
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const handleSelect = (item: ElementI) => {
      const exists = selectedElements.some((el) => el.id === item.id);
      if (exists) {
        setSelectedElements(selectedElements.filter((el) => el.id !== item.id));
      } else if (selectedElements.length < 3) {
        setSelectedElements([...selectedElements, item]);
      }
    };

    const filteredElements = useMemo(() => {
      return elementsList.filter((el) => {
        const matchesSearch = el.label
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());
        const matchesFilter = filterValue ? el.id > filterValue : true;
        return matchesSearch && matchesFilter;
      });
    }, [elementsList, debouncedSearchTerm, filterValue]);

    const handleSave = () => {
      selectedElementsStore.setElements(selectedElements);
      setIsDialogOpen(false);
    };

    return (
      <div className="flex flex-col gap-5 relative bg-[#373737] text-white w-full p-4">
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
        <ul className="max-h-[400px] w-full overflow-y-auto border border-gray-300 ">
          {filteredElements.map((element, index) => {
            const isSelected = selectedElements.some(
              (item) => item.id === element.id,
            );
            const disableOthers = selectedElements.length >= 3 && !isSelected;
            return (
              <li key={index}>
                <label
                  htmlFor={`checkbox-${index}`}
                  className={`flex items-center p-2 w-full ${
                    disableOthers
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  } hover:bg-gray-900`}
                >
                  <input
                    type="checkbox"
                    id={`checkbox-${index}`}
                    checked={isSelected}
                    onChange={() => handleSelect(element)}
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
          setSelectedElements={setSelectedElements}
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
  },
);
