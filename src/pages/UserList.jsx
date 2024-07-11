import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import axios from "axios";
import { Table } from "antd";

const UserList = () => {
  const [users, setusers] = useState([]);
  const dispatch = useDispatch();
  const getUserdata = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setusers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("An error occurred while fetching user data.");
      console.error(error);
    }
  };

  useEffect(() => {
    getUserdata();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div className="flex">
            <div className="underline text-red-800 font-medium">Block</div>
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
          <h1>Users List</h1>
          <Table columns={columns} dataSource={users} className="my-1" />
        </div>
      </Layout>
    </div>
  );
};

export default UserList;
