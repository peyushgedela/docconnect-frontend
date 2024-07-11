import React from "react";
import Layout from "../components/Layout";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import ApptCard from "../components/ApptCard";

const UserAppointments = () => {
  const { user } = useSelector((state) => state.user);
  const appointments = user?.appointments || [];

  return (
    <div>
      <Layout>
        <Toaster />
        <div className="p-3">
          <h1 className="page-title">Appointments List</h1>
          <div className="flex flex-wrap align-middle justify-center">
            {appointments.length > 0 ? (
              appointments.map((appt) => (
                <div key={appt._id} className="w-full">
                  <ApptCard appt={appt} />
                </div>
              ))
            ) : (
              <p>No appointments found.</p>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default UserAppointments;
