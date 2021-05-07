import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo-white.svg";
import "../../styles/sidebar.scss";

export const Sidebar = () => {
  const [isOpen, setisOpen] = useState(false);
  const sidebarToggle = () => {
    setisOpen(!isOpen);
  };
  return (
    <div>
      <div className="side-wrapper">
        <div
          className={isOpen ? "sidebar-overlay" : ""}
          onClick={sidebarToggle}
        ></div>
        <div className="menu-icon" onClick={sidebarToggle}>
          <span
            className="iconify"
            data-icon="fe:app-menu"
            data-inline="false"
          ></span>
        </div>
        <section className={isOpen ? "sidebar sidebar-isOpen" : "sidebar"}>
          <div className="sidebar-wrapper">
            <div className="d-flex align-items-center">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </div>
            <div className="pt-space text-white">
              <h3 className="font38 font-bold mb-4">
                Your Secure Money Transfer is Just A Few Clicks Away
              </h3>
              <p className="font-md light-white">
                Create your account in minutes to <br /> start sending money.
              </p>
            </div>
          </div>
        </section> 
      </div>
    </div>
  );
};
