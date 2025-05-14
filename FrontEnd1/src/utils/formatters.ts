/**
 * Formats a number as USD currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Formats a number with comma separators and optional decimal places
 */
export const formatNumber = (value: number, decimals = 2): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(value);
};

/**
 * Formats a large number with K, M, B suffixes
 */
export const formatCompactNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
};

/**
 * Truncates an Ethereum address for display
 */
export const truncateAddress = (address: string, chars = 4): string => {
  if (!address) return '';
  const start = address.substring(0, chars + 2);
  const end = address.substring(address.length - chars);
  return `${start}...${end}`;
};

/**
 * Formats a date in a human-friendly format
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

/**
 * Formats a percentage value
 */
export const formatPercent = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
};

/**
 * Formats a carbon tonnage value
 */
export const formatCarbonTons = (value: number): string => {
  return `${formatNumber(value)} tCO₂e`;
};

/**
 * Formats a yield percentage
 */
export const formatYield = (value: number): string => {
  return `${value.toFixed(2)}%`;
};