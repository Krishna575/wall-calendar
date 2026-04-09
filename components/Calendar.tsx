"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { format, addMonths, subMonths } from "date-fns";
import HeroImage from "./HeroImage";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import DateRangePicker from "./DateRangePicker";
import NotesPanel from "./NotesPanel";
import { generateCalendarDays } from "@/utils/calendar";
import { useDateRange } from "@/hooks/useDateRange";

// Spiral holes decorative component
function SpiralBinding() {
  return (
    <div
      className="absolute -top-3.5 left-0 right-0 flex justify-center gap-[18px] z-20 pointer-events-none"
      aria-hidden
    >
      {[...Array(14)].map((_, i) => (
        <div
          key={i}
          className="w-4 h-4 rounded-full border-[2.5px] relative flex-shrink-0"
          style={{
            background: "#f0f4f8",
            borderColor: "#94a3b8",
          }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
            style={{ background: "#94a3b8" }}
          />
        </div>
      ))}
    </div>
  );
}

export default function Calendar() {
  const today = useMemo(() => new Date(), []);
  const [currentDate, setCurrentDate] = useState(today);

  const { startDate, endDate, phase, hoverDate, setHoverDate, handleDayClick, reset } =
    useDateRange();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthKey = format(currentDate, "yyyy-MM");

  const days = useMemo(
    () => generateCalendarDays(year, month),
    [year, month]
  );

  const handlePrev = useCallback(() => setCurrentDate((d) => subMonths(d, 1)), []);
  const handleNext = useCallback(() => setCurrentDate((d) => addMonths(d, 1)), []);
  const handleToday = useCallback(() => setCurrentDate(today), [today]); // eslint-disable-line

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-5xl"
    >
      {/* Outer wrapper with spiral binding illusion */}
      <div className="relative pt-6">
        <SpiralBinding />

        {/* Main calendar card */}
        <div
          className="bg-white rounded-2xl overflow-hidden w-full"
          style={{
            boxShadow:
              "0 24px 80px rgba(0,0,0,0.14), 0 4px 20px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          {/* Hero Image (spans full width) */}
          <HeroImage currentDate={currentDate} />

          {/* Body: two columns on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-0">
            {/* Left: Calendar grid + header + range picker */}
            <div className="p-5 md:p-7 border-b lg:border-b-0 lg:border-r border-slate-100">
              <CalendarHeader
                currentDate={currentDate}
                onPrev={handlePrev}
                onNext={handleNext}
                onToday={handleToday}
              />

              <CalendarGrid
                days={days}
                startDate={startDate}
                endDate={endDate}
                hoverDate={hoverDate}
                phase={phase}
                onDayClick={handleDayClick}
                onDayHover={setHoverDate}
                monthKey={monthKey}
              />

              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                phase={phase}
                onReset={reset}
              />
            </div>

            {/* Right: Notes panel */}
            <div className="p-5 md:p-7 bg-gradient-to-br from-white to-slate-50/60 min-h-[260px]">
              <NotesPanel
                startDate={startDate}
                endDate={endDate}
                currentMonthKey={monthKey}
              />
            </div>
          </div>
        </div>

        {/* Subtle bottom shadow card for depth */}
        <div
          className="absolute -bottom-2 left-4 right-4 h-4 bg-black/5 rounded-b-2xl -z-10 blur-sm"
          aria-hidden
        />
        <div
          className="absolute -bottom-4 left-8 right-8 h-4 bg-black/4 rounded-b-2xl -z-20 blur-sm"
          aria-hidden
        />
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-slate-400 text-xs mt-6"
        style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px" }}
      >
        CLICK TO SELECT · DRAG TO RANGE · CLICK AGAIN TO RESET
      </motion.p>
    </motion.div>
  );
}