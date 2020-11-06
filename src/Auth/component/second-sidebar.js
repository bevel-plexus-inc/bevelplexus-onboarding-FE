import React, {useState} from 'react';
import logo from '../../assets/img/logo-white.svg';
import checkmark from '../../assets/img/check.png';
import '../../styles/sidebar.scss';
import {Link} from 'react-router-dom';

export const SecondSidebar = ({sideProgress, sideLink}) => {
  const [isOpen, setisOpen] = useState(false);
  const sidebarToggle = () => {
    setisOpen(!isOpen);
  };
  return (
    <div>
      <div className="side-wrapper">
        <div
          className={isOpen ? 'sidebar-overlay' : ''}
          onClick={sidebarToggle}
        ></div>
        <div className="menu-icon" onClick={sidebarToggle}>
          <span
            className="iconify"
            data-icon="fe:app-menu"
            data-inline="false"
          ></span>
        </div>
        <section className={isOpen ? 'sidebar sidebar-isOpen' : 'sidebar'}>
          <div className="sidebar-wrapper">
            <div className="d-flex align-items-center">
              <div className="mr-3 text-white font24">
                <span
                  className="iconify"
                  data-icon="dashicons:arrow-left-alt"
                  data-inline="false"
                ></span>
              </div>
              <img src={logo} alt="" />
            </div>
            <div className="mt-5 text-white">
              <div className="side-links">
                <Link to="#">
                  <img src={checkmark} alt="" className="check-mark" />
                  Personal info
                </Link>
                <Link
                  to="#"
                  className={sideProgress === 'two' ? 'active' : ''}
                >
                  {sideProgress === 'three' ? (
                    <img src={checkmark} alt="" className="check-mark" />
                  ) : sideProgress === 'four' ? (
                    <img src={checkmark} alt="" className="check-mark" />
                  ) : (
                    <span className="number">2</span>
                  )}
                  Phone Verification
                </Link>
                <Link
                  to="#"
                  className={sideProgress === 'three' ? 'active' : ''}
                >
                  {sideProgress === 'four' ? (
                    <img src={checkmark} alt="" className="check-mark" />
                  ) : (
                    <span className="number">3</span>
                  )}
                  {sideLink === 'regular' ? (
                    <span>Address</span>
                  ) : (
                    <span>School information</span>
                  )}
                </Link>
                <Link
                  to="#"
                  className={sideProgress === 'four' ? 'active' : ''}
                >
                  <span className="number">4</span>

                  {sideLink === 'regular' ? (
                    <span>Verification</span>
                  ) : (
                    <span>Documents</span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
