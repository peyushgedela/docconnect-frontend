import React from "react";

const ApptCard = ({ appt }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200";
      case "approved":
        return "bg-green-200";
      case "rejected":
        return "bg-red-200";
      default:
        return "bg-gray-200";
    }
  };

  const statusColor = getStatusColor(appt.status);

  return (
    <div
      className={`m-2 w-11/12 p-4 border-4 border-slate-300 rounded-md shadow-md hover:shadow-2xl ${statusColor}`}
    >
      <div>
        <h2 className="text-2xl font-semibold">{appt.doctorname}</h2>
        <p className="text-gray-600 text-sm mt-1">
          <span className="font-semibold">Date: </span>
          {appt.selectedDate} <br />
          <span className="font-semibold">Time: </span>
          {appt.selectedTime} <br />
          <span className="font-semibold">Status: </span>
          {appt.status} <br />
        </p>
      </div>
    </div>
  );
};

export default ApptCard;
