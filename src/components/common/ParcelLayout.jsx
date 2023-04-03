import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";

const DashLayout = () => {
  return (
    <>
      <Navigation />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default DashLayout;
