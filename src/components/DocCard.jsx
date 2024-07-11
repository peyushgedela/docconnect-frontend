import React from "react";

const DocCard = ({ doctor }) => {
  return (
    <div className="m-2 w-11/12 cursor-pointer p-4 bg-white rounded-md shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div>
        <h2 className="text-2xl  font-semibold">
          {doctor.fname} {doctor.lname}
        </h2>
        <p class="text-gray-600 text-sm mt-1">
          <span className="font-semibold ">Dept: </span>
          {doctor.department} <br />
          <span className="font-semibold">Cell: </span>+91-
          {doctor.phone} <br />
          <span className="font-semibold">Hourly fee: </span>&#8377;
          {doctor.fee} <br />
          <span className="font-semibold">Location: </span>
          {doctor.address} <br />
        </p>
      </div>
    </div>
  );
};

export default DocCard;
