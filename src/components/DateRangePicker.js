import React, { useEffect, useState } from "react";
export default function DateRangePicker(props) {
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const handleDataChangeOnDate = (e) => {
    var tempDate = { ...dateRange };
    tempDate.endDate = e.target.value;
    setDateRange(tempDate);
  };

  useEffect(() => {
    const result = props.alertData.filter((data) => {
      if (
        new Date(data.timestamp) <= new Date(dateRange.endDate) &&
        new Date(data.timestamp) >= new Date(dateRange.startDate)
      ) {
        return data;
      }
      return "";
    });
    props.setDateSearch({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      list: result,
    });
  }, [dateRange.endDate]);

  return (
    <div>
      <input
        className="p-4 rounded-l-md border text-slate-400 border-l-slate-300 border-y-slate-300 bg-slate-50 w-52"
        placeholder="Start Date"
        type="text"
        onFocus={(e) => {
          e.target.type = "date";
        }}
        onBlur={(e) => {
          e.target.type = "text";
        }}
        onChange={(e) => {
          let tempStartDate = { ...dateRange };
          tempStartDate.startDate = e.target.value;
          setDateRange(tempStartDate);
        }}
        value={dateRange.startDate}
      />
      <input
        className="p-4 rounded-r-md border text-slate-400 border-r-slate-300 border-y-slate-300 bg-slate-50 w-52"
        placeholder="End Date"
        type="text"
        onFocus={(e) => {
          e.target.type = "date";
        }}
        onBlur={(e) => {
          e.target.type = "text";
        }}
        value={props.dateSearch.endDate}
        onChange={handleDataChangeOnDate}
        min={dateRange.startDate}
      />
    </div>
  );
}
