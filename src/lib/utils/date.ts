/**
 * Formats a Date object or date string into a localized string
 * @param date - The date to format (can be a Date object or date string)
 * @returns A formatted date string (e.g., "March 20, 2024")
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj);
}
