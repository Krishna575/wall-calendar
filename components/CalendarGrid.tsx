"use client";

import { motion, AnimatePresence } from "framer-motion";
import { format, isSameDay } from "date-fns";
import {
  CalendarDay,
  WEEKDAY_LABELS,
  isStartDate,
  isEndDate,
  isInRange,
} from "@/utils/calendar";
import clsx from "clsx";

interface CalendarGridProps {
  days: CalendarDay[];
  startDate: Date | null;
  endDate: Date | null;
  hoverDate: Date | null;
  phase: "idle" | "start" | "complete";
  onDayClick: (date: Date) => void;
  onDayHover: (date: Date | null) => void;
  monthKey: string;
}

export default function CalendarGrid({
  days,
  startDate,
  endDate,
  hoverDate,
  phase,
  onDayClick,
  onDayHover,
  monthKey,
}: CalendarGridProps) {
  // For preview range during hover
  const previewEnd = phase === "start" ? hoverDate : null;

  const isPreviewInRange = (date: Date) => {
    if (!previewEnd || !startDate) return false;
    const [s, e] =
      startDate <= previewEnd ? [startDate, previewEnd] : [previewEnd, startDate];
    const time = date.getTime();
    return time > s.getTime() && time < e.getTime();
  };

  const isPreviewStart = (date: Date) =>
    previewEnd && startDate
      ? isSameDay(date, startDate <= previewEnd ? startDate : previewEnd)
      : false;

  const isPreviewEnd = (date: Date) =>
    previewEnd && startDate
      ? isSameDay(date, startDate <= previewEnd ? previewEnd : startDate)
      : false;

  const getIsStart = (date: Date) => isStartDate(date, startDate);
  const getIsEnd = (date: Date) => isEndDate(date, endDate);
  const getIsInRange = (date: Date) => isInRange(date, startDate, endDate);

  return (
    <div className="w-full">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAY_LABELS.map((label, i) => (
          <div
            key={label}
            className={clsx(
              "text-center py-1.5 text-xs font-semibold tracking-widest",
              i >= 5 ? "text-sky-500" : "text-slate-400"
            )}
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={monthKey}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className="grid grid-cols-7"
        >
          {days.map((day, idx) => {
            const isStart = getIsStart(day.date);
            const isEnd = getIsEnd(day.date);
            const inRange = getIsInRange(day.date);
            const isPrevStart = !startDate && isPreviewStart(day.date);
            const isPrevEnd = !endDate && isPreviewEnd(day.date);
            const inPreview = !endDate && isPreviewInRange(day.date);

            const isSelected = isStart || isEnd;
            const highlighted = isSelected || inRange || isPrevStart || isPrevEnd || inPreview;

            // Determine range position for bg extension
            const dayOfWeek = idx % 7; // 0=Mon .. 6=Sun
            const isRangeFirst =
              (isStart || isPrevStart) && !(isStart && isEnd);
            const isRangeLast = (isEnd || isPrevEnd) && !(isStart && isEnd);

            return (
              <div key={day.date.toISOString()} className="relative flex items-center justify-center py-0.5">
                {/* Range background strip */}
                {(inRange || inPreview) && (
                  <div className="absolute inset-y-0.5 inset-x-0 bg-sky-100" />
                )}
                {isRangeFirst && (
                  <div className="absolute inset-y-0.5 right-0 left-1/2 bg-sky-100" />
                )}
                {isRangeLast && (
                  <div className="absolute inset-y-0.5 left-0 right-1/2 bg-sky-100" />
                )}

                <motion.button
                  whileHover={
                    day.isCurrentMonth ? { scale: 1.12 } : undefined
                  }
                  whileTap={day.isCurrentMonth ? { scale: 0.93 } : undefined}
                  onClick={() => day.isCurrentMonth && onDayClick(day.date)}
                  onMouseEnter={() =>
                    day.isCurrentMonth && onDayHover(day.date)
                  }
                  onMouseLeave={() => onDayHover(null)}
                  className={clsx(
                    "relative z-10 w-8 h-8 text-xs flex items-center justify-center rounded-full transition-all duration-150 font-medium select-none",
                    {
                      // Not current month
                      "text-slate-200 cursor-default": !day.isCurrentMonth,
                      // Today
                      "ring-2 ring-sky-400 ring-offset-1 font-bold":
                        day.isToday && !isSelected,
                      // Selected (start or end)
                      "bg-sky-500 text-white shadow-day font-semibold":
                        isSelected,
                      // In range
                      "text-sky-700 font-medium": (inRange || inPreview) && !isSelected,
                      // Normal day
                      "text-slate-700 hover:bg-slate-100":
                        !highlighted && day.isCurrentMonth,
                      // Weekend
                      "text-sky-600":
                        (dayOfWeek === 5 || dayOfWeek === 6) &&
                        !highlighted &&
                        !isSelected &&
                        day.isCurrentMonth,
                    }
                  )}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  aria-label={format(day.date, "MMMM d, yyyy")}
                  disabled={!day.isCurrentMonth}
                >
                  {format(day.date, "d")}

                  {/* Today dot */}
                  {day.isToday && !isSelected && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-sky-500 rounded-full" />
                  )}
                </motion.button>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}