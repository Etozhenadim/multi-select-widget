import { ElementI } from "@/types/elements";

interface CurrentSelectedListProps {
  selectedElements: ElementI[];
  setSelectedElements: (elements: ElementI[]) => void;
}

export const CurrentSelectedList = ({
  selectedElements,
  setSelectedElements,
}: CurrentSelectedListProps) => {
  return (
    <>
      {selectedElements.length > 0 && <h3>Current selected Items</h3>}
      <ul className="text-white flex flex-wrap gap-2 w-full">
        {selectedElements.map((item) => (
          <li
            key={item.id}
            className="min-w-[142px] bg-[#121212] text-inherit leading-none flex items-center"
          >
            <span className="flex-1 border-r-1 border-white pl-2.5">
              {item.label}
            </span>
            <span
              className="text-xs px-2.5 cursor-pointer h-full py-2.5"
              onClick={() =>
                setSelectedElements(
                  selectedElements.filter((i) => i.id !== item.id),
                )
              }
            >
              X
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};
