import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertFileSize(size: number) {
  const mb = 1000 * 1024;
  const kb = 1024;

  if (size >= mb) {
    return `${(size / mb).toFixed(2)} MB`;
  }
  if (size >= kb) {
    return `${(size / kb).toFixed(2)} KB`;
  }
  return `${(size / 1024).toFixed(2)} KB`;
}
