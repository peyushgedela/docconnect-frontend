import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import axios from "axios";
import { Table } from "antd";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-doctors", {
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

  const approveDoctor = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/approve-doctor",
        {
          doctorId: record._id,
          userId: record.userId,
          status,
          fname: record.fname,
          lname: record.lname,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors((prevDoctors) =>
          prevDoctors.map((doc) =>
            doc._id === record._id ? { ...doc, status } : doc
          )
        );
        toast.success(`Doctor ${status} successfully!`);
      } else {
        toast.error("Failed to update doctor status.");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("An error occurred while updating doctor status.");
      console.error(error);
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  const columns = [
    {
      title: "First Name",
      dataIndex: "fname",
    },
    {
      title: "Last Name",
      dataIndex: "lname",
    },
    {
      title: "Department",
      dataIndex: "department",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Application Status",
      dataIndex: "status",
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
                  onClick={() => approveDoctor(record, "approved")}
                >
                  Approve
                </div>
                <div
                  className="ml-3 underline text-red-800 font-medium cursor-pointer"
                  onClick={() => approveDoctor(record, "rejected")}
                >
                  Reject
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
          <h1>Doctors List</h1>
          <Table columns={columns} dataSource={doctors} className="my-1" />
        </div>
      </Layout>
    </div>
  );
};

export default DoctorsList;
