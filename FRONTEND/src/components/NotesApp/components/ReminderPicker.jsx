import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

const ReminderPicker = ({ reminder, setReminder }) => {
  const [selectedDate, setSelectedDate] = useState(reminder || null);
  const [selectedTime, setSelectedTime] = useState(
    reminder ? format(reminder, "HH:mm") : "12:00"
  );

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
    if (selectedDate) {
      const [hours, minutes] = e.target.value.split(":");
      const updatedDate = new Date(selectedDate);
      updatedDate.setHours(parseInt(hours), parseInt(minutes));
      setReminder(updatedDate);
    }
  };

  const handleDaySelect = (day) => {
    setSelectedDate(day);
    if (selectedTime) {
      const [hours, minutes] = selectedTime.split(":");
      const updatedDate = new Date(day);
      updatedDate.setHours(parseInt(hours), parseInt(minutes));
      setReminder(updatedDate);
    }
  };

  return (
    <div className="sm:col-span-2 mt-2">
      <label className="block text-sm font-semibold text-[var(--primary)] mb-1 ml-1">
        Reminder
      </label>

      <div className="bg-[var(--chart-4)] p-4 border border-[var(--border)] rounded-md ">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleDaySelect}
          className="text-[var(--foreground)] bg-[var(--chart-4)] rounded-md max-w-sm"
          modifiersClassNames={{
            selected: "bg-[#58a6ff] text-[var(--primary)]",
            today: "text-[#58a6ff]",
          }}
        />

        {/* Time Selector */}
        <input
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
          className="mt-2 w-full px-3 py-2 bg-[var(--input)] border-2 border-[var(--border)] rounded-md
            focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none
            text-[var(--foreground)] text-sm"
        />

        {/* Display Selected Reminder */}
        {reminder && (
          <p className="mt-2 text-[var(--foreground)]  text-sm">
            Selected: {format(reminder, "PPpp")}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReminderPicker;
