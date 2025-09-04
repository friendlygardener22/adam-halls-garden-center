/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param currency - The currency code (default: 'USD')
 * @param locale - The locale for formatting (default: 'en-US')
 * @returns Formatted currency string
 */
export const formatPrice = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Format a price range
 * @param minPrice - Minimum price
 * @param maxPrice - Maximum price
 * @param currency - The currency code (default: 'USD')
 * @returns Formatted price range string
 */
export const formatPriceRange = (
  minPrice: number,
  maxPrice: number,
  currency: string = 'USD'
): string => {
  if (minPrice === maxPrice) {
    return formatPrice(minPrice, currency);
  }
  return `${formatPrice(minPrice, currency)} - ${formatPrice(maxPrice, currency)}`;
};

/**
 * Format a price with discount
 * @param originalPrice - Original price
 * @param discountPercentage - Discount percentage (0-100)
 * @param currency - The currency code (default: 'USD')
 * @returns Object with original, discounted, and savings amounts
 */
export const formatPriceWithDiscount = (
  originalPrice: number,
  discountPercentage: number,
  currency: string = 'USD'
) => {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const discountedPrice = originalPrice - discountAmount;

  return {
    original: formatPrice(originalPrice, currency),
    discounted: formatPrice(discountedPrice, currency),
    savings: formatPrice(discountAmount, currency),
    discountPercentage,
  };
};

/**
 * Parse a price string back to a number
 * @param priceString - The formatted price string
 * @returns The numeric value
 */
export const parsePrice = (priceString: string): number => {
  return parseFloat(priceString.replace(/[^0-9.-]+/g, ''));
};

/**
 * Calculate tax amount
 * @param subtotal - The subtotal amount
 * @param taxRate - The tax rate as a percentage (e.g., 8.25 for 8.25%)
 * @returns The tax amount
 */
export const calculateTax = (subtotal: number, taxRate: number): number => {
  return (subtotal * taxRate) / 100;
};

/**
 * Calculate total with tax
 * @param subtotal - The subtotal amount
 * @param taxRate - The tax rate as a percentage
 * @returns The total amount including tax
 */
export const calculateTotalWithTax = (subtotal: number, taxRate: number): number => {
  return subtotal + calculateTax(subtotal, taxRate);
};
