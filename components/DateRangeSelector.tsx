"use client";

import React from "react";
import { useDatePickerStore } from "../store/useDatePickerStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "./ui/button";

const DateRangeSelector = () => {
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    error,
    presetRange,
    reset,
  } = useDatePickerStore();

  return (
    <div className="mb-4">
      <div className="flex gap-4 m-5">
        <Button onClick={() => presetRange("Today")}>Today</Button>
        <Button onClick={() => presetRange("Last Week")}>Last Week</Button>
        <Button onClick={() => presetRange("Next 7 Days")}>Next 7 Days</Button>
        <Button onClick={() => reset()}>Reset</Button>
      </div>

      <label className="block font-medium mb-2">Date Range:</label>
      <div className="flex space-x-4">
        <div>
          <p>Start Date:</p>
          <DatePicker
            selected={startDate as Date}
            onChange={(date) => setStartDate(date)}
            className="p-2 border rounded-md"
          />
        </div>
        <div>
          <p>End Date:</p>
          <DatePicker
            selected={endDate as Date}
            onChange={(date) => setEndDate(date)}
            className="p-2 border rounded-md"
            isClearable
          />
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default DateRangeSelector;
