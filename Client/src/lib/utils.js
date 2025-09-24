import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge multiple class names and Tailwind utilities without conflicts.
 *
 * Example:
 *   cn("px-2 py-1", condition && "bg-red-500")
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
