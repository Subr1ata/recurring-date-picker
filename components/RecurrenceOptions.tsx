import React from "react";
import { useDatePickerStore } from "../store/useDatePickerStore";

const RecurrenceOptions = () => {
  const { recurrence, setRecurrence } = useDatePickerStore();

  return (
    <div className="mb-4">
      <label className="block font-medium mb-2">Recurrence Pattern:</label>
      <select
        value={recurrence}
        onChange={(e) => setRecurrence(e.target.value)}
        className="w-full p-2 border rounded-md"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
  );
};

export default RecurrenceOptions;
