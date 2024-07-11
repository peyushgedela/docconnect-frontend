import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";

const ApplyDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const onApply = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    console.log(values);

    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/apply-doctor",
        {
          ...values,
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
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("An error occurred while applying to become a doctor.");
      console.error(error);
    }
  };

  return (
    <div>
      <Toaster />
      <Layout>
        <div className="p-3">
          <h1 className="page-title">Apply for Doctor</h1>
          <form onSubmit={onApply}>
            <div className="border-2 border-gray-400 p-2 rounded-md my-2">
              <h2 className="text-gray-600 font-light text-lg">
                Personal Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="fname" className="form-label">
                    First Name
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    className="form-input"
                    name="fname"
                    id="fname"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lname" className="form-label">
                    Last Name
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    className="form-input"
                    name="lname"
                    id="lname"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <br />
                  <input
                    type="text"
                    className="form-input"
                    name="phone"
                    id="phone"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="website" className="form-label">
                    Website
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    className="form-input"
                    name="website"
                    id="website"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>{" "}
                  <br />
                  <textarea
                    className="form-input"
                    name="address"
                    id="address"
                  />
                </div>
              </div>
            </div>
            <div className="border-2 border-gray-400 p-2 rounded-md my-2">
              <h2 className="text-gray-600 font-light text-lg">
                Professional Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="department" className="form-label">
                    Department
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    name="department"
                    id="department"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="experience" className="form-label">
                    Experience{" "}
                    <span className="text-xs text-slate-500 align-top">
                      in years
                    </span>
                  </label>
                  <input
                    type="number"
                    className="form-input"
                    name="experience"
                    id="experience"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="fee" className="form-label">
                    Fee{" "}
                    <span className="text-xs text-slate-500 align-top">
                      per hour
                    </span>
                  </label>
                  <input
                    type="number"
                    className="form-input"
                    name="fee"
                    id="fee"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fromTime" className="form-label">
                      From
                    </label>
                    <input
                      type="time"
                      className="form-input"
                      name="fromTime"
                      id="fromTime"
                    />
                  </div>
                  <div>
                    <label htmlFor="toTime" className="form-label">
                      To
                    </label>
                    <br />
                    <input
                      type="time"
                      className="form-input"
                      name="toTime"
                      id="toTime"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              id="docsubmit"
              className="bg-blue-500 w-full border-2 rounded-md border-black p-2 text-white hover:bg-blue-900"
            >
              Submit
            </button>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default ApplyDoctor;
