import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, Badge, Space } from "antd";
import "./Layout.css";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);

  const usermenu = [
    {
      name: "Home",
      icon: "fa-solid fa-house",
      path: "/dashboard",
    },
    {
      name: "Your Appointments",
      icon: `fa-solid fa-clock`,
      path: `/user/appointments/${user?._id}`,
    },
    {
      name: "Are you a Doctor?",
      icon: "fa-solid fa-stethoscope",
      path: "/applydoctor",
    },
    {
      name: "Logout",
      icon: "fa-solid fa-circle-xmark",
      path: "/login",
    },
  ];

  const adminmenu = [
    {
      name: "Home",
      icon: "fa-solid fa-house",
      path: "/dashboard",
    },
    {
      name: "Users",
      icon: "fa-solid fa-users",
      path: "/admin/users",
    },
    {
      name: "Doctors",
      icon: "fa-solid fa-user-doctor",
      path: "/admin/doctors",
    },
    {
      name: "Logout",
      icon: "fa-solid fa-circle-xmark",
      path: "/login",
    },
  ];

  const docmenu = [
    {
      name: "Home",
      icon: "fa-solid fa-house",
      path: "/dashboard",
    },
    {
      name: "Requests",
      icon: `fa-solid fa-clock`,
      path: `/doctor/appointments/${user?._id}`,
    },
    {
      name: "Profile",
      icon: "fa-solid fa-user",
      path: `/doctor/profile/${user?._id}`,
    },
    {
      name: "Logout",
      icon: "fa-solid fa-circle-xmark",
      path: "/login",
    },
  ];

  const menuReq = user?.isAdmin
    ? adminmenu
    : user?.isDoctor
    ? docmenu
    : usermenu;

  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";

  return (
    <div className="main p-4 bg-slate-100 cursor-auto">
      <div className="d-flex h-screen">
        <div className={collapsed ? "sidebar w-12" : "sidebar w-1/6"}>
          <div className="sidebar-head text-center align-middle p-2 pt-5 text-xl font-semibold">
            {collapsed ? "DC" : "DocConnect"}
          </div>
          <div className="sidebar-head text-center align-middle text-sm pb-5 font-light">
            {role}
          </div>
          <div className="sidebar-menu">
            {menuReq.map((item) => (
              <div className="menuitems p-2 m-1 text-sm border-2 cursor-pointer border-green-200 rounded-md hover:bg-green-300 hover:text-black hover:shadow-lg">
                <Link
                  to={item.path}
                  className="d-flex"
                  onClick={() => {
                    if (item.name == "Logout") {
                      localStorage.clear();
                    }
                  }}
                >
                  <i className={item.icon}></i>
                  {!collapsed && (
                    <span className="max-md:hidden ml-3">{item.name}</span>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div
          className={
            collapsed ? `content w-11/12 mx-1 h-max` : `content w-5/6 mx-1`
          }
        >
          <div className="header d-flex h-1/6 bg-slate-300 rounded-md border-2 border-gray-800 mb-1">
            <div className="max-md:hidden d-flex h-full w-max pt-4">
              {collapsed ? (
                <i
                  className="fa-solid fa-bars p-3 cursor-pointer text-4xl"
                  onClick={() => setCollapsed(false)}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-xmark p-3 cursor-pointer text-4xl"
                  onClick={() => setCollapsed(true)}
                ></i>
              )}
            </div>
            <div className="header2 pt-4 w-screen mt-3">
              <div className="float-right underline mx-3 mt-1">
                <Link to="/notifications">
                  {" "}
                  <Badge count={user?.unseenNotifications.length}>
                    <Avatar shape="square" size="large">
                      <i className="fa-solid fa-bell text-2xl float-right"></i>
                    </Avatar>
                  </Badge>
                </Link>
                <Link to="/dashboard" className="ml-4">
                  {user?.name}
                </Link>
              </div>
            </div>
          </div>
          <div className="body rounded-md border-2 h-max border-gray-800 mt-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
