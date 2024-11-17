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
  disabledDates: {
    date: string;
    name: string;
  }[];
}

// List of holidays
const holidays = [
  { date: "2024-01-01", name: "New Year's Day" },
  { date: "2024-01-13", name: "Lohri" },
  { date: "2024-01-14", name: "Makar Sankranti" },
  { date: "2024-01-15", name: "Pongal" },
  { date: "2024-01-17", name: "Guru Govind Singh Jayanti" },
  { date: "2024-01-25", name: "Hazarat Ali's Birthday" },
  { date: "2024-01-26", name: "Republic Day" },
  { date: "2024-02-14", name: "Vasant Panchami" },
  { date: "2024-02-19", name: "Shivaji Jayanti" },
  { date: "2024-02-24", name: "Guru Ravidas Jayanti" },
  { date: "2024-03-06", name: "Maharishi Dayanand Saraswati Jayanti" },
  { date: "2024-03-08", name: "Maha Shivaratri/Shivaratri" },
  { date: "2024-03-12", name: "Ramadan Start" },
  { date: "2024-03-24", name: "Holika Dahana" },
  { date: "2024-03-25", name: "Holi" },
  { date: "2024-03-25", name: "Dolyatra" },
  { date: "2024-03-29", name: "Good Friday" },
  { date: "2024-03-31", name: "Easter Day" },
  { date: "2024-04-05", name: "Jamat Ul-Vida" },
  { date: "2024-04-09", name: "Chaitra Sukhladi" },
  { date: "2024-04-09", name: "Ugadi" },
  { date: "2024-04-09", name: "Gudi Padwa" },
  { date: "2024-04-10", name: "Ramzan Id/Eid-ul-Fitar" },
  { date: "2024-04-11", name: "Ramzan Id/Eid-ul-Fitar" },
  { date: "2024-04-13", name: "Vaisakhi" },
  { date: "2024-04-14", name: "Mesadi / Vaisakhadi" },
  { date: "2024-04-14", name: "Ambedkar Jayanti" },
  { date: "2024-04-17", name: "Rama Navami" },
  { date: "2024-04-21", name: "Mahavir Jayanti" },
  { date: "2024-05-08", name: "Birthday of Rabindranath" },
  { date: "2024-05-23", name: "Buddha Purnima/Vesak" },
  { date: "2024-06-17", name: "Bakrid/Eid ul-Adha" },
  { date: "2024-07-07", name: "Rath Yatra" },
  { date: "2024-07-17", name: "Muharram/Ashura" },
  { date: "2024-08-15", name: "Independence Day" },
  { date: "2024-08-15", name: "Parsi New Year" },
  { date: "2024-08-19", name: "Raksha Bandhan (Rakhi)" },
  { date: "2024-08-26", name: "Janmashtami" },
  { date: "2024-08-26", name: "Janmashtami (Smarta)" },
  { date: "2024-09-07", name: "Ganesh Chaturthi/Vinayaka Chaturthi" },
  { date: "2024-09-15", name: "Onam" },
  { date: "2024-09-16", name: "Milad un-Nabi/Id-e-Milad" },
  { date: "2024-10-02", name: "Mahatma Gandhi Jayanti" },
  { date: "2024-10-03", name: "First Day of Sharad Navratri" },
  { date: "2024-10-09", name: "First Day of Durga Puja Festivities" },
  { date: "2024-10-10", name: "Maha Saptami" },
  { date: "2024-10-11", name: "Maha Navami" },
  { date: "2024-10-11", name: "Maha Ashtami" },
  { date: "2024-10-12", name: "Dussehra" },
  { date: "2024-10-17", name: "Maharishi Valmiki Jayanti" },
  { date: "2024-10-20", name: "Karaka Chaturthi (Karva Chauth)" },
  { date: "2024-10-31", name: "Naraka Chaturdasi" },
  { date: "2024-10-31", name: "Diwali/Deepavali" },
  { date: "2024-11-02", name: "Govardhan Puja" },
  { date: "2024-11-03", name: "Bhai Duj" },
  { date: "2024-11-07", name: "Chhat Puja (Pratihar Sashthi/Surya Sashthi)" },
  { date: "2024-11-15", name: "Guru Nanak Jayanti" },
  { date: "2024-11-24", name: "Guru Tegh Bahadur's Martyrdom Day" },
  { date: "2024-12-24", name: "Christmas Eve" },
  { date: "2024-12-25", name: "Christmas" },
];

export const useDatePickerStore = create<RecurrenceState>((set) => ({
  recurrence: "daily",
  customization: { interval: 1 },
  startDate: null,
  endDate: null,
  error: null,
  disabledDates: holidays, // Set holidays as disabled dates

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
