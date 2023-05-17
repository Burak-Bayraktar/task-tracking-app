import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "components/DatePicker/style.css";
import { useState } from "react";

const DatePicker = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [value, onChange] = useState<Date>(new Date());

  const handleChange = (e: Date) => {
    // TODO: Add logic to change date later
    console.log(e, "date changed");
  };

  return (
    <>
      <div
        className="date-picker-container"
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
      >
        <div className="selected-date">Today</div>
        {isCalendarOpen && (
          <div className="calendar" onClick={(e) => e.stopPropagation()}>
            <Calendar value={value} onClickDay={(e) => handleChange(e)} />
          </div>
        )}
      </div>
    </>
  );
};

export default DatePicker;
