import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 0 - marketplace with auth
// 1 - 3ando product ybi3 ypostihom with help of AI
// 2 - input : Image => detailed description, tags, title, category, color, size, material
// image enhancer (remove white bg and choose background)
// generate post in the post
