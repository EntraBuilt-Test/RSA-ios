// Phone: Indian 10-digit mobile numbers (starts 6-9).
export const PHONE_HELP = 'Enter a valid 10-digit mobile number';

export function sanitizePhoneInput(value) {
  return (value || '').replace(/\D/g, '').slice(0, 10);
}

export function isValidPhone(phone) {
  return /^[6-9]\d{9}$/.test(phone || '');
}

// Vehicle: Indian registration number format, e.g. TN07AB1234.
export const VEHICLE_HELP = 'Format: TN07AB1234 (state code, RTO code, series, number)';
export const VEHICLE_REQUIRED_HELP = 'Vehicle number is required';

export function sanitizeVehicleInput(value) {
  return (value || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
}

export function isValidVehicleNumber(value) {
  return /^[A-Z]{2}\d{1,2}[A-Z]{1,3}\d{4}$/.test(value || '');
}

export function isVehicleNumberProvided(value) {
  return Boolean((value || '').trim());
}
