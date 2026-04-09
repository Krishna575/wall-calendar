"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";
import { format } from "date-fns";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export default function CalendarHeader({
  currentDate,
  onPrev,
  onNext,
  onToday,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between px-1 pb-3 pt-1">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={onPrev}
        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-sky-50 hover:text-sky-600 transition-colors focus-ring"
        aria-label="Previous month"
      >
        <ChevronLeftIcon />
      </motion.button>

      <div className="flex items-center gap-2">
        <motion.span
          key={format(currentDate, "MM-yyyy")}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="text-slate-700 font-semibold text-sm tracking-wide"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {format(currentDate, "MMMM yyyy")}
        </motion.span>
        <button
          onClick={onToday}
          className="text-xs px-2 py-0.5 rounded-full border border-sky-200 text-sky-600 hover:bg-sky-50 transition-colors font-medium"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Today
        </button>
      </div>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={onNext}
        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-sky-50 hover:text-sky-600 transition-colors focus-ring"
        aria-label="Next month"
      >
        <ChevronRightIcon />
      </motion.button>
    </div>
  );
}