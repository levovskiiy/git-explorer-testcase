const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  dateStyle: "short",
  hour12: false,
});

export function formatDate(value) {
  console.log(value);
  if (!value) {
    return "-";
  }

  if (typeof value === "string" || typeof value === "number") {
    value = new Date(value);
  }

  return dateFormatter.format(value);
}
