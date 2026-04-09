"use client";

import { useState, useCallback } from "react";
import { isSameDay } from "date-fns";
import { useLocalStorage } from "./useLocalStorage";

export type DateRangeState = {
  startDate: string | null; // ISO string for serialization
  endDate: string | null;
};

export type SelectionPhase = "idle" | "start" | "complete";

export function useDateRange() {
  const [range, setRange] = useLocalStorage<DateRangeState>(
    "wall-calendar-range",
    { startDate: null, endDate: null }
  );
  const [phase, setPhase] = useState<SelectionPhase>(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("wall-calendar-range");
      if (saved) {
        const parsed: DateRangeState = JSON.parse(saved);
        if (parsed.startDate && parsed.endDate) return "complete";
        if (parsed.startDate) return "start";
      }
    }
    return "idle";
  });
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const startDate = range.startDate ? new Date(range.startDate) : null;
  const endDate = range.endDate ? new Date(range.endDate) : null;

  const handleDayClick = useCallback(
    (date: Date) => {
      if (phase === "idle") {
        setRange({ startDate: date.toISOString(), endDate: null });
        setPhase("start");
      } else if (phase === "start") {
        if (startDate && isSameDay(date, startDate)) {
          // same day click → reset
          setRange({ startDate: null, endDate: null });
          setPhase("idle");
          return;
        }
        const [s, e] =
          startDate && date >= startDate
            ? [startDate, date]
            : [date, startDate!];
        setRange({
          startDate: s.toISOString(),
          endDate: e.toISOString(),
        });
        setPhase("complete");
      } else {
        // reset
        setRange({ startDate: null, endDate: null });
        setPhase("idle");
        setHoverDate(null);
      }
    },
    [phase, startDate, setRange]
  );

  const reset = useCallback(() => {
    setRange({ startDate: null, endDate: null });
    setPhase("idle");
    setHoverDate(null);
  }, [setRange]);

  return {
    startDate,
    endDate,
    phase,
    hoverDate,
    setHoverDate,
    handleDayClick,
    reset,
  };
}