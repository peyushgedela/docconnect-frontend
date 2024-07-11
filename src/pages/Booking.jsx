import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Booking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const params = useParams();
  const getDoctor = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/get-doctor-info-by-id",
        { doctorId: params.doctorId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      } else {
        toast.error("An error occurred while fetching doctor data.");
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getDoctor();
  }, []);

  const applyAppoint = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/apply-appointment",
        {
          doctorId: params.doctorId,
          date: date,
          selectedTime: selectedTime,
          username: user.name,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success("Appointment requested successfully.");
        navigate("/dashboard");
      } else {
        toast.error("An error occurred while fetching doctor data.");
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  return (
    <div>
      <Layout>
        {doctor && (
          <div className="p-3">
            <h1 className="page-title">Book your Doctor</h1>
            <Toaster />
            <div className="mt-5">
              <h1 className="text-xl font-semibold">
                {doctor.fname} {doctor.lname}
              </h1>
              <div className="text-sm mt-2">
                <span className="font-semibold">Department: </span>
                {doctor.department}
                <br />
                <span className="font-semibold">Cell: </span>+91-{doctor.phone}
                <br />
                <span className="font-semibold">Hourly fee: </span>&#8377;
                {doctor.fee} <br />
                <span className="font-semibold">Location: </span>
                {doctor.address}
                <br />
                <span className="font-semibold">Timings: </span>
                {doctor.fromTime} - {doctor.toTime}
              </div>
              <div className="flex">
                <input
                  type="date"
                  className="mt-3 p-2 border border-gray-300 rounded-md"
                  onChange={(e) => setDate(e.target.value)}
                />
                <input
                  type="time"
                  className="mt-3 p-2 border border-gray-300 rounded-md"
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
                <button
                  className="bg-blue-500 text-white p-2 rounded-md mt-2"
                  onClick={applyAppoint}
                >
                  Apply for appointment
                </button>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Booking;
