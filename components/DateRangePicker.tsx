"use client";

import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { TrashIcon } from "./icons";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  phase: "idle" | "start" | "complete";
  onReset: () => void;
}

export default function DateRangePicker({
  startDate,
  endDate,
  phase,
  onReset,
}: DateRangePickerProps) {
  const fmt = (d: Date) => format(d, "MMM d, yyyy");

  return (
    <div className="mt-3 mb-1">
      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-slate-400 text-center py-2"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Click a day to start selecting a date range
          </motion.p>
        )}

        {phase === "start" && startDate && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2 py-1.5"
          >
            <RangeBadge label="From" date={fmt(startDate)} active />
            <span className="text-slate-300">→</span>
            <RangeBadge label="To" date="Select end" muted />
          </motion.div>
        )}

        {phase === "complete" && startDate && endDate && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2 py-1.5 flex-wrap"
          >
            <RangeBadge label="From" date={fmt(startDate)} active />
            <span className="text-slate-400 text-xs font-medium">→</span>
            <RangeBadge label="To" date={fmt(endDate)} active />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReset}
              className="ml-1 p-1.5 rounded-full text-slate-400 hover:text-red-400 hover:bg-red-50 transition-colors"
              title="Clear selection"
            >
              <TrashIcon />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RangeBadge({
  label,
  date,
  active,
  muted,
}: {
  label: string;
  date: string;
  active?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center px-3 py-1 rounded-lg text-center ${
        active
          ? "bg-sky-50 border border-sky-200"
          : muted
          ? "bg-slate-50 border border-dashed border-slate-200"
          : ""
      }`}
    >
      <span
        className="text-xs text-slate-400 font-medium leading-none mb-0.5"
        style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.08em" }}
      >
        {label}
      </span>
      <span
        className={`text-xs font-semibold leading-none ${
          active ? "text-sky-700" : "text-slate-400"
        }`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {date}
      </span>
    </div>
  );
}