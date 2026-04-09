import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  isToday,
  format,
  addMonths,
  subMonths,
} from "date-fns";

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export type SelectionState = "idle" | "start-selected" | "range-selected";

/** Generate a 6-week grid (Mon–Sun) for the given month */
export function generateCalendarDays(year: number, month: number): CalendarDay[] {
  const monthStart = startOfMonth(new Date(year, month));
  const monthEnd = endOfMonth(monthStart);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  return eachDayOfInterval({ start: gridStart, end: gridEnd }).map((date) => ({
    date,
    isCurrentMonth: isSameMonth(date, monthStart),
    isToday: isToday(date),
  }));
}

export function isStartDate(date: Date, startDate: Date | null): boolean {
  return startDate ? isSameDay(date, startDate) : false;
}

export function isEndDate(date: Date, endDate: Date | null): boolean {
  return endDate ? isSameDay(date, endDate) : false;
}

export function isInRange(
  date: Date,
  startDate: Date | null,
  endDate: Date | null
): boolean {
  if (!startDate || !endDate) return false;
  const [s, e] =
    startDate <= endDate ? [startDate, endDate] : [endDate, startDate];
  return isWithinInterval(date, { start: s, end: e });
}

export function isSingleDay(
  startDate: Date | null,
  endDate: Date | null
): boolean {
  if (!startDate || !endDate) return false;
  return isSameDay(startDate, endDate);
}

export const WEEKDAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export { format, addMonths, subMonths, isSameDay };