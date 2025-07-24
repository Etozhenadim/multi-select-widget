import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines and optimizes Tailwind CSS class names.
// Uses `clsx` to merge class values and `twMerge` to remove duplicates and resolve conflicts in Tailwind classes.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
