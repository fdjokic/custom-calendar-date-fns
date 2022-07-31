import React, { useState, useEffect } from "react";
import moment from "moment";
import "../index.css";

const Calendar = () => {
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());
  const startDay = value.clone().startOf("month").startOf("week");
  const endDay = value.clone().endOf("month").endOf("week");
  const endYear = value
    .clone()
    .endOf("y")
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

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
    if (value._d.toString() === endYear._d.toString())
      setValue(value.clone().startOf("y").add(1, "y"));

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

    return "";
  };
  const currentMothYear = () => {
    return value.format("MMMM") + " " + value.format("YYYY");
  };

  return (
    <div className="calendar">
      <div className="header">
        <div>{currentMothYear()}</div>
      </div>
      <div className="days">
        {value._locale._weekdaysMin.map((day, idx) => (
          <div key={idx} className="name-day">
            {day}
          </div>
        ))}
      </div>
      {calendar.map((week, idx) => (
        <div key={idx}>
          {
            <div>
              {week.map((day, idx) => (
                <div key={idx} className="day" onClick={() => setValue(day)}>
                  <div className={dayStyles(day)}>
                    {day.format("D").toString()}
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      ))}
    </div>
  );
};

export default Calendar;
