import React from "react";
import { useSelector } from "react-redux";

const LoadingSpinner = () => {
  const loading = useSelector((state) => state.alerts.loading);

  return (
    loading && (
      <div className="spinner-parent">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  );
};

export default LoadingSpinner;
