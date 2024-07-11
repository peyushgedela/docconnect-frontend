import React from "react";

const ApptCard = ({ appt }) => {
  return (
    <div
      className={`m-2 w-11/12 p-4 border-4 border-slate-300 rounded-md shadow-md hover:shadow-2xl`}
    >
      <div>
        <h2 className="text-2xl font-semibold">{appt.username}</h2>
        <p className="text-gray-600 text-sm mt-1">
          <span className="font-semibold">Date: </span>
          {appt.selectedDate} <br />
          <span className="font-semibold">Time: </span>
          {appt.selectedTime} <br />
        </p>
      </div>
    </div>
  );
};

export default ApptCard;
