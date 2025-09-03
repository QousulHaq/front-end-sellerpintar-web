import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { htmlToText } from "html-to-text"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const dateFormatter = (dateStr: string, addTime: boolean = false): string => {
  const date = new Date(dateStr);

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(addTime && {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
  }).format(date);
}

// lib/utils.ts


export function truncateHtmlToText(html: string, maxLength: number) {
  const text = htmlToText(html, { wordwrap: false })
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text
}


export function truncate(str: string, maxLength: number) {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str
}

