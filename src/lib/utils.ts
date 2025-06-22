import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const cutString = (data: string, count: number) => {
  const F = data.slice(0, count || 3);
  const L = data.slice(-count);
  return F ? `${F}...${L}` : "-";
}
