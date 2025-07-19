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

export function NumberComma(data: number) {
  const r = new Intl.NumberFormat('en-US', {
    currency: 'USD',
  });
  return r.format(data)
}

export const toUrlAsset = (path: string) => {
  if (path.startsWith('http')) {
    return path
  } else {
    const baseUrl = process.env.BASE_URL;
    return `${baseUrl}/${path}`

  }
}
