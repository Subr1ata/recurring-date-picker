"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useDatePickerStore } from "../store/useDatePickerStore";
import { LooseValue } from "react-calendar/src/shared/types.js";
import Holidays, { HolidaysTypes } from "date-holidays";

// Dynamically import the calendar for client-side rendering
const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
});

// Utility function to fetch holidays for the given month and year
const getHolidaysForMonth = (
  year: number,
  month: number,
  countryCode: string
) => {
  const holidays = new Holidays(countryCode);
  const holidayDates = holidays.getHolidays(
    new Date(year, month, 1),
    String(new Date(year, month + 1, 0))
  );

  return holidayDates.map((value: HolidaysTypes.Holiday) => ({
    date: new Date(value.date).toISOString().slice(0, 10), // Format the date as YYYY-MM-DD
    name: value.name,
  }));
};

const PreviewCalendar = () => {
  const { startDate, endDate, recurrence, customization, disabledDates } =
    useDatePickerStore();
  const [dates, setDates] = useState<Date[]>([]);
  const [holidaysData, setHolidaysData] = useState<
    { date: string; name: string }[]
  >([]);

  // Fetch holidays on component mount
  useEffect(() => {
    const fetchHolidays = () => {
      const holidays = getHolidaysForMonth(
        new Date().getFullYear(),
        new Date().getMonth(),
        "IN" // Replace 'IN' with your country code
      );

      setHolidaysData(holidays);
    };

    fetchHolidays();
  }, []);

  // Calculate recurring dates
  useEffect(() => {
    if (!startDate && !endDate && dates.length) {
      setDates([]);
    }
    if (!startDate) return;

    const calculateRecurringDates = () => {
      if (endDate && startDate) {
        const results: Date[] = [];
        let current = new Date(startDate);

        while (!endDate || current <= new Date(endDate)) {
          results.push(new Date(current));
          if (recurrence === "daily") {
            current.setDate(current.getDate() + customization.interval);
          } else if (recurrence === "weekly") {
            current.setDate(current.getDate() + 7 * customization.interval);
          } else if (recurrence === "monthly") {
            current.setMonth(current.getMonth() + customization.interval);
          } else if (recurrence === "yearly") {
            current.setFullYear(current.getFullYear() + customization.interval);
          }
        }

        setDates(results);
      }
    };

    calculateRecurringDates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, recurrence, customization]);

  // Render custom tile content for holidays and recurring dates
  const renderCalendarTile = ({ date }: { date: Date }) => {
    const holiday = disabledDates.find(
      (h) => h.date === date.toISOString().slice(0, 10)
    );

    const isRecurringDate = dates.some(
      (d) => d.toISOString().slice(0, 10) === date.toISOString().slice(0, 10)
    );

    return (
      <div
        className={`p-2 rounded-md ${
          holiday ? "bg-yellow-200 text-black" : ""
        } ${isRecurringDate ? "border border-blue-500" : ""}`}
        title={holiday ? holiday.name : ""}
      >
        {/* <span>{date.getDate()}</span> */}
        {holiday && (
          <div className="text-xs text-gray-700 mt-1">{holiday.name}</div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h2 className="font-medium mb-2 text-xl">Recurring Dates Preview:</h2>
      <Calendar
        value={dates as LooseValue}
        tileClassName={({ date }) =>
          dates.some((d) => d.toDateString() === date.toDateString())
            ? "bg-blue-200 m-2"
            : "m-2"
        }
        className="bg-white shadow-md rounded-md"
        tileContent={renderCalendarTile}
      />
    </div>
  );
};

export default PreviewCalendar;
