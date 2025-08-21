import { ElementI } from "@/types/elements";

interface CurrentSelectedListProps {
  selectedElements: ElementI[];
  onRemove: (id: number) => void;
}

export const CurrentSelectedList = ({
  selectedElements,
  onRemove,
}: CurrentSelectedListProps) => {
  return (
    <>
      {selectedElements.length > 0 && <h3 className="text-sm text-gray-300">Current selected</h3>}
      <ul className="text-white flex flex-wrap gap-2 w-full">
        {selectedElements.map((item) => (
          <li
            key={item.id}
            className="min-w-[120px] bg-[#121212] text-inherit leading-none flex items-center rounded-sm border border-gray-700"
          >
            <span className="flex-1 border-r border-gray-700 pl-2.5 py-2 text-sm">
              {item.label}
            </span>
            <button
              className="text-xs px-2 py-2 hover:text-gray-300 active:text-gray-400"
              onClick={() => onRemove(item.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
