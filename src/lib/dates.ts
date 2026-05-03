/**
 * Canonical timeline anchors.
 * t is days since May 1 2026. SPEC §3.1.
 */

export const DAY_MS = 1000 * 60 * 60 * 24;

export const NOW_DATE = new Date(Date.UTC(2026, 4, 1)); // May 1 2026
export const Q1_DATE = new Date(Date.UTC(2026, 7, 1)); // Aug 1 2026
export const Q2_DATE = new Date(Date.UTC(2026, 11, 1)); // Dec 1 2026
export const YEAR1_DATE = new Date(Date.UTC(2027, 3, 1)); // Apr 1 2027
export const FUTURE_DATE = new Date(Date.UTC(2030, 3, 1)); // Apr 1 2030

export const T_MIN = 0;
export const T_MAX_NORMAL = daysBetween(NOW_DATE, YEAR1_DATE); // ≈ 335
export const T_MAX_EXTENDED = daysBetween(NOW_DATE, FUTURE_DATE); // ≈ 1431

export const T_NOW = 0;
export const T_Q1 = daysBetween(NOW_DATE, Q1_DATE); // ≈ 92
export const T_Q2 = daysBetween(NOW_DATE, Q2_DATE); // ≈ 214
export const T_YEAR1 = T_MAX_NORMAL;
export const T_FUTURE = T_MAX_EXTENDED;

export function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / DAY_MS);
}

export function dateFromT(t: number): Date {
  return new Date(NOW_DATE.getTime() + t * DAY_MS);
}

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatDate(d: Date): string {
  return `${MONTHS_SHORT[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function formatDateLong(d: Date): string {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][d.getUTCMonth()];
  return `${month} ${d.getUTCFullYear()}`;
}
