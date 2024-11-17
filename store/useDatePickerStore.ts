import { create } from "zustand";

interface RecurrenceState {
  recurrence: string;
  customization: { interval: number; days?: string[] };
  startDate: Date | string | null;
  endDate: Date | string | null;
  setRecurrence: (recurrence: string) => void;
  setCustomization: (customization: {
    interval: number;
    days?: string[];
  }) => void;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  error: string | null;
  presetRange: (preset: string) => void;
  reset: () => void;
}

export const useDatePickerStore = create<RecurrenceState>((set) => ({
  recurrence: "daily",
  customization: { interval: 1 },
  startDate: null,
  endDate: null,
  error: null,
  setRecurrence: (recurrence) => set({ recurrence }),
  setCustomization: (customization) => set({ customization }),
  setStartDate: (date) =>
    set((state) => ({
      startDate: date,
      error:
        date && state.endDate && new Date(date) > new Date(state.endDate)
          ? "Start date cannot be after the end date."
          : null,
    })),
  setEndDate: (date) =>
    set((state) => ({
      endDate: date,
      error:
        date && state.startDate && new Date(date) < new Date(state.startDate)
          ? "End date cannot be before the start date."
          : null,
    })),
  presetRange: (preset) => {
    const today = new Date();
    switch (preset) {
      case "Today":
        set({
          startDate: new Date(today.toISOString().split("T")[0]),
          endDate: new Date(today.toISOString().split("T")[0]),
        });
        break;
      case "Last Week":
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        console.log("lastweek ---> ", lastWeek);
        set({
          startDate: new Date(lastWeek.toISOString().split("T")[0]),
          endDate: new Date(today.toISOString().split("T")[0]),
        });
        break;
      case "Next 7 Days":
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        set({
          startDate: new Date(today.toISOString().split("T")[0]),
          endDate: new Date(nextWeek.toISOString().split("T")[0]),
        });
        break;
    }
  },
  reset: () => set({ startDate: null, endDate: null }),
}));
