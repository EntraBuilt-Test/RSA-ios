// Computes the live running-total preview for a single delivery-note line
// item as the user fills out the form. Note: this is a client-side preview
// only - the authoritative amount is calculated server-side when the note
// is saved (only quantity, rate, perDayRate, monthlyRate and the rental
// dates are actually sent to the API; see saveNote in DeliveryNoteForm.jsx).
export function computeItemAmount(item, itemColumns = []) {
  const quantity = Number(item?.quantity) || 0;
  if (quantity <= 0) return 0;

  const rate = Number(item?.rate) || 0;
  const perDayRate = Number(item?.perDayRate) || 0;
  const monthlyRate = Number(item?.monthlyRate) || 0;

  // Rented items (dateTaken set) bill by the period they were out for.
  if (perDayRate > 0 && item?.dateTaken) {
    return quantity * perDayRate * daysBetween(item.dateTaken, item.dateReturned);
  }
  if (monthlyRate > 0 && item?.dateTaken) {
    return quantity * monthlyRate * monthsBetween(item.dateTaken, item.dateReturned);
  }

  // Plain sale / flat-rate item.
  return quantity * rate;
}

function daysBetween(takenStr, returnedStr) {
  const taken = new Date(takenStr);
  if (Number.isNaN(taken.getTime())) return 1;
  const returned = returnedStr ? new Date(returnedStr) : new Date();
  const days = Math.ceil((returned.getTime() - taken.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, days);
}

function monthsBetween(takenStr, returnedStr) {
  const taken = new Date(takenStr);
  if (Number.isNaN(taken.getTime())) return 1;
  const returned = returnedStr ? new Date(returnedStr) : new Date();
  const months =
    (returned.getFullYear() - taken.getFullYear()) * 12 +
    (returned.getMonth() - taken.getMonth()) +
    (returned.getDate() >= taken.getDate() ? 0 : -1);
  return Math.max(1, months + 1);
}
