import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-spinner">
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
    </div>
    <p className="loading-text">Loading weather data...</p>
  </div>
);

export default LoadingSpinner;
