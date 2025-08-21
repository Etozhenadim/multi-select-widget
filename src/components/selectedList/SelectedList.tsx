import { observer } from "mobx-react-lite";
import { selectedElementsStore } from "@/stores/selectedElementsStore";
import React from "react";
export const SelectedList = observer(() => {
  return (
    <>
      <p>
        You currently have {selectedElementsStore.data.length} selected items
      </p>
      {selectedElementsStore.data.length > 0 && (
        <ul className="text-white flex flex-wrap gap-2 w-full">
          {selectedElementsStore.data.map((item) => (
            <li
              key={item.id}
              className="min-w-[142px] bg-[#121212] text-inherit leading-none flex items-center"
            >
              <span className="flex-1 border-r-1 border-white pl-2.5">
                {item.label}
              </span>
              <span
                className="text-xs px-2.5 cursor-pointer h-full py-2.5"
                onClick={() => selectedElementsStore.removeElementById(item.id)}
              >
                X
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
});
