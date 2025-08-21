import { observer } from "mobx-react-lite";
import { selectedElementsStore } from "@/stores/selectedElementsStore";
import React from "react";
export const SelectedList = observer(() => {
  return (
    <>
      <p className="text-sm text-gray-600">
        You currently have {selectedElementsStore.data.length} selected items
      </p>
      {selectedElementsStore.data.length > 0 && (
        <ul className="text-white flex flex-wrap gap-2 w-full">
          {selectedElementsStore.data.map((item) => (
            <li
              key={item.id}
              className="min-w-[140px] bg-[#121212] text-inherit leading-none flex items-center rounded-sm border border-gray-700"
            >
              <span className="flex-1 border-r border-gray-700 pl-2.5 py-2 text-sm">
                {item.label}
              </span>
              <button
                className="text-xs px-2 py-2 hover:text-gray-300 active:text-gray-400"
                onClick={() => selectedElementsStore.removeElementById(item.id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
});
