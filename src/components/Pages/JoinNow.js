import React from "react";
import { Link } from "react-router-dom";
import "./JoinNow.css";

const JoinNow = () => {
  return (
    <div className="join-page">
      <div className="join">
        <div className="centered-container">
          <Link
            className="btn btn--block btn--radius btn--size-xlarge btn--color-white text-center button-border"
            to="/login"
          >
            Login Now
          </Link>
          <Link
            className="btn btn--block btn--radius btn--size-xlarge btn--color-white  text-center button-border"
            to="/register"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinNow;
