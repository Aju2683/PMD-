export const currency =
  new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    },
  );

export const compactNumber =
  new Intl.NumberFormat(
    "en-US",
    {
      notation: "compact",
      maximumFractionDigits: 1,
    },
  );

export function formatCategory(
  category = "",
) {
  return category
    .split("-")
    .filter(Boolean)
    .map(
      (part) =>
        part
          .charAt(0)
          .toUpperCase() +
        part.slice(1),
    )
    .join(" ");
}

export function getStockTone(stock) {
  if (stock <= 10) {
    return "critical";
  }

  if (stock <= 30) {
    return "watch";
  }

  return "healthy";
}