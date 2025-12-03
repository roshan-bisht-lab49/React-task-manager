import { Deal } from "@/hooks";

export const getFilteredDeals = (
  deals: Deal[],
  filterIndex: number
): Deal[] => {
  switch (filterIndex) {
    case 0:
      return deals.filter((deal) => deal.status === "Pending");
    case 1:
      return deals.filter((deal) => deal.status === "Approved");
    case 2:
      return deals.filter((deal) => deal.status === "Rejected");
    default:
      return deals;
  }
};

export const formatCurrency = (amount: number | undefined) => {
  if (amount === undefined) return 0.0;
  return Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatDateToLocal = (
  dateStr: Date | undefined,
  locale: string = "en-US"
) => {
  if (dateStr === undefined) return "";
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};
