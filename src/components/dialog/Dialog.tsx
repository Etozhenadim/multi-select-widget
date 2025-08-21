import React from "react";
import {observer} from "mobx-react-lite";
import {FilterSelect, SearchInput, CurrentSelectedList} from "@/components";
import {ElementI} from "@/types/elements";
import { DialogStore } from "@/stores/dialogStore";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { ElementRow } from "./ElementRow";

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

    const baseItemClass = "flex items-center p-2 size-full hover:bg-zinc-800 active:bg-zinc-700 transition-colors";

    return (
      <div className="flex flex-col gap-5 relative bg-zinc-900 text-zinc-100 size-full p-4 rounded-md border border-zinc-700">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-zinc-200">Select items</h2>
          <button
            className="p-2 cursor-pointer text-zinc-300 hover:text-zinc-200 active:text-zinc-400"
            onClick={() => setIsDialogOpen(false)}
          >
            X
          </button>
        </div>
        <div className="flex items-center justify-between gap-3">
          <SearchInput value={searchInput} onChange={handleSearchChange} />
          <FilterSelect value={store.filterValue} onChange={store.setFilterValue} />
        </div>
        <div className="flex flex-col min-h-0 gap-3">
          <ul className="flex-1 min-h-0 max-h-[240px] overflow-y-auto w-full border border-zinc-700 rounded-md">
            {store.filteredElements.map((element) => (
              <ElementRow
                key={element.id}
                element={element}
                isSelected={store.isSelected(element.id)}
                isDisabled={!store.isSelected(element.id) && !store.canSelectMore}
                onToggle={store.toggle}
                baseItemClass={baseItemClass}
              />
            ))}
          </ul>

          <div className="max-h-[120px] overflow-y-auto pr-1">
            <CurrentSelectedList
              selectedElements={store.selectedElements}
              onRemove={store.remove}
            />
          </div>
        </div>
        <div className="flex gap-2 sticky bottom-0 pt-1 bg-zinc-900">
          <button
            onClick={() => { store.save(); setIsDialogOpen(false); }}
            className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white px-3 py-2 rounded"
          >
            Save
          </button>
          <button
            className="bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white px-3 py-2 rounded"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
);
