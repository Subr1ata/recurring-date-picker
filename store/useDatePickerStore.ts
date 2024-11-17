import { create } from "zustand";
import { persist } from "zustand/middleware";

export type State = {
  endDate: Date | null;
  startDate: Date | null;
  customization: { interval: number; days?: string[] };
  recurrence: string;
};

export type Actions = {
  setCustomization: (customization: {
    interval: number;
    days?: string[];
  }) => void;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setRecurrence: (recurrence: string) => void;
};

export const useDatePickerStore = create<State & Actions>()(
  persist(
    (set) => ({
      endDate: null,
      startDate: null,
      customization: { interval: 1 },
      recurrence: "daily",

      setRecurrence: (recurrence: string) => set({ recurrence }),
      setCustomization: (customization: {
        interval: number;
        days?: string[];
      }) => set({ customization }),
      setStartDate: (date: Date | null) => set({ startDate: date }),
      setEndDate: (date: Date | null) => set({ endDate: date }),
    }),
    { name: "date-picker-store", skipHydration: true }
  )
);
