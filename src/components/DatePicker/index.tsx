import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "components/DatePicker/style.css";
import { useEffect, useRef, useState } from "react";

const DatePicker = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [value, onChange] = useState<Date>(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: Date) => {
    // TODO: Add logic to change date later
    console.log(e, "date changed");
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isCalendarOpen]);

  const handleCalendarContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className="date-picker-container"
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        ref={containerRef}
      >
        <div className="selected-date">Today</div>
        {isCalendarOpen && (
          <div className="calendar" onClick={(e) => handleCalendarContainerClick(e)}>
            <Calendar value={value} onClickDay={(e) => handleChange(e)} />
          </div>
        )}
      </div>
    </>
  );
};

export default DatePicker;
