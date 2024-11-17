"use client";

import React from "react";
import { useDatePickerStore } from "../store/useDatePickerStore";

function parseCurrentDate() {
  const date = new Date().toLocaleString().split("/");
  return `${date[2].split(",")[0]}-${date[0]}-${date[1]}`;
}

const DateRangeSelector = () => {
  // const { startDate, endDate, setStartDate, setEndDate } = useDatePickerStore();
  const startDate = useDatePickerStore((state) => state.startDate);
  const setStartDate = useDatePickerStore((state) => state.setStartDate);

  console.log("startDate ---> ", startDate);
  return (
    <div className="mb-4">
      <label className="block font-medium mb-2">Date Range:</label>
      <div className="flex space-x-4">
        <div>
          <p>Start Date:</p>
          <input
            type="date"
            value={startDate ? (startDate as unknown as string) : ""}
            onChange={(e) => {
              setStartDate(e.target.value as unknown as Date);
            }}
          />
          {/* <input type="date" value={startDate ? String(startDate) : parseCurrentDate()} onChange={(e)=>{setStartDate(e.target.value as unknown as Date)} } /> */}
          {/* <DatePickerPopover onChange={(date) => setStartDate(date)} selected={startDate} /> */}
          {/* <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="p-2 border rounded-md"
          /> */}
        </div>
        {/* <div>
          <p>End Date:</p>
          <input type="date" value={endDate ? String(endDate) : parseCurrentDate()} onChange={(e)=>{setEndDate(e.target.value as unknown as Date)} } />
        </div> */}
      </div>
    </div>
  );
};

export default DateRangeSelector;
