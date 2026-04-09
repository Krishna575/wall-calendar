"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { NotesIcon, TrashIcon } from "./icons";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface NotesPanelProps {
  startDate: Date | null;
  endDate: Date | null;
  currentMonthKey: string; // "2024-01" etc.
}

type NotesStore = Record<string, string>;

export default function NotesPanel({
  startDate,
  endDate,
  currentMonthKey,
}: NotesPanelProps) {
  const [notes, setNotes] = useLocalStorage<NotesStore>("wall-calendar-notes", {});
  const [activeTab, setActiveTab] = useState<"monthly" | "range">("monthly");

  const rangeKey =
    startDate && endDate
      ? `${format(startDate, "yyyy-MM-dd")}_${format(endDate, "yyyy-MM-dd")}`
      : null;

  const monthlyNote = notes[currentMonthKey] ?? "";
  const rangeNote = rangeKey ? notes[rangeKey] ?? "" : "";

  const updateNote = useCallback(
    (key: string, value: string) => {
      setNotes((prev) => ({ ...prev, [key]: value }));
    },
    [setNotes]
  );

  const clearNote = useCallback(
    (key: string) => {
      setNotes((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    [setNotes]
  );

  const hasRange = !!(startDate && endDate && rangeKey);
  const rangeLabel =
    startDate && endDate
      ? `${format(startDate, "MMM d")} – ${format(endDate, "MMM d")}`
      : "Select a range";

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sky-500">
          <NotesIcon />
        </span>
        <span
          className="text-xs font-semibold text-slate-500 tracking-widest uppercase"
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
        >
          Notes
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-3 p-0.5 bg-slate-100 rounded-lg">
        {(["monthly", "range"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-xs py-1.5 rounded-md transition-all duration-200 font-medium ${
              activeTab === tab
                ? "bg-white text-sky-600 shadow-soft"
                : "text-slate-500 hover:text-slate-700"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {tab === "monthly" ? format(new Date(currentMonthKey + "-01"), "MMM yyyy") : rangeLabel}
          </button>
        ))}
      </div>

      {/* Note area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.18 }}
          className="flex-1 flex flex-col"
        >
          {activeTab === "monthly" ? (
            <NoteArea
              value={monthlyNote}
              onChange={(v) => updateNote(currentMonthKey, v)}
              onClear={() => clearNote(currentMonthKey)}
              placeholder={`Notes for ${format(new Date(currentMonthKey + "-01"), "MMMM yyyy")}…`}
            />
          ) : hasRange && rangeKey ? (
            <NoteArea
              value={rangeNote}
              onChange={(v) => updateNote(rangeKey, v)}
              onClear={() => clearNote(rangeKey)}
              placeholder={`Notes for ${rangeLabel}…`}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xs text-slate-300 text-center leading-relaxed">
                Select a date range on the calendar
                <br />
                to add range-specific notes
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function NoteArea({
  value,
  onChange,
  onClear,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
  placeholder: string;
}) {
  return (
    <div className="flex-1 flex flex-col gap-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 w-full resize-none text-xs text-slate-600 placeholder-slate-300 bg-slate-50 rounded-lg p-3 border border-slate-200 focus:outline-none focus:border-sky-300 focus:bg-white transition-all duration-200 leading-relaxed min-h-[120px]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        rows={6}
      />
      {value && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onClear}
          className="flex items-center gap-1.5 self-end text-xs text-slate-400 hover:text-red-400 transition-colors"
        >
          <TrashIcon />
          Clear note
        </motion.button>
      )}

      {/* Lined paper decoration */}
      <div className="space-y-1 mt-1 opacity-40">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-px bg-slate-200 w-full" />
        ))}
      </div>
    </div>
  );
}