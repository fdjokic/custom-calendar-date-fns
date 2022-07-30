import React, { useState, useEffect } from "react";
import moment from "moment";
import "../index.css";

const Calendar = () => {
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());
  const startDay = value.clone().startOf("month").startOf("week");
  const endDay = value.clone().endOf("month").endOf("week");

  useEffect(() => {
    const arr = [];
    const day = startDay.clone().subtract(1, "day");

    while (day.isBefore(endDay, "day")) {
      arr.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone())
      );
    }

    setCalendar(arr);
  }, [value]);

  const isSame = (day) => {
    return value.isSame(day, "day");
  };

  const isToday = (day) => {
    return day.isSame(new Date(), "day");
  };

  const isBefore = (day) => {
    return day.isBefore(new Date(), "day");
  };

  const dayStyles = (day) => {
    if (isSame(day)) return "selected";
    if (isBefore(day)) return "before";
    if (isToday(day)) return "today";
  };

  return (
    <div className="calendar">
      {calendar.map((week) => (
        <div>
          {week.map((day) => (
            <div className="day" onClick={() => setValue(day)}>
              <div className={dayStyles(day)}>{day.format("D").toString()}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
