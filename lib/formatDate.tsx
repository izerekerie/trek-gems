export function formatDateTime(isoString) {
  const date = new Date(isoString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 12-hour format if needed
  };

  return date.toLocaleString("en-US", options);
}

// Example usage:
const formattedDate = formatDateTime("2025-05-12T10:00:00.000Z");
