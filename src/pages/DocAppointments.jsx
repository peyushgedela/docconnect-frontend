import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import axios from "axios";
import { Table } from "antd";

const DocAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();

  // Function to filter out approved or rejected appointments
  const filterAppointments = (appointments) => {
    return appointments.filter(
      (appointment) =>
        appointment.status !== "approved" && appointment.status !== "rejected"
    );
  };

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
        const filteredAppointments = filterAppointments(response.data.data);
        setAppointments(filteredAppointments);
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

  const approveAppointments = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/approve-appointment",
        {
          doctorId: doctor._id,
          doctorname: doctor.fname,
          userId: record.userId,
          status,
          name: record.username,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        const updatedAppointments = appointments.map((appointment) =>
          appointment.userId === record.userId
            ? { ...appointment, status }
            : appointment
        );
        const filteredAppointments = filterAppointments(updatedAppointments);
        setAppointments(filteredAppointments);
        toast.success(`Appointment ${status} successfully!`);
      } else {
        toast.error("Failed to update appointment status.");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("An error occurred while updating appointment status.");
      console.error(error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "username",
    },
    {
      title: "Date",
      dataIndex: "selectedDate",
    },
    {
      title: "Time",
      dataIndex: "selectedTime",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div className="flex">
            {record.status === "pending" && (
              <div className="flex">
                <div
                  className="ml-3 underline text-green-500 font-medium cursor-pointer"
                  onClick={() => approveAppointments(record, "approved")}
                >
                  Accept
                </div>
                <div
                  className="ml-3 underline text-red-800 font-medium cursor-pointer"
                  onClick={() => approveAppointments(record, "rejected")}
                >
                  Decline
                </div>
              </div>
            )}
            {record.status === "approved" && (
              <div className="underline text-red-800 font-medium cursor-pointer">
                Block
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Toaster />
      <Layout>
        <div className="p-3">
          <h1>Doctor Appointments</h1>
          <Table columns={columns} dataSource={appointments} className="my-1" />
        </div>
      </Layout>
    </div>
  );
};

export default DocAppointments;
