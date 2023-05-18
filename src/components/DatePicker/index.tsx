import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "components/DatePicker/style.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import useDate from "hooks/useDate";

const DatePicker = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { date: activeDate } = useDate();

  const handleChange = (e: Date) => {
    const day = e.getDate();
    const month = e.getMonth() + 1;
    const year = e.getFullYear();

    navigate(`?date=${year}-${month}-${day}`);
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
            <Calendar value={activeDate ? new Date(activeDate) : new Date()} onClickDay={(e) => handleChange(e)} />
          </div>
        )}
      </div>
    </>
  );
};

export default DatePicker;
