import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  locale: string = "en"
): string {
  const usdPrice = typeof price === "string" ? parseFloat(price) : price;
  const iqdPrice = usdPrice * 1500; // Exchange rate: 1 USD = 1500 IQD

  const usdString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(usdPrice);

  const iqdString = new Intl.NumberFormat(locale === "ar" ? "ar-IQ" : "en-IQ", {
    style: "currency",
    currency: "IQD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(iqdPrice);

  return `${usdString} (${iqdString})`;
}

export function calculateSavings(price: number, originalPrice: number): number {
  return Math.max(0, originalPrice - price);
}

export function calculateDiscount(price: number, originalPrice: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
