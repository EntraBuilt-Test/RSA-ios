// Shared formatting helpers used across the app (ledgers, reports, vouchers,
// labour pages, etc). Kept locale-consistent with the rest of the codebase,
// which uses 'en-IN' for numbers and dates (see CustomModulePage.jsx).

/**
 * Formats a number as Indian Rupee currency, e.g. 125000 -> "₹1,25,000".
 * Non-numeric / missing values fall back to "₹0".
 */
export function formatCurrency(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return '₹0';

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(num);
}

/**
 * Formats a date string/Date as DD/MM/YYYY (en-IN convention).
 * Invalid or missing values return an empty string.
 */
export function formatDate(value) {
  if (!value) return '';
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return '';

  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
