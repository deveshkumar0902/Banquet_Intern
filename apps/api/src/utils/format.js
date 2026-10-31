const IST = 'Asia/Kolkata';

/** '2026-12-12' → 'Sat, 12 Dec 2026' */
export const formatEventDate = (isoDate) =>
  new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate}T00:00:00Z`));

/** UTC ISO timestamp → '2026-11-01 14:05' in India time. */
export const formatIst = (isoTimestamp) => {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: IST,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(new Date(isoTimestamp))
      .map((p) => [p.type, p.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}`;
};

/** IST calendar date → UTC ISO instant at the start of that day. */
export const istDayStartUtc = (isoDate) => new Date(`${isoDate}T00:00:00+05:30`).toISOString();

/** Digits for a wa.me link: Indian numbers get the 91 country code. */
export const whatsappDigits = (phone) => {
  const digits = String(phone).replace(/\D/g, '');
  if (/^[6-9]\d{9}$/.test(digits)) return `91${digits}`;
  if (/^0[6-9]\d{9}$/.test(digits)) return `91${digits.slice(1)}`;
  return digits;
};
