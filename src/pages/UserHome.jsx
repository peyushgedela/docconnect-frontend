import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import axios from "axios";
import DocCard from "../components/DocCard";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getDoctors = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-approved-doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("An error occurred while fetching doctor data.");
      console.error(error);
    }
  };
  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <div className="p-3">
      <Toaster />
      <h1 className="page-title">Doctors List</h1>
      <div className="flex flex-wrap align-middle justify-center">
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="w-full"
            onClick={() => {
              navigate(`/bookings/${doc._id}`);
            }}
          >
            <DocCard doctor={doc} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHome;
