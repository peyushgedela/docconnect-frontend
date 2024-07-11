import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LoadingSpinner from "./assets/loadingSpinner";
import ProtectedR from "./components/ProtectedR";
import PublicR from "./components/PublicR";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notifications from "./pages/Notifications";
import UserList from "./pages/UserList";
import DoctorsList from "./pages/DoctorsList";
import DocProfile from "./pages/DocProfile";
import Booking from "./pages/Booking";
import DocAppointments from "./pages/DocAppointments";
import UserAppointments from "./pages/UserAppointments";
import DoctorHome from "./pages/DoctorHome";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicR>
        <Index />
      </PublicR>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicR>
        <Login />
      </PublicR>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicR>
        <Register />
      </PublicR>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedR>
        <Dashboard />
      </ProtectedR>
    ),
  },
  {
    path: "/applydoctor",
    element: (
      <ProtectedR>
        <ApplyDoctor />
      </ProtectedR>
    ),
  },
  {
    path: "/notifications",
    element: (
      <ProtectedR>
        <Notifications />
      </ProtectedR>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <ProtectedR>
        <UserList />
      </ProtectedR>
    ),
  },
  {
    path: "/admin/doctors",
    element: (
      <ProtectedR>
        <DoctorsList />
      </ProtectedR>
    ),
  },
  {
    path: "/doctor/profile/:doctorId",
    element: (
      <ProtectedR>
        <DocProfile />
      </ProtectedR>
    ),
  },
  {
    path: "/bookings/:doctorId",
    element: (
      <ProtectedR>
        <Booking />
      </ProtectedR>
    ),
  },
  {
    path: "/doctor/appointments/:doctorId",
    element: (
      <ProtectedR>
        <DocAppointments />
      </ProtectedR>
    ),
  },
  {
    path: "/user/appointments/:userId",
    element: (
      <ProtectedR>
        <UserAppointments />
      </ProtectedR>
    ),
  },
  {
    path: "/doctorhome",
    element: (
      <ProtectedR>
        <DoctorHome />
      </ProtectedR>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <LoadingSpinner />
    <RouterProvider router={router} />
  </Provider>
);
