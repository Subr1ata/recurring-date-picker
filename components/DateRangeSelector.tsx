import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDatePickerStore } from "../store/useDatePickerStore";

const DateRangeSelector = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useDatePickerStore();

  return (
    <div className="mb-4">
      <label className="block font-medium mb-2">Date Range:</label>
      <div className="flex space-x-4">
        <div>
          <p>Start Date:</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="p-2 border rounded-md"
          />
        </div>
        <div>
          <p>End Date:</p>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="p-2 border rounded-md"
            isClearable
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangeSelector;
