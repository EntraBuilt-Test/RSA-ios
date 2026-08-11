// Returns the highest "no" value among the pad's fixed, numbered particulars.
// Used on the printed delivery note to number any extra/custom line items
// sequentially right after the standard rows (see DeliveryNotePrint.jsx).
export function highestParticularNumber(particulars = []) {
  return particulars.reduce((max, p) => {
    const n = Number(p?.no);
    return Number.isFinite(n) && n > max ? n : max;
  }, 0);
}
