import React from "react";
import AttendanceReport from "../components/AttendanceReport";
import MonthlyCalendar from "../components/MonthlyCalendar";

const AttendancePage = () => {
    return <div>
      <MonthlyCalendar/>
        <AttendanceReport/>
        </div>;
  };
  
export default AttendancePage ;
  