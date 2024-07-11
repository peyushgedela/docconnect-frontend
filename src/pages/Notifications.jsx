import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { updateUserData } from "../redux/userSlice";

const Notifications = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/get-by-id",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(updateUserData(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("An error occurred while fetching user data.");
      console.error(error);
    }
  };

  const markseen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/mark-all-read",
        {
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
        toast.success(response.data.message);
        fetchUserData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("An error occurred while marking notifications as read.");
      console.error(error);
    }
  };

  const deletenotifs = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/delete-notifs",
        {
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
        toast.success(response.data.message);
        fetchUserData();
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("An error occurred while deleting notifications.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const notifitems = [
    {
      key: "1",
      label: "Unread",
      children: (
        <div>
          <div className="flex justify-end">
            <div
              className="underline font-semibold text-gray-600 hover:text-black cursor-pointer"
              onClick={markseen}
            >
              Mark all as read
            </div>
          </div>
          <div>
            {user?.unseenNotifications.map((notifs) => (
              <div
                key={notifs._id}
                className="p-2 mb-1 border-b-2 border-gray-200 cursor-pointer"
                onClick={() => navigate(notifs.link)}
              >
                <div className="border-2 border-slate-500 p-2 rounded-md">
                  <div className="text-gray-900">{notifs.message}</div>
                </div>
                <div className="text-xs text-gray-400">{notifs.createdAt}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Read",
      children: (
        <>
          <div className="flex justify-end">
            <div
              className="underline font-semibold cursor-pointer text-gray-600 hover:text-black"
              onClick={deletenotifs}
            >
              Delete all
            </div>
          </div>
          <div>
            {user?.seenNotifications.map((notifs) => (
              <div
                key={notifs._id}
                className="p-2 mb-1 border-b-2 border-gray-200 cursor-pointer"
                onClick={() => navigate(notifs.link)}
              >
                <div className="border-2 border-slate-500 p-2 rounded-md">
                  <div className="text-gray-900">{notifs.message}</div>
                </div>
                <div className="text-xs text-gray-400">{notifs.createdAt}</div>
              </div>
            ))}
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <Layout>
        <div className="p-3">
          <h1 className="page-title">Your Notifications</h1>
          <Tabs defaultActiveKey="1" items={notifitems} />
        </div>
      </Layout>
    </div>
  );
};

export default Notifications;
