import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import UserHome from "./UserHome";
import DoctorHome from "./DoctorHome";
import AdminHome from "./AdminHome";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.post(
          "/api/user/get-by-id",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
        // Handle error, e.g., redirect to login page if unauthorized
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  return (
    <div>
      <Layout>
        {user.isAdmin ? (
          <AdminHome />
        ) : user.isDoctor ? (
          <DoctorHome />
        ) : (
          <UserHome />
        )}
      </Layout>
    </div>
  );
};

export default Dashboard;
