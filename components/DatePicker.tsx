import React from "react";
import { useDatePickerStore } from "../store/useDatePickerStore";
import RecurrenceOptions from "./RecurrenceOptions";
import DateRangeSelector from "./DateRangeSelector";
import PreviewCalendar from "./PreviewCalendar";

const DatePicker = () => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Recurring Date Picker</h1>
      <RecurrenceOptions />
      <DateRangeSelector />
      <PreviewCalendar />
    </div>
  );
};

export default DatePicker;
