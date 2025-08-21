import React from "react";
import {observer} from "mobx-react-lite";
import {FilterSelect, SearchInput, CurrentSelectedList} from "@/components";
import {ElementI} from "@/types/elements";
import { DialogStore } from "@/stores/dialogStore";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

interface DialogProps {
  setIsDialogOpen: (open: boolean) => void;
  elementsList: ElementI[];
}
export const Dialog = observer(
  ({setIsDialogOpen, elementsList}: DialogProps) => {
    const storeRef = React.useRef<DialogStore | null>(null);
    if (storeRef.current === null) {
      storeRef.current = new DialogStore(elementsList);
    }
    const store = storeRef.current;

    const [searchInput, setSearchInput] = React.useState(store.searchTerm);
    const commitSearch = useDebouncedCallback((value: string) => {
      store.setSearchTerm(value);
    }, 300);

    const handleSearchChange = React.useCallback((value: string) => {
      setSearchInput(value);
      commitSearch(value);
    }, [commitSearch]);

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
          <SearchInput value={searchInput} onChange={handleSearchChange} />
          <FilterSelect value={store.filterValue} onChange={store.setFilterValue} />
        </div>
        <ul className="flex-1 min-h-0 max-h-[280px] overflow-y-auto w-full border border-gray-300">
          {store.filteredElements.map((element) => {
            const isSelected = store.isSelected(element.id);
            const disableOthers = !isSelected && !store.canSelectMore;
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
                    onChange={() => store.toggle(element)}
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
          selectedElements={store.selectedElements}
          onRemove={store.remove}
        />
        <div className="flex gap-2">
          <button
            onClick={() => { store.save(); setIsDialogOpen(false); }}
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
