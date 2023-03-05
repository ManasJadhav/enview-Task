import React, { useState } from "react";
import { alarmIcon, unmarkAlarmIcon } from "../assets/icons";

// import moment from "moment";
export default function AlertList(props) {
  const [mark, setMark] = useState(true);

  //this works only till the data is rendered on the screen if data reRenders the mark goes of to default true.

  // we can easily mark this Marked or Unmarked using a nodeJS post request to data using an api endPoint but only reactJs does not allow directly changing data from browser into database (say json in this case).

  const handleMark = () => {
    var tempData = [...props.alertData];
    setMark(false);
    for (var i = 0; i < tempData.length; i++) {
      if (tempData[i].id === props.data.id) {
        tempData[i].false_alarm = "false";
        props.setAlertData(tempData);
        break;
      }
    }
  };

  const handleUnmark = () => {
    var tempData = [...props.alertData];
    setMark(true);
    for (var i = 0; i < tempData.length; i++) {
      if (tempData[i].id === props.data.id) {
        tempData[i].false_alarm = "true";
        props.setAlertData(tempData);
        break;
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-md border border-slate-300 flex justify-between">
      <div className="flex flex-col">
        <div className="flex space-x-6">
          <h1 className="font-bold text-lg">{props.data.alert_type}</h1>
          <div className="flex align-top space-x-2">
            <div className="w-2 h-2 mt-[0.6rem] bg-black rounded-full"></div>
            <p className="text-lg">
              {new Date(props.data.timestamp).toDateString().slice(3)} at{" "}
              {new Date(props.data.timestamp).toTimeString().slice(0, 5)}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <h1 className="text-sm text-black-600">Driver:</h1>
          <p className="text-sm text-slate-600">
            {props.data.driver_friendly_name} /{" "}
            {props.data.vehicle_friendly_name}
          </p>
        </div>
      </div>
      <div className="">
        {mark ? (
          <button
            className="p-3 rounded-md flex text-slate-400 bg-slate-50 border border-slate-300"
            onClick={handleMark}
          >
            {alarmIcon}
            Mark as False Alarm
          </button>
        ) : (
          <button
            className="p-3 bg-red-50 rounded-md flex text-red-400 border border-red-300"
            onClick={handleUnmark}
          >
            {unmarkAlarmIcon}
            Unmark as False Alarm
          </button>
        )}
      </div>
    </div>
  );
}
