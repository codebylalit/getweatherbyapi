import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-card glass">
        <div className="error-icon">⚠️</div>
        <h3 className="error-title">Oops! Something went wrong</h3>
        <p className="error-message">{message}</p>
        <div className="error-suggestions">
          <p className="suggestion-text">Try these solutions:</p>
          <ul className="suggestion-list">
            <li>Check your internet connection</li>
            <li>Verify the city name is correct</li>
            <li>Try using your current location</li>
            <li>Refresh the page and try again</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage; 