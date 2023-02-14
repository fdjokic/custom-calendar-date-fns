import React, { useState } from "react";
import "./App.css";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameDay,
  subMonths,
  addMonths,
  isBefore,
  isAfter,
} from "date-fns";
import { convertDateToISO } from "./helper";

// import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Calendy = ({ type, selectedDate, setSelectedDate }) => {
  const [activeDate, setActiveDate] = useState(new Date());
  const [dispatchValue, setDispatchValue] = useState();

  const getHeader = () => {
    return (
      <div class="header">
        <div
          className="todayButton"
          onClick={() => {
            setSelectedDate(new Date());
            setActiveDate(new Date());
          }}
        >
          Today
        </div>
        <span
          className="navIcon"
          onClick={() => setActiveDate(subMonths(activeDate, 1))}
        >
          back
        </span>
        <h2 className="currentMonth">{format(activeDate, "MMMM yyyy")}</h2>

        <span
          className="navIcon"
          onClick={() => setActiveDate(addMonths(activeDate, 1))}
        >
          forward
        </span>
      </div>
    );
  };

  const getWeekDaysNames = () => {
    const weekStartDate = startOfWeek(activeDate);
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      weekDays.push(
        <div className="day weekNames">
          {format(addDays(weekStartDate, day), "E")}
        </div>
      );
    }
    return <div className="weekContainer">{weekDays}</div>;
  };

  const getDayStyles = (currentDate) => {
    const today = new Date();

    if (type === "weekly") {
      const startDate = startOfWeek(selectedDate);
      const endDate = endOfWeek(selectedDate);
      if (currentDate <= endDate && currentDate >= startDate) {
        return "day selectedDay";
      }
    }
    if (isBefore(currentDate, startOfMonth(today))) return "day before";
    if (isSameDay(currentDate, selectedDate)) return "day selectedDay";
    if (isAfter(currentDate, endOfMonth(today))) return "day before";
    return "day ";
  };

  const handleChange = (date) => {
    setSelectedDate(date);

    if (type === "weekly") {
      const startDate = startOfWeek(selectedDate);
      const endDate = endOfWeek(selectedDate);

      setDispatchValue({
        from: convertDateToISO(startDate),
        to: convertDateToISO(endDate),
      });
      return;
    }
    setDispatchValue(convertDateToISO(date));
  };

  console.log(dispatchValue);
  const generateDatesForCurrentWeek = (date, selectedDate, activeDate) => {
    let currentDate = date;

    const week = [];
    for (let day = 0; day < 7; day++) {
      const cloneDate = currentDate;
      week.push(
        <div
          className={getDayStyles(currentDate, selectedDate)}
          onClick={() => {
            handleChange(cloneDate);
          }}
        >
          {format(currentDate, "d")}
        </div>
      );
      currentDate = addDays(currentDate, 1);
    }
    return <>{week}</>;
  };
  const getDates = () => {
    const startOfTheSelectedMonth = startOfMonth(activeDate);
    const endOfTheSelectedMonth = endOfMonth(activeDate);
    const startDate = startOfWeek(startOfTheSelectedMonth);
    const endDate = endOfWeek(endOfTheSelectedMonth);

    let currentDate = startDate;

    const allWeeks = [];

    while (currentDate <= endDate) {
      allWeeks.push(
        generateDatesForCurrentWeek(currentDate, selectedDate, activeDate)
      );
      currentDate = addDays(currentDate, 7);
    }

    return <div className="weekContainer">{allWeeks}</div>;
  };

  return (
    <section>
      {getHeader()}
      {getWeekDaysNames()}
      {getDates()}
    </section>
  );
};

export default Calendy;
