"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useDatePickerStore } from "../store/useDatePickerStore";
import { LooseValue } from "react-calendar/src/shared/types.js";

const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
});

const PreviewCalendar = () => {
  const { startDate, endDate, recurrence, customization } =
    useDatePickerStore();
  const [dates, setDates] = useState<Date[]>([]);

  useEffect(() => {
    if (!startDate && !endDate && dates.length) {
      setDates([]);
    }

    if (!startDate) return;

    const calculateRecurringDates = () => {
      if (startDate && endDate) {
        const results: Date[] = [];
        let current = new Date(startDate);

        while (!endDate || current <= endDate) {
          results.push(new Date(current));
          if (recurrence === "daily")
            current.setDate(current.getDate() + customization.interval);
          else if (recurrence === "weekly")
            current.setDate(current.getDate() + 7 * customization.interval);
          else if (recurrence === "monthly")
            current.setMonth(current.getMonth() + customization.interval);
          else if (recurrence === "yearly")
            current.setFullYear(current.getFullYear() + customization.interval);
        }

        setDates(results);
      }
    };

    calculateRecurringDates();
  }, [startDate, endDate, recurrence, customization]);

  return (
    <div>
      <h2 className="font-medium mb-2">Recurring Dates Preview:</h2>
      <Calendar
        value={dates as LooseValue}
        tileClassName={({ date }) =>
          dates.some((d) => d.toDateString() === date.toDateString())
            ? "bg-blue-200"
            : ""
        }
        className={"bg-red"}
      />
    </div>
  );
};

export default PreviewCalendar;
