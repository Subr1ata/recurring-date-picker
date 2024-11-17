import { create } from "zustand";

interface RecurrenceState {
  recurrence: string;
  customization: { interval: number; days?: string[] };
  startDate: Date | null;
  endDate: Date | null;
  setRecurrence: (recurrence: string) => void;
  setCustomization: (customization: {
    interval: number;
    days?: string[];
  }) => void;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}

export const useDatePickerStore = create<RecurrenceState>((set) => ({
  recurrence: "daily",
  customization: { interval: 1 },
  startDate: null,
  endDate: null,
  setRecurrence: (recurrence) => set({ recurrence }),
  setCustomization: (customization) => set({ customization }),
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
}));
