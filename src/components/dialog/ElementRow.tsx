import React from "react";
import { ElementI } from "@/types/elements";

interface ElementRowProps {
  element: ElementI;
  isSelected: boolean;
  isDisabled: boolean;
  onToggle: (element: ElementI) => void;
  baseItemClass: string;
}

export const ElementRow: React.FC<ElementRowProps> = React.memo(
  ({ element, isSelected, isDisabled, onToggle, baseItemClass }) => {
    return (
      <li key={element.id}>
        <label
          htmlFor={`checkbox-${element.id}`}
          className={`${baseItemClass} ${
            isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        >
          <input
            type="checkbox"
            id={`checkbox-${element.id}`}
            checked={isSelected}
            onChange={() => onToggle(element)}
            disabled={isDisabled}
            className="mr-2 accent-green-600"
          />
          {element.label}
        </label>
      </li>
    );
  }
);

ElementRow.displayName = "ElementRow"; 