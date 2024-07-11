import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import DocApptCard from "../components/DocApptCard";
import { showLoading, hideLoading } from "../redux/alertSlice";

const DoctorHome = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();

  const getDoctor = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doc-by-id",
        {
          userId: user?._id,
        },
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
  }, [user]);

  const getAppointments = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/doctor/get-all-appointments", {
        params: { doctorId: doctor?._id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("An error occurred while fetching appointments data.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (doctor) {
      getAppointments();
    }
  }, [doctor]);

  return (
    <div>
      <div className="p-3">
        <div className="flex flex-wrap align-middle justify-center">
          <div className="w-full">
            <h2 className="text-2xl font-semibold">Welcome Doctor</h2>
            <p className="text-gray-600 text-sm mt-1">
              <span className="font-semibold">
                You can see your appointments here
              </span>
            </p>
            <div className="flex flex-wrap align-middle justify-center">
              {appointments
                .filter((appt) => appt.status === "approved")
                .map((appt) => (
                  <div key={appt._id} className="w-full">
                    <DocApptCard appt={appt} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorHome;
