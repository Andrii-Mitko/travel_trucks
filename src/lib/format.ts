export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatLocation(location: string): string {
  const [country, city] = location.split(",").map((part) => part.trim());

  if (!country || !city) {
    return location;
  }

  return `${city}, ${country}`;
}

export function formatLabel(value: string): string {
  return value
    .split("_")
    .map((part) => capitalize(part))
    .join(" ");
}
