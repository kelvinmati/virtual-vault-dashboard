import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Landing = () => {
  return (
    <div>
      <Sidebar />
      <div className="home">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Landing;
